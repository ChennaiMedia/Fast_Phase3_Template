
var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Check the areas highlighted in red and try again. Remember, cash has now increased to 38000. Aquasail received 24000 from the bank which increased its total equity and liabilities too.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have successfully updated Aquasail's cash statement and balance sheet. On the next page, we'll look at sources of funds in more detail, with a mini-lecture from one of your course leaders."]
var getAnswet=[];
var correctAnswer=['38000','24000'];
var showAnswer=['38000','38000'];
var tot_equity=['','14000'];
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
			$('.question1').show()
			$('.overlayDiv').show()
			//$('.moves-box-holder').show()
			$('.intro-panel').hide()
			$('.overlayDiv').hide()
			setTimeout(function(){$('.pop_up').removeClass('fade-in-up')},500)
			$(this).attr('data-Id','1')
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
				//var autofillVal=Number(correctAnswer[i])+tot_equity;
				$('.autoFill').eq(i).text(showAnswer[i]);

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
			if($("input").eq(i).val()!='')
			var autofillVal=Number($("input").eq(i).val())+Number(tot_equity[i]);
			$('.autoFill').eq(i).text(autofillVal);
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
	/* $(window).resize(function(){
		if($('.pop_up .btn-text').attr('data-Id')=='3'){
			$('.pop_up').css({'top': $('.btn-info').offset().top-55,'left': $('.btn-info').offset().left-$('.mainContainer').offset().left-320});
		}else if($('.pop_up .btn-text').attr('data-Id')=='4'){
			$('.pop_up').css({'top':  $('.workbook-input').offset().top,'left':  ($('.workbook-input').offset().left-$('.mainContainer').offset().left)});
		}
	}); */
})