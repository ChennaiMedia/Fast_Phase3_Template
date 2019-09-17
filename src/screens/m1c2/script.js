$(document).ready(function(){
	setTimeout(function(){
		$('.activityContainer').fadeIn();
		complete_page();
		enableNextBtn();
		disablePrevBtn();
	},500)

})