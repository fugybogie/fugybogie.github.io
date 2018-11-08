 $(document).ready(function(){
	 $(".imgB2").click(function(){
		 $("body").css("overflow-y", "hidden");
		 $(".popup").css("z-index", "999");
		  $(".view").css("z-index", "0");
		 });
		 	 $(".close3").click(function(){
		 $("body").css("overflow-y", "hidden");
         $("body").css("z-index", "99");
		 $(".popup").css("z-index", "0");
		  $(".view").css("z-index", "999");
		  
		var iframe = document.getElementById('iVid');
		iframe.src = iframe.src;
	
		var iframe02 = document.getElementById('iVid02');
		iframe02.src = iframe02.src;
		
		var iframe03 = document.getElementById('iVid03');
		iframe03.src = iframe03.src;
		
		var iframe04 = document.getElementById('iVid04');
		iframe04.src = iframe04.src;
		
		var iframe05 = document.getElementById('iVid05');
		iframe05.src = iframe05.src;
		
		var iframe06 = document.getElementById('iVid06');
		iframe06.src = iframe06.src;
		
		var iframe07 = document.getElementById('iVid07');
		iframe07.src = iframe07.src;
		
		var iframe08 = document.getElementById('iVid08');
		iframe08.src = iframe08.src;
		
		var iframe09 = document.getElementById('iVid09');
		iframe09.src = iframe09.src;
		
		var iframe11 = document.getElementById('iVid11');
		iframe11.src = iframe11.src;
		
		var iframe10 = document.getElementById('iVid10');
		iframe10.src = iframe10.src;
		 
		var iframe12 = document.getElementById('iVid12');
		iframe12.src = iframe12.src;
		
		});
		 
		 $(".Like").hover(function(){
		 $(".LineText").toggleClass("left");
		 $(".LineText2").toggleClass("left2");
		 $(".LineText3").toggleClass("left3");
		 });
	 });


// based on JQ I found here: http://stackoverflow.com/posts/3842442/revisions
//initial rotation
$('.photo').each(function() {
    var randrot = Math.random() * 20 - 10; //has to be local to run w/ each function call
    $(this).css('transform', 'rotate(' + randrot + 'deg) scale(1)');
});

//hover/unhover rotations
$('.photo').hover(function() {
    var randrot = Math.random() * 20 - 10; //has to be local to run w/ each function call
  $(this).css({
    transform: "rotate(" + randrot + "deg) scale(1.25)", 
    'z-index': "1"//kind of hacky, but standard notation didn't like the '-' in z-index, open to suggestions
    });
}, function() {
    var randrot = Math.random() * 20 - 10; //has to be local to run w/ each function call
  $(this).css({
    transform: "rotate(" + randrot + "deg) scale(1)", 
    'z-index': "0"//kind of hacky, but standard notation didn't like the '-' in z-index, open to suggestions
    });
});



$(document).ready(function(){
    //FANCYBOX
    //https://github.com/fancyapps/fancyBox
    $(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    });
});





$(window).load(function(){
	var height = window.innerHeight,
  x= 0, y= height/2,
	curveX = 10,
	curveY = 0,
	targetX = 0,
	xitteration = 0,
	yitteration = 0,
	menuExpanded = false;
	
	blob = $('#blob'),
	blobPath = $('#blob-path'),

	hamburger = $('.hamburger');

	$(this).on('mousemove', function(e){
		x = e.pageX;
		
		y = e.pageY;
	});

	$('.hamburger, .menu-inner').on('mouseenter', function(){
		$(this).parent().addClass('expanded');
		menuExpanded = true;
	});

	$('.menu-inner').on('mouseleave', function(){
		menuExpanded = false;
		$(this).parent().removeClass('expanded');
	});

	function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
	}

	var hoverZone = 150;
	var expandAmount = 20;
	
	function svgCurve() {
		if ((curveX > x-1) && (curveX < x+1)) {
			xitteration = 0;
		} else {
			if (menuExpanded) {
				targetX = 0;
			} else {
				xitteration = 0;
				if (x > hoverZone) {
					targetX = 0;
				} else {
					targetX = -(((60+expandAmount)/100)*(x-hoverZone));
				}			
			}
			xitteration++;
		}

		if ((curveY > y-1) && (curveY < y+1)) {
			yitteration = 0;
		} else {
			yitteration = 0;
			yitteration++;	
		}

		curveX = easeOutExpo(xitteration, curveX, targetX-curveX, 100);
		curveY = easeOutExpo(yitteration, curveY, y-curveY, 100);

		var anchorDistance = 200;
		var curviness = anchorDistance - 40;

		var newCurve2 = "M60,"+height+"H0V0h60v"+(curveY-anchorDistance)+"c0,"+curviness+","+curveX+","+curviness+","+curveX+","+anchorDistance+"S60,"+(curveY)+",60,"+(curveY+(anchorDistance*2))+"V"+height+"z";

		blobPath.attr('d', newCurve2);

		blob.width(curveX+60);

		hamburger.css('transform', 'translate('+curveX+'px, '+curveY+'px)');
    
    $('h2').css('transform', 'translateY('+curveY+'px)');
		window.requestAnimationFrame(svgCurve);
	}

	window.requestAnimationFrame(svgCurve);
	
});

$('#build').bind('click', function() {
  var inputText = $('#buildInput').val();
  var regMessage = /^#(\d):\s([^#.]*)/gm;
  var messages = inputText.split(regMessage);
  $('#phone').empty();
  for (var i=1; i<messages.length; i=i+3) {
    addMsg(messages[i], messages[i+1]);
  }
  return false;
})

$('#send').bind('submit', function() {
  var msgText = $('#msgInput').val();
  $('#msgInput').val('');
  
  if (msgText != '') addMsg(1, msgText);
  
  $('#phone').animate({ scrollTop: $('#phone').height() }, 600);
  
  return false;
})

function addMsg(people, msg) {
  
  var side = 'right';
  var $_phone = $('#phone');
  var $_lastMessage = $('#phone .message:last');
  
  if (people == 1) side = 'right';
  if (people == 2) side = 'left';
  
  if ($_lastMessage.hasClass(side)) {
    
    $_lastMessage.append(
      $('<div>').addClass('message-text').text(msg)
    )
    
  } else {
    
    $_phone.append(
      $('<div>').addClass('message '+side).append(
        $('<div>').addClass('message-text').text(msg)
      )
    )
    
  }
  
}