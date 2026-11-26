# Small local web server for the portfolio (no install needed - uses Windows PowerShell).
# Serves this folder at http://localhost:8000/ and lists folders, so the Gallery
# picks up every file in images\for_animation_page by itself.
param([int]$Port = 8000)
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$types = @{
  '.html'='text/html; charset=utf-8'; '.htm'='text/html; charset=utf-8'; '.css'='text/css'; '.js'='application/javascript';
  '.json'='application/json'; '.xml'='application/xml'; '.txt'='text/plain; charset=utf-8'; '.svg'='image/svg+xml';
  '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.gif'='image/gif'; '.webp'='image/webp'; '.avif'='image/avif';
  '.ico'='image/x-icon'; '.mp4'='video/mp4'; '.webm'='video/webm'; '.mov'='video/quicktime'; '.mp3'='audio/mpeg';
  '.woff'='font/woff'; '.woff2'='font/woff2'; '.ttf'='font/ttf'; '.otf'='font/otf'; '.pdf'='application/pdf'
}
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
try { $listener.Start() } catch { Write-Host "Portul $Port e ocupat. Inchide cealalta fereastra a serverului si incearca din nou."; Read-Host; exit }
Write-Host "Site-ul ruleaza la http://localhost:$Port/  -  inchide fereastra ca sa-l opresti."
Start-Process "http://localhost:$Port/animation.html"
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request; $res = $ctx.Response
  try {
    $rel = [Uri]::UnescapeDataString($req.Url.AbsolutePath).TrimStart('/') -replace '/', '\'
    if ($rel -eq '') { $rel = 'index.html' }
    $path = [IO.Path]::GetFullPath((Join-Path $root $rel))
    if (-not $path.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) { $res.StatusCode = 403 }
    elseif (Test-Path -LiteralPath $path -PathType Container) {
      $sb = New-Object Text.StringBuilder
      [void]$sb.Append('<!doctype html><meta charset="utf-8"><ul>')
      Get-ChildItem -LiteralPath $path | Sort-Object Name | ForEach-Object {
        $n = [Uri]::EscapeDataString($_.Name); if ($_.PSIsContainer) { $n += '/' }
        [void]$sb.Append("<li><a href=""$n"">$([Net.WebUtility]::HtmlEncode($_.Name))</a></li>")
      }
      [void]$sb.Append('</ul>')
      $bytes = [Text.Encoding]::UTF8.GetBytes($sb.ToString())
      $res.ContentType = 'text/html; charset=utf-8'; $res.Headers['Cache-Control'] = 'no-store'
      $res.ContentLength64 = $bytes.Length; $res.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    elseif (Test-Path -LiteralPath $path -PathType Leaf) {
      $ext = [IO.Path]::GetExtension($path).ToLower()
      $res.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
      $res.Headers['Accept-Ranges'] = 'bytes'; $res.Headers['Cache-Control'] = 'no-cache'
      $fs = [IO.File]::Open($path, 'Open', 'Read', 'ReadWrite')
      try {
        $len = $fs.Length; $start = 0; $end = $len - 1
        $range = $req.Headers['Range']
        if ($range -match '^bytes=(\d*)-(\d*)$' -and $len -gt 0) {
          if ($Matches[1] -ne '') { $start = [int64]$Matches[1]; if ($Matches[2] -ne '') { $end = [Math]::Min([int64]$Matches[2], $len - 1) } }
          elseif ($Matches[2] -ne '') { $start = [Math]::Max(0, $len - [int64]$Matches[2]) }
          $res.StatusCode = 206; $res.Headers['Content-Range'] = "bytes $start-$end/$len"
        }
        $count = $end - $start + 1
        $res.ContentLength64 = [Math]::Max(0, $count)
        if ($req.HttpMethod -ne 'HEAD' -and $count -gt 0) {
          [void]$fs.Seek($start, 'Begin')
          $buf = New-Object byte[] 262144
          while ($count -gt 0) {
            $r = $fs.Read($buf, 0, [int][Math]::Min($buf.Length, $count)); if ($r -le 0) { break }
            $res.OutputStream.Write($buf, 0, $r); $count -= $r
          }
        }
      } finally { $fs.Close() }
    }
    else { $res.StatusCode = 404 }
  } catch { }
  try { $res.Close() } catch { }
}
