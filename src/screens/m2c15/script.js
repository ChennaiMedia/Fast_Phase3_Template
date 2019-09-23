$(document).ready(function(){
	setTimeout(function(){
		$('.activityContainer').fadeIn();
		complete_page();
		enableNextBtn();
		 disableNextBtn();//option delete
	$(".module_list").eq(modNo).addClass("menu_NotClick").removeClass('menu_Clickable');//option delete
	$(".module1 ").removeClass('menuHoverClass');//option delete 
		
	},500)
	disableNextBtn();//option delete
	$(".module_list").eq(modNo).addClass("menu_NotClick").removeClass('menu_Clickable');//option delete
	$(".module1 ").removeClass('menuHoverClass');//option delete 
})