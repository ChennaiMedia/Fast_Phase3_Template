var pop_up_title=['MENU BUTTON','WORKBOOK OVERLAY','AQUASAIL OVERLAY','PROGRESS BAR','BACK BUTTON','NEXT BUTTON']
var primary_text=[
			'This button reveals the FAST Primer menu. Pages and activities will unlock as you make your way through the course. Upon completing the Primer, you may return to any previous pages as you please.',
			'This icon brings you to the FAST workbook. You will use this workbook frequently throughout the course in order to track the financial development of your business, Aquasail.',
			'The Aquasail Overlay displays the most recent moves you have made within the Aquasail simulation.<br/> This feature allows you to find the information and figures you need in order to complete various workbook activities.',
			'The Progress Bar allows you to know exactly where you are in the Primer at any given moment. Each letter represents the various modules covered: S for Startup, Y1 for Year 1, T for Theory, and Y2 for Year 2.',
			'The Back Button allows you to return to the previous page.',
			'The Next Button will appear as each page and activity is completed. Select this button in order to advance through the Primer.'
			
			]



$(document).ready(function(){
	enablePrevBtn();
	//$('.activityContainer').show();
	$('.activityContainer').fadeIn();
	$('.btn-text').mouseenter(function(){
		$(this).addClass('over');
	})
	$('.btn-text').mouseleave(function(){
		$('.btn-text').removeClass('over');
	})
	$('.btn-text').on('click',function(){
	var targetId = $(this).attr('data-Id');
	
		if(targetId==0)
		{
			$('.arrow-container').addClass('up').removeClass('down');
			$('.next').attr('data-Id','1');
			$('.next').text('Next');
			$('.pop_up').show().css({'top': '20px','left': '12px','right': '','bottom':''});
			$('.pop_up_title').html(pop_up_title[targetId])
			$('.pop_up_content .primary-text').html(primary_text[targetId])
			$('.pop_up').addClass('fade-in-up');
			setTimeout(function(){$('.pop_up').removeClass('fade-in-up')},500);
		}
		else if(targetId==1)
		{
			$('.pop_up').show().css({'top': '20px','left': '57px'});
			$('.pop_up_title').html(pop_up_title[targetId])
			$('.pop_up_content .primary-text').html(primary_text[targetId])
			$('.pop_up').addClass('fade-in-up')
			setTimeout(function(){$('.pop_up').removeClass('fade-in-up')},500)
			$(this).attr('data-Id','2')
		} 
		else if(targetId==2)
		{
			$('.pop_up').show().css({'top': '20px','left': '102px'});
			$('.pop_up_title').html(pop_up_title[targetId])
			$('.pop_up_content .primary-text').html(primary_text[targetId])
			$('.pop_up').addClass('fade-in-up')
			setTimeout(function(){$('.pop_up').removeClass('fade-in-up')},500)
			$(this).attr('data-Id','3')
		}  
		else if(targetId==3)
		{
			$('.pop_up').show().css({'top': '20px','right': '340px','left':''});
			$('.pop_up_title').html(pop_up_title[targetId])
			$('.pop_up_content .primary-text').html(primary_text[targetId])
			$('.pop_up').addClass('fade-in-up')
			setTimeout(function(){$('.pop_up').removeClass('fade-in-up')},500)
			$(this).attr('data-Id','4')
		}  
		else if(targetId==4)
		{
			$('.pop_up').show().css({'top': '','left':'','right': '75px','bottom':'90px'});
			$('.pop_up_title').html(pop_up_title[targetId])
			$('.pop_up_content .primary-text').html(primary_text[targetId])
			$('.pop_up').addClass('fade-in-down')
			setTimeout(function(){$('.pop_up').removeClass('fade-in-down')},500)
			$(this).attr('data-Id','5');
			$('.arrow-container').removeClass('up').addClass('down');
		}   
		else if(targetId==5)
		{
			$('.pop_up').show().css({'top': '','left':'','right': '20px','bottom':'110px'});
			$('.pop_up_title').html(pop_up_title[targetId])
			$('.pop_up_content .primary-text').html(primary_text[targetId])
			$('.pop_up').addClass('fade-in-down')
			setTimeout(function(){$('.pop_up').removeClass('fade-in-down')},500)
			$(this).attr('data-Id','6');
			$('.arrow-container').removeClass('up').addClass('down');
			$('.next').text('Done');
			complete_page()
			enableNextBtn()
		}    
		else if(targetId==6)
		{
			$('.pop_up').hide()
		} 
	
	
	})

})