$(document).ready(function(){
  $("img").click(function(){
  var t = $(this).attr("src");
  $(".modal-body").html("<img src='"+t+"' class='modal-img'>");
  $("#myModal").modal();
});

$("video").click(function(){
  var v = $("video > source");
  var t = v.attr("src");
  $(".modal-body").html("<video class='model-vid' controls><source src='"+t+"' type='video/mp4'></source></video>");
  $("#myModal").modal();  
});
});//EOF Document.ready



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


