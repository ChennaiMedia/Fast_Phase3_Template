var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Review the boxes highlighted in red. Remember, you received 14000 that was invested by the shareholders.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","Your cash inflow and current cash balance are 14000. Note that you can review Aquasail's financial documents at any time by selecting the workbook icon in the upper left corner of the screen to access the FAST workbook.<br/><span><i>Select the forward arrow below to continue.</i></span>"]
var feedback_text1=["Review the areas highlighted in red and try again. You want to make sure to reflect the 14000 Cash and 14000 Equity Capital now in Aquasail.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","The only source of funds now is the shareholder’s money, and the use you made of it is to put it on Aquasail’s bank account, which is labelled 'cash' on the balance sheet. On the next page, we'll look at where to raise financing in more detail, with a mini-lecture from one of your course leaders."]
var getAnswet=[];
var correctAnswer=['14000'];
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

	$('.btn-text').on('click',function(){
		var targetId = $(this).attr('data-Id');
	
	
		if(targetId==0)
		{
			$('.question').show();
			$('.question1').hide();
			$('.move-box-holder').show();
			$('.contentStep').text('Update the cash statement to show that the first incoming cash is the 14000 invested by the shareholders.');
			
			//$('.moves-box-holder').show()
			$('.intro-panel').hide()
			$('.overlayDiv').hide()
			setTimeout(function(){$('.pop_up').removeClass('fade-in-up')},500)
			$(this).attr('data-Id','1')
		}
		
	
	
	})
	
	$('.submit').on('click',function(){
		
			$('.workbook-input').each(function(i,k){
				getAnswet[i]=$('.workbook-input').eq(i).val();
				if(getAnswet[i]==correctAnswer[i])
				{
					$('.workbook-input').eq(i).parent().removeClass('incorrect').addClass('correct')
					$('.workbook-input').eq(i).attr('disabled','disabled')
				}
				else{
					$('.workbook-input').eq(i).parent().addClass('incorrect')
				}
			})
		if(JSON.stringify(getAnswet)==JSON.stringify(correctAnswer)) {
			$('.submit').addClass('disabled');
			//$('.question').find('.submit').remove();
			$('.feedback-holder').hide();
			$('.feedback-holder').find('.title-text').html(feedback_title[2])
			$('.feedback-holder').find('.primary-text p').html(feedback_text[2])
			  $('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
			$('.feedback-holder').find('.show').text(''); 
			
			$('.feedback-holder').find('.btn-close').hide();
			
			/* $('.feedback-holder').find('.show').addClass('btn-text').removeClass('btn-icon');
			$('.feedback-holder').find('.show').text('Next');  */
			$('.move-box-holder').css('z-index','0');
			setTimeout(function(){$('.feedback-holder').show();$('.pop_up').show();},200);
			complete_page();
			enableNextBtn();
			
		}
		else
		{
		console.log("clickCount",clickCount)
			if(clickCount<3)
			{
				$('.feedback-holder').hide();
				$('.feedback-holder').find('.title-text').html(feedback_title[0])
				$('.feedback-holder').find('.primary-text p').html(feedback_text[0])
				//$('input[type="number"]').prop('disabled', true);
				setTimeout(function(){$('.feedback-holder').show();},200)
			}
			else{
				$('.feedback-holder').hide();
				$('.feedback-holder').find('.title-text').html(feedback_title[1])
				$('.feedback-holder').find('.primary-text p').html(feedback_text[1])
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
			if($('.feedback-holder').find('.show').text()=='SHOW ME')
			{
				$('.submit').addClass('disabled');
				$('.incorrect input').val('')
				$('.workbook-input').each(function(i,k){
					$('.workbook-input').eq(i).attr('placeholder',correctAnswer[i]);
					$('.workbook-input').eq(i).parent().removeClass('incorrect')
					$('.autoFill').eq(i).text(correctAnswer[i]);
				})
			}
			else{
				$('.pop_up').hide();
				$('.question1').show();
			}
		}
		
	})
	$(".workbook-input").on('keyup change',function(){
		console.log("dsafds")
		var isValid=true;
		$(".workbook-input").each(function(i){
			var element = $(this);
			if (element.val() == '') {
			   isValid = false;
			}
			//if($("input").attr('data-itemindex')==i)
			$('.autoFill').eq(i).text($(".workbook-input").eq(i).val());
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
})