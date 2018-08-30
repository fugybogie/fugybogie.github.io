function solidToggle(event) {
  event.preventDefault()
  var social = document.getElementsByClassName('social')[0]
  social.classList.toggle('no-bg')
}

function openSource(event) {
  event.preventDefault()
  window.open(
  'https://github.com/larsenwork/social.svg.min',
  '_blank'
  )
}

$(".ss-popup").click(function () {
    $("#video-view").show();
    var $this = $(this);
  var autoplay = "&amp;autoplay=1"
    var $iframe = $("<iframe>").attr("src", ($this.data("link") + autoplay)).css({"width": "100%", "height": "70%"});
    var $title = $("<h1>").text($this.data("title"));
    $("#video-view").append($iframe);
    $iframe.wrap("<div class='class-video'>");
});

$(".close-video").click(function () {
	$("#video-view").hide();
  $("#video-view iframe").attr("src", "");
});

$("#video-view .overlay").click(function () {
	$("#video-view").hide();
});