var feedback_title=['Not Quite','Enter the Correct Answer','NICE WORK!']
var feedback_text=["Check the areas highlighted in red and try again. Remember, the cash balance will be the sum of the incoming cash provided by investors and the bank. Equity 14000 + Bank loan 24000 = 38000.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","The second incoming cash is the 24000 provided by the bank. That brings Aquasail's cash balance to 38000."]
var bal_feedback_text=["Check the areas highlighted in red and try again. The left hand side should show the new assets: land, buildings and machinery, and that cash on the bank account has decreased.","Good try! Select the 'Show Me' button to reveal the correct answers and enter the numbers accordingly.","You have successfully updated Aquasail's balance sheet.<br/><span><i>Select the forward arrow below to continue.</i></span>"]
var getAnswet=[];
var correctAnswer=['-4000','-8000','-4800'];
var cash_bal=['38000','34000','26000'];
var BS_correctAnswer=['4000','8000','4800','21200'];
var showAnswer=['38000']; 
var tot_equity=['','','',''];
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
			$('.contentStep').html('Update the <b>Cash Statement</b> to record the Cash Outflow. Land: -4000, buildings -8000, and machinery -4800. Cash payments by Aquasail should always be recorded with a minus sign.');
			
			//$('.moves-box-holder').show()
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','1');
		}
		else if(targetId==1)
		{
			$('.question').show();
			$('.move-box-holder').show();
			$('.contentStep').html('Update the <b>Balance Sheet</b> (on the right) to show the increase of 24000 <b>Cash</b> on the left hand side, and the addition of 24000 <b>Bank Debt</b> on the right hand side.');
			
			$('.intro-panel').hide();
			$('.overlayDiv').hide();
			$(this).attr('data-Id','2');
			
			correctAnswer=BS_correctAnswer;
			feedback_text=bal_feedback_text;
			clickCount=1;
		}
		
	
	
	})
	
	$('.submit').on('click',function(){
		if($('.question1').css('display')=='none'){
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
				var autofillVal=Number($(".workbook-input").eq(i).val())+Number(cash_bal[i]);
				$('.cash_statement').find('.autoFill').eq(i).text(autofillVal);
				
				
				land=38000+$(".workbook-input").eq(i).val()
				building=land+$(".workbook-input").eq(i).val();
				machinery=building+$(".workbook-input").eq(i).val();
			})
		}
		else {
			$('.balancesheet-input').each(function(i,k){	
				getAnswet[i]=$('.balancesheet-input').eq(i).val();
				if(getAnswet[i]==correctAnswer[i])
				{
					$('.balancesheet-input').eq(i).parent().removeClass('incorrect').addClass('correct')
					$('.balancesheet-input').eq(i).attr('disabled','disabled')
				}
				else{
					$('.balancesheet-input').eq(i).parent().addClass('incorrect')
				}
				//var autofillVal=Number($(".balancesheet-input").eq(i).val())+Number(tot_equity[i]);
				tot_equity[i]=Number($(".balancesheet-input").eq(i).val());
			})
				$('.balance_statement').find('.autoFill').eq(0).text(tot_equity.reduce(getSum));
		}
		if(JSON.stringify(getAnswet)==JSON.stringify(correctAnswer)) {
			$('.submit').addClass('disabled');
			$('.cash_statement').find('.submit').remove();
			//$('.cash_statement').find('.autoFill').removeClass('autoFill');
			$('.feedback-holder').hide();
			$('.feedback-holder').find('.title-text').html(feedback_title[2]);
			$('.feedback-holder').find('.primary-text p').html(feedback_text[2]);
			if($('.question1').css('display')=='block'){
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');  
				$('.feedback-holder').find('.btn-close').hide();
				complete_page();
				enableNextBtn();
			}
			else{
				$('.feedback-holder').find('.show').addClass('btn-text').removeClass('btn-icon');
				$('.feedback-holder').find('.show').text('Next');  
			}
			/*$('.move-box-holder').css('z-index','0');*/
			setTimeout(function(){$('.feedback-holder').show();},200);
			
			
		}
		else
		{
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
	$('.show').on('click',function(){
		//$('input[type="number"]').prop('disabled', false);
		$('.feedback-holder').hide();
		if(!$('.btn-close').hasClass('btn-icon'))
		{
			if($('.feedback-holder').find('.show').text()=='SHOW ME')
			{
				$('.submit').addClass('disabled');
				$('.incorrect input').val('')
				if($('.question1').css('display')=='none'){
					$('.workbook-input').each(function(i,k){
						$('.workbook-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.workbook-input').eq(i).parent().removeClass('incorrect');
						var autofillVal=Number(correctAnswer[i])+Number(cash_bal[i]);
						$('.cash_statement').find('.autoFill').eq(i).text(autofillVal);
					});
				}
				else{
					$('.balancesheet-input').each(function(i,k){
						$('.balancesheet-input').eq(i).attr('placeholder',correctAnswer[i]);
						$('.balancesheet-input').eq(i).parent().removeClass('incorrect');
						//var autofillVal=Number(correctAnswer[i])+cash_bal;
						$('.balance_statement').find('.autoFill').eq(i).text(showAnswer[i]);
					})
				}
			}
			else{
				
				$('.question').hide();
				$('.statementPop').show();
				$('.statementPop').find('.title-text').text('UPDATE BALANCE SHEET')
				$('.statementPop').find('.primary-text').html("<p>Now Now update Aquasail's Balance Sheet. The right hand side does not change: there are no new sources of funding. Remember, Land: 4000, Buildings: 8000, Machinery: 4800.</p>");
				$('.feedback-holder').find('.show').addClass('btn-icon').removeClass('btn-text');
				$('.feedback-holder').find('.show').text('');
				
				$('.cash_statement').find('.numbers90').each(function(i,k){
				//$('.cash_statement').find('.workbook-input').eq(i).parent().eq(i).html($('.workbook-input').eq(i).val()).removeClass('correct').addClass('static');
					$('.cash_statement').find('.numbers90').eq(i).html($('.numbers90').eq(i).children().val()).removeClass('correct').addClass('static');
					
				});
			}
		}
		
	})
	
	$(".workbook-input").on('focus',function(){
		$(this).parent().removeClass('incorrect');
	})
	$(".workbook-input").on('keyup change',function(){
		$(this).parent().removeClass('incorrect');
		$(this).focus();
		var isValid=true;
		$(".workbook-input").each(function(i){
			var element = $(this);
			if (element.val() == '') {
			   isValid = false;
			}
		})
		if(isValid)
		$('.submit').removeClass('disabled');
	});
	$(".balancesheet-input").on('keyup change',function(){
		$(this).parent().removeClass('incorrect');
		$(this).focus();
		var isValid=true;
		$(".balancesheet-input").each(function(i){
			var element = $(this);
			if (element.val() == '') {
			   isValid = false;
			}
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
	function getSum(total, num) {
	  return total + num;
	}
})