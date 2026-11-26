@echo off
rem Double-click to open the site from a small local server (no install needed).
rem The Gallery then shows every file in images\for_animation_page by itself - just press F5.
rem Keep this window open while you browse; close it to stop the server.
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start_site.ps1"
pause
