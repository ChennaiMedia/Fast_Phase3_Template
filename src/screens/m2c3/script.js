
$(document).ready(function(){
	$('#nav_nextBtn').removeClass('nav_nextBtnUp');
	$('#nav_prevBtn').removeClass('nav_prevBtnUp');
	$('.activityContainer').fadeIn();
	$('.video-btn').mouseenter(function(){
		$(this).addClass('over');
	})
	$('.video-btn').mouseleave(function(){
		$('.video-btn').removeClass('over');
	})
	$('.video-btn').on('click',function(){	
		$('#nav_nextBtn').addClass('nav_nextBtnUp');
		$('#nav_prevBtn').addClass('nav_prevBtnUp');
		$('.player').show();
		document.getElementById('jp_video_0').play();
		complete_page()
		enableNextBtn()
	})

})