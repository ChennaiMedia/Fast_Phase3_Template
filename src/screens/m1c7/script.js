var pop_up_title=['WORKBOOK OVERLAY','AQUASAIL OVERLAY','INFO','INPUT ITEM']
var primary_text=[
			'Throughout the course, you may need to access previous pages of the workbook in order to complete calculations. Do this by clicking the workbook icon and selecting the page and year needed.',
			'Remember you may access the Aquasail simulation at any point to find the figures needed to complete your FAST workbook.',
			'Select this button to review the instruction for the current workbook activity.',
			'Enter your figures and calculations in these spaces. Be sure to eliminate commas and when necessary, round to the nearest second decimal place.',
			
			]
var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Be sure to indicate the move of 1100 in all fields.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","Well done! You have now completed this tutorial. This was just for practice - when you start the simulation for real the 1100 you just moved will be reset to 0."]
var getAnswet=[];
var correctAnswer=['1100','1100'];
var clickCount=1;			


$(document).ready(function(){
	
	$('.btn-text,.btn-icon,.btn-info').mouseenter(function(){
		$(this).addClass('over');
	})
	$('.btn-text,.btn-icon,.btn-info').mouseleave(function(){
		$('.btn-text').removeClass('over');
		$('.btn-icon').removeClass('over');
		$('.btn-info').removeClass('over');
	})
	$('.moves-box-holder .btn-icon').click(function(){
	
		$('.moves-box-holder').toggleClass('expanded');
		
	})
	$('.btn-info').click(function(){
	
		$('.info-overlay,.btn-info').toggleClass('expanded');
	
	})
	
	$('.activityContainer').fadeIn();
	$('.btn-text').on('click',function(){
		var targetId = $(this).attr('data-Id');
	
	
		if(targetId==0)
		{
			$('.question').show()
			$('.overlayDiv').show()
			$('.moves-box-holder').show()
			$('.intro-panel').hide()
			$('.pop_up').show().css({'top': '20px','left': '57px'});
			$('.pop_up_title').html(pop_up_title[targetId])
			$('.pop_up_content .primary-text').html(primary_text[targetId])
			$('.pop_up').addClass('fade-in-up')
			setTimeout(function(){$('.pop_up').removeClass('fade-in-up')},500)
			$(this).attr('data-Id','1')
		}
		else if(targetId==1)
		{
			$('.pop_up').show().css({'top': '20px','left': '102px'});
			$('.pop_up_title').html(pop_up_title[targetId])
			$('.pop_up_content .primary-text').html(primary_text[targetId])
			$('.pop_up').addClass('fade-in-up')
			setTimeout(function(){$('.pop_up').removeClass('fade-in-up')},500)
			$(this).attr('data-Id','2')
		} 
		else if(targetId==2)
		{
			$('.pop_up').show().css({'top': $('.btn-info').offset().top-55,'left': $('.btn-info').offset().left-$('.mainContainer').offset().left-320});
			$('.pop_up_title').html(pop_up_title[targetId])
			$('.pop_up_content .primary-text').html(primary_text[targetId])
			//$('.pop_up').addClass('fade-in-up')
			//setTimeout(function(){$('.pop_up').removeClass('fade-in-up')},500)
			$(this).attr('data-Id','3');
			$('.arrow-container').removeClass('up').addClass('right');
			
		} 
		else if(targetId==3)
		{
			$('.pop_up').show().css({'top': $('.workbook-input').offset().top,'left': ($('.workbook-input').offset().left-$('.mainContainer').offset().left)});
			$('.pop_up_title').html(pop_up_title[targetId])
			$('.pop_up_content .primary-text').html(primary_text[targetId])
			$('.pop_up').addClass('fade-in-up')
			setTimeout(function(){$('.pop_up').removeClass('fade-in-up')},500)
			$(this).attr('data-Id','4');
			$('.arrow-container').removeClass('right').addClass('up');
			$('.next').text('Done');

			/* complete_page()
			enableNextBtn() */
		}    
		else if(targetId==4)
		{
			$('.pop_up').hide()
			$('.overlayDiv').hide()
		} 
	
	
	})
	
	$('.submit').on('click',function(){
		
			$('.workbook-input').each(function(i,k){
				getAnswet[i]=$('input').eq(i).val();
				if(getAnswet[i]==correctAnswer[i])
				{
					$('input').eq(i).parent().addClass('correct')
					$('input').eq(i).attr('disabled','disabled')
				}
				else{
					$('input').eq(i).parent().addClass('incorrect')
				}
			})
		if(JSON.stringify(getAnswet)==JSON.stringify(correctAnswer)) {
			$('.submit').addClass('disabled');
			$('.feedback-holder').hide();
			$('.feedback-holder').find('.title-text').text(feedback_title[2])
			$('.feedback-holder').find('.primary-text p').text(feedback_text[2])
			$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
			$('.feedback-holder').find('.show').text('');
			//$('input[type="number"]').prop('disabled', true);
			setTimeout(function(){$('.feedback-holder').show();},200);
			complete_page()
			enableNextBtn()
		}
		else
		{
			if(clickCount<3)
			{
				$('.feedback-holder').hide();
				$('.feedback-holder').find('.title-text').text(feedback_title[0])
				$('.feedback-holder').find('.primary-text p').text(feedback_text[0])
				//$('input[type="number"]').prop('disabled', true);
				setTimeout(function(){$('.feedback-holder').show();},200)
			}
			else{
				$('.feedback-holder').hide();
				$('.feedback-holder').find('.title-text').text(feedback_title[1])
				$('.feedback-holder').find('.primary-text p').text(feedback_text[1])
				$('.feedback-holder').find('.show').addClass('btn-text').removeClass('btn-icon');
				$('.feedback-holder').find('.show').text('SHOW ME');
				//$('input[type="number"]').prop('disabled', true);
				setTimeout(function(){$('.feedback-holder').show();},200)
			}
			clickCount++;
		}	
	})
	$('.btn-close').on('click',function(){
		//$('input[type="number"]').prop('disabled', false);
		$('.feedback-holder').hide();
		if(!$('.btn-close').hasClass('btn-icon'))
		{
			$('.submit').addClass('disabled');
			$('.incorrect input').val('')
			$('.workbook-input').each(function(i,k){
				$('input').eq(i).attr('placeholder',correctAnswer[i]);
				$('input').eq(i).parent().removeClass('incorrect')
				$('.autoFill').eq(i).text(correctAnswer[i]);
			})
		}
		
	})
	/* $("input").focus(function(){
		if($(this).parent().hasClass('incorrect'))
		{	
			//$(this).val('');
			$(this).parent().removeClass('incorrect');
		}
	}); */
	
	$("input").on('keyup change',function(){
		
		var isValid=true;
		$("input").each(function(i){
			var element = $(this);
			if (element.val() == '') {
			   isValid = false;
			}
			//if($("input").attr('data-itemindex')==i)
			$('.autoFill').eq(i).text($("input").eq(i).val());
		})
		if(isValid)
		$('.submit').removeClass('disabled');
		
	});
	$('input[type="number"]').keypress(function (e) { 
			var numKey = e.keyCode || e.which;		
			if (numKey != 8 && numKey != 0 && numKey != 45 && (numKey < 48 || numKey > 57)) {        
				return false;
		}
	});
	$(window).resize(function(){
		if($('.pop_up .btn-text').attr('data-Id')=='3'){
			$('.pop_up').css({'top': $('.btn-info').offset().top-55,'left': $('.btn-info').offset().left-$('.mainContainer').offset().left-320});
		}else if($('.pop_up .btn-text').attr('data-Id')=='4'){
			$('.pop_up').css({'top':  $('.workbook-input').offset().top,'left':  ($('.workbook-input').offset().left-$('.mainContainer').offset().left)});
		}
	});
})