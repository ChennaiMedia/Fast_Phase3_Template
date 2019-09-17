$(document).ready(function(){
	$('.activityContainer').fadeIn();
	$('.node').mouseenter(function(){
		$(this).addClass('over');
	})
	$('.node').mouseleave(function(){
		$('.node').removeClass('over');
	})
	$('.node').click(function(){
		var visited=true;
		$('.node').removeClass('active');
		$(this).addClass('active').addClass('visited');
		$('.node').each(function(i){
			if(!$('.node').eq(i).hasClass('visited'))
			visited=false;
			
		})
		if(visited){
			complete_page()
			enableNextBtn()
			/* disableNextBtn();//option delete
			$(".module_list").eq(modNo).addClass("menu_NotClick").removeClass('menu_Clickable');//option delete
			$(".module1 ").removeClass('menuHoverClass');//option delete */
		}
	})
	/* disableNextBtn();//option delete
	$(".module_list").eq(modNo).addClass("menu_NotClick").removeClass('menu_Clickable');//option delete
	$(".module1 ").removeClass('menuHoverClass');//option delete */
})