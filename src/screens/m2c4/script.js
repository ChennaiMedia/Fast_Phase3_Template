
$(document).ready(function(){
	
	$('.activityContainer').fadeIn();
	$('.video-btn').mouseenter(function(){
		$(this).addClass('over');
	})
	$('.video-btn').mouseleave(function(){
		$('.video-btn').removeClass('over');
	})
	$('.video-btn').on('click',function(){	
		$('#nav_nextBtn').css({'bottom': '120px'});
		$('#nav_prevBtn').css({'bottom': '135px'});
		$('.player').show();
		document.getElementById('jp_video_0').play();
		complete_page()
		enableNextBtn()
	})

})