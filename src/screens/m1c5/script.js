var dot_count=1;
$(document).ready(function(){
	$('.activityContainer').fadeIn();
	$('.arrow ').mouseenter(function(){
		$(this).addClass('over');
	})
	$('.arrow ').mouseleave(function(){
		$('.arrow ').removeClass('over');
	})	
	$('.arrow').off('click').on('click', function(){
		if($(this).hasClass('next-arrow')&& !$(this).hasClass('disabled')){
			$('.arrow').removeClass('disabled');
			$('.dot').removeClass('active');
			$('.dot').eq(dot_count).addClass('active');
			$('.step').removeClass('previous').removeClass('active').removeClass('next');		
			if(dot_count==1){
				$('.step').eq(dot_count-1).addClass('previous');
				$('.step').eq(dot_count).addClass('active');
				$('.step').eq(dot_count+1).addClass('next');
				dot_count++;
				$('.color').attr('data-active',dot_count);
			}
			else if(dot_count==2){
				$('.step').eq(dot_count-1).addClass('previous');
				$('.step').eq(dot_count).addClass('active');
				$('.step').eq(dot_count+1).addClass('next');
				dot_count++;
				$('.color').attr('data-active',dot_count);
			}
			else if(dot_count==3){
				$('.step').eq(dot_count-1).addClass('previous');
				$('.step').eq(dot_count).addClass('active');
				$('.step').eq(dot_count+1).addClass('next');
				dot_count++;
				$('.color').attr('data-active',dot_count);
			}
			else if(dot_count==4){
				$('.step').eq(dot_count-1).addClass('previous');
				$('.step').eq(dot_count).addClass('active');
				$('.step').eq(dot_count+1).addClass('next');
				dot_count++;
				$('.color').attr('data-active',dot_count);
				$(this).addClass('disabled');
				complete_page();
				enableNextBtn();
			}
		}
		else if($(this).hasClass('prev-arrow')&& !$(this).hasClass('disabled')){
			$('.arrow').removeClass('disabled');
			$('.step').removeClass('previous').removeClass('active').removeClass('next');			
			if(dot_count==2){
				dot_count--;
				$('.color').attr('data-active',dot_count);
				$(this).addClass('disabled');
				$('.step').eq(dot_count-2).addClass('previous');
				$('.step').eq(dot_count-1).addClass('active');
				$('.step').eq(dot_count).addClass('next');
			}
			else if(dot_count==3){
				dot_count--;
				$('.color').attr('data-active',dot_count);
				$('.step').eq(dot_count-2).addClass('previous');
				$('.step').eq(dot_count-1).addClass('active');
				$('.step').eq(dot_count).addClass('next');
			}
			else if(dot_count==4){
				dot_count--;
				$('.color').attr('data-active',dot_count);
				$('.step').eq(dot_count-2).addClass('previous');
				$('.step').eq(dot_count-1).addClass('active');
				$('.step').eq(dot_count).addClass('next');
			}
			else if(dot_count==5){
				dot_count--;
				$('.color').attr('data-active',dot_count);
				$('.step').eq(dot_count-2).addClass('previous');
				$('.step').eq(dot_count-1).addClass('active');
				$('.step').eq(dot_count).addClass('next');
			}
			$('.dot').removeClass('active');
			$('.dot').eq(dot_count-1).addClass('active');
		}
		
	})
	
	$(document).off('keyup').on('keyup', function(e){
		e.stopImmediatePropagation();
		var numKey = e.keyCode || e.which;
		if($('.activityContainer').attr('data-key') == 'enter')
		{
			if(numKey == 40){						
				if(dot_count <= 5)
				{
					$('.next-arrow').trigger('click');					
				}		
			}
			if(numKey == 38){
				if(dot_count > 0){				
					$('.prev-arrow').trigger('click');					
				}
			}
		}
	})
})