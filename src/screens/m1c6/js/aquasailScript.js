//javascript
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

var addonScale = 0.10;
var maxScale = 1;
var currentScale = 0;
var zoomLevel = 0;
var zoomVal = 0;
var oneTimeSet = true;
var scalePos = 0;
var oneloadset = true;
var sprite;
var spriteAnimator;	
var rightSprite;
var moveStep = 0;
var simImgPath = 'assets/images/simulation/';
var zoomPos = {
	left:'leftMov',
	up:'topMov',
	right:'rightMov',
	down:'bottomMov'
};
var aquaValues = {
	supls_1:{data:['tokenRawMat','token1000','token100'],val:[0,0,0],areaTotal:0},
	emps_2:{data:['tokenWages','token1000','token100'],val:[0,0,0],areaTotal:0},
	fgw_3:{data:['tokenfinGoods'],val:[0],areaTotal:0},
	rmw_4:{data:['tokenfinGoods'],val:[0],areaTotal:0},
	asslines1_5:{data:['tokenfinGoods','tokenRawMat','tokenWages'],val:[0,0,0],areaTotal:0},
	asslines2_5:{data:['tokenfinGoods','tokenRawMat','tokenWages'],val:[0,0,0],areaTotal:0},
	asslines3_5:{data:['tokenfinGoods','tokenRawMat','tokenWages'],val:[0,0,0],areaTotal:0},
	asslines4_5:{data:['tokenfinGoods','tokenRawMat','tokenWages'],val:[0,0,0],areaTotal:0},
	cash_6:{data:['token5000','token1000','token100'],val:[0,0,0],areaTotal:0},
	post_7:{data:[],val:[],areaTotal:0},
	accspay_8:{data:[],val:[],areaTotal:0},
	bankdt_9:{data:['token100'],val:[0],areaTotal:0},
	equity_10:{data:['token100'],val:[0],areaTotal:0},
	accsrec_11:{data:[],val:[],areaTotal:0},
	shareholds_12:{data:['token5000','token1000'],val:[0,0],areaTotal:0},
	bank_13:{data:['token5000','token1000','token100'],val:[1,1,1],areaTotal:6100},
	tax_14:{data:['token100'],val:[0],areaTotal:0},
	services_15:{data:['token100'],val:[0],areaTotal:0},
	propagt_16:{data:['token5000','token1000'],val:[0,0],areaTotal:0},
	cust_17:{data:['tokenfinGoods','token5000','token1000','token100'],val:[0,0,0,0],areaTotal:0},
};

var aquaSteps = {
	step_0:{
		text:'<h3>Tutorial</h3><p>In this Primer you will interact with this 3D simulation of a yacht-building business, Aquasail.</p><p>Before we use the simulation in the course, here is a quick tutorial on how to use it.</p><p>In the middle of the simulation is a main building. Select this tutorial instruction window and drag it to the left or right so you can see this building, which is Aquasail headquarters. In it are rooms representing different functions, for example the yacht assembly hall, warehouses for raw materials and finished goods, and back office. Around the Aquasail building are external institutions and services, such as the bank, shareholders, customers and suppliers.</p>',
		questTxt:'First, select the map icon in the bottom left hand corner to display the names of all the locations in the simulation. You can use the navigation pad at the bottom to move the map around and zoom in and out. Try switching the names on and off – can you remember what each of the locations are? Now test yourself with the names switched off. Select the Suppliers location.',
		feedback:'no',
		questPanel:'yes',
		stayScreen:'no',
		clickelem:'suplssprite_1',
		customCursor:'no',
		updateArea:'no',
		customCursorSel:'',
		postBox:'',
		changeSprite:'no',
		complete:false	
	},
	step_1:{
		text:'<h3>Well Done!</h3><p>When you select a location, you’ll see that it flips over and reveals one or more token holders. These token holders may contain cash, raw materials or finished goods. Throughout this Primer you will move cash or other resources into, through and out of the business. This will enable you to understand how a company’s finances work.</p>',
		questTxt:'Use the navigation arrows and the map to locate the Bank. Then select the Bank.',
		feedback:'yes',
		questPanel:'yes',
		stayScreen:'no',
		clickelem:'banksprite_13',
		customCursor:'no',
		updateArea:'no',
		customCursorSel:'',
		postBox:'',
		changeSprite:'no',
		complete:false
	},
	step_2:{
		text:'<h3>The Bank</h3><p>You should now see (don’t forget that you can drag this instruction window to a different location if it is in the way) that inside the Bank there are cash tokens in the placeholders, one 5000 cash piece (gold), one 1000 cash piece (silver) and one 100 cash piece (bronze). Note that when you select a location, the cash or resources it contains are shown on the dashboard at the top right of the simulation. </p>',
		questTxt:'',
		feedback:'yes',
		questPanel:'no',
		stayScreen:'yes',
		clickelem:'',
		customCursor:'no',
		updateArea:'no',
		customCursorSel:'',
		postBox:'',
		changeSprite:'no',
		complete:false
	},
	step_3:{
		text:'<h3>Next</h3><p>Next you will move cash from the Bank to the Cash location in the middle of the Aquasail building. This Cash location represents all the cash you currently have available in the business. Your current cash situation is always displayed on the dashboard at the top left of the simulation.</p>',
		questTxt:'Select the Bank, then select 1100 in tokens. Move them to the token holders in the cash location and deposit them there. Notice when you select tokens, the location you need to move them to will animate so you can see where they need to go.',
		feedback:'yes',
		questPanel:'yes',
		stayScreen:'no',
		clickelem:'banksprite_13',
		customCursor:'yes',
		updateArea:'no',
		cursorImage:'a1_cur1',		
		customCursorSel:'cashsprite_6',
		cashValues:[1,1,0],
		postBox:'',	
		areaData:[1,0,0],
		areaDataTotal:5000,	
		changeSprite:'yes',
		changeSrc:'bank_sprite_a1',
		complete:false	
	},
	step_4:{
		text:'<h3>Well Done!</h3> <p>With that move you have successfully borrowed 1100 cash from the Bank for Aquasail, and at the same time mastered the main drag-and-drop functionality you will be using in the simulation! </p> <p>Occasionally you will be asked to write yourself a note to remind yourself of cash you have borrowed. There is a virtual post-it pad for you to use for this purpose.</p>',
		questTxt:'Check it out—to make a note of the 1100 cash you borrowed, first select the post-it pad. A new window will open, asking you to type in the amount. Type in 1100 and select ‘write’. Then drag the post-it-pad to the Bank Debt location.',
		feedback:'yes',
		questPanel:'yes',
		stayScreen:'no',
		clickelem:'postsprite_7',
		customCursor:'yes',
		updateArea:'yes',
		cursorImage:'a1_cur2',		
		customCursorSel:'bankdtsprite_9',
		postBox:'yes',
		areaData:[0,1,1],
		areaDataTotal:1100,
		postValue:1100,
		changeSprite:'no',	
		complete:false	
	},
	step_5:{
		text:'<h3> Next-Update the Workbook</h3> <p>Select the arrow to continue to the next page, where you can record the transaction in the workbook.</p>',
		questTxt:'',
		feedback:'yes',
		questPanel:'no',
		stayScreen:'no',
		clickelem:'',
		customCursor:'',
		updateArea:'no',
		customCursorSel:'',	
		changeSprite:'no',	
		complete:true,		
	}		
}

$(document).ready(function(){	
	$('#zoomIn').off('click').on('click', goZoomIn).css('opacity','1');
	$('#zoomOut').off('click').css('opacity','0.5');
	$('.pan-btn').off('click').on('click', navAquasail);
	$('.aquasailPop,.postit-container').draggable({containment:'.aquasilCont'})	
	$('.downToggle').off('click').on('click', toggleContent);	
	isAquasil = true;			
	$('.aquasilInner').html(aquaSteps['step_'+moveStep].text);
	$('.contentStep').html(aquaSteps['step_'+moveStep].questTxt);	
	for(var i=0;i<Object.keys(aquaLegends).length;i++)
		{
			var legObj = Object.keys(aquaLegends)[i];
			var lbl = aquaLegends[legObj].txt;
			var lp = aquaLegends[legObj].lpos;
			var tp = aquaLegends[legObj].tpos; 
			$('.legendDis').append('<div class="legendAqua" style="left:'+lp+'px;top:'+tp+'px;">'+lbl+'</div>');
		}
	$('.zoompan,.legend,.legendAqua').css('display','none');	
	$("#closePanel,#postitBtn,#postitClose").hover(function(event) {
		$(this).addClass('over');
	},function (event) {
		$(this).removeClass('over');
	});
	$('#closePanel').off('click').on('click',hidePopNext);	
	$('#postitBtn').off('click').on('click',validateAns);	
	$('.aquasilCont').on('mousemove', cursorMoving).off('mousemove');
	$('#postitClose').off('click').on('click',closePost);
	
	var sound = document.createElement('audio');
	sound.id = 'audiobg';	
	sound.loop = true;
	sound.src = 'assets/audios/ambient.mp3';
	sound.type = 'audio/mpeg';
	document.body.appendChild(sound);
	$('#audiobg').trigger('play');	
	$('.zoompan').css('display','block');	
	$('#map-btn').css('background-color','#981d97');
	$('#map-btn').removeClass('animating');	
	var ovrlayH = docInnerHeight-standardTop;		
	$('.aquasilCont').css('height',ovrlayH+"px");
});

function cursorMoving(e){	
	var leftPos = ((e.clientX)-$(this).offset().left)+15;
	var topPos = ((e.clientY)-$(this).offset().top)-0;	
	$('.mouseCursor').css('left', leftPos).css('top',topPos);
}

function canvasResize(){	
	var aquaW = $('.aquasilCont').width();
	var aquaH = $('.aquasilCont').height();
	var canvasBW = $('.canvasBase').width();
	var canvasBH = $('.canvasBase').height();
	
	var leftPos = -(canvasBW - aquaW)/2;
	var topPos = -(canvasBH - aquaH)/2;
	scalePos = (aquaH/canvasBH)+zoomVal+addonScale;			
	$('.canvasBase').stop().animate({
		  transform: 'translate('+leftPos+'px, '+topPos+'px) scale('+(scalePos)+') '
		},400,function(){			
	});	
	oneTimeSet = true;	
}

function hidePopNext(){
	var keepScreen = aquaSteps['step_'+moveStep].stayScreen;
	$('.area-info-box-holder').css('display','none');	
	if(keepScreen == 'yes'){
		moveStep++;
		$('.aquasilInner').html(aquaSteps['step_'+moveStep].text);
		$('.aquasailPop').css('left','0px').css('top','0px');
	}
	else
	{
		$('.overlayAquasil').css('display','none');
		$('[data-common="commonSprite"]').off('click').on('click', runSprite);
		var currElem = aquaSteps['step_'+moveStep].clickelem;
		var showqpanel = aquaSteps['step_'+moveStep].questPanel;	
		if(showqpanel == 'yes'){ 
			$('.contentStep').html(aquaSteps['step_'+moveStep].questTxt);
			$('.move-box-holder').fadeIn(200);
		}
		childAnim(currElem);
	}	
	$('[data-common="commonSprite"]').each(function(a,b){
		if($(this).parent().attr('data-flip') == 'flip'){
			var getAnimator = window[$(this).attr('class')+'_Animator'];			
			getAnimator.reverse();
			getAnimator.play();
			$(this).parent().attr('data-flip','normal');
			$(this).parent().children().eq(0).css('display','block');
			$(this).parent().children().eq(1).css('display','none');	
		}
	});	
	if(moveStep<=0) $('#map-btn').addClass('animating');	
}

function showPopNext(){
	moveStep++;	
	$('.mouseCursor').css('display','none');				
	$('.aquasilCont').off('mousemove');	
	var checkComplete = aquaSteps['step_'+moveStep].complete;	
	$('[data-common="commonSprite"]').off('click').css('cursor','default');	
	$('.aquasilInner').html(aquaSteps['step_'+moveStep].text);
	$('.aquasailPop').css('left','0px').css('top','0px');
	$('.overlayAquasil').css('display','flex');
	$('#closePanel').text('Continue');
	$('.move-box-holder').fadeOut(200);
	if(aquaSteps['step_'+moveStep].feedback == 'yes'){
		$('.move-feedback-box-holder').css('display','block'); 
	}
	else
	{
		$('.move-feedback-box-holder').css('display','none'); 
	}
	if(checkComplete){		
		$('#closePanel').css('display','none');		
		stopSprite();		
		$('[data-common="commonSprite"]').each(function(a,b){
			if($(this).parent().attr('data-flip') == 'flip'){
				var getAnimator = window[$(this).attr('class')+'_Animator'];			
				getAnimator.reverse();
				getAnimator.play();
				$(this).parent().attr('data-flip','normal');
				$(this).parent().children().eq(0).css('display','block');
				$(this).parent().children().eq(1).css('display','none');	
			}
		});
		$('.area-info-box-holder').css('display','none');
		$('.bankPost').css('display','block');
		complete_page();
		enableNextBtn();
	}
	var minH = parseInt($('.aquasailPop').css('min-height')) - $('.aquasilInner').height();
	$('.aquasailPop').css('min-height',minH);
}	
	
function runSprite(event){	
	var getNo = $(this).attr('class').split('_')[1];
	var getClass = $(this).attr('class').split('_')[0];
	var selector = $('#'+getClass+'sprite_'+getNo);
	var getAnimator = window[$(this).attr('class')+'_Animator'];	
	var backgroundPos = selector.css('backgroundPosition').split(" ");
	var xPos = backgroundPos[0];	
	if(parseInt(xPos) == 0){
		$(this).parent().attr('data-flip','flip');
		if(selector.attr('data-forward') == 1) getAnimator.reverse();	
         getAnimator.play({
			tempo: 3,	
			onFrame: function(){
				//console.log(spriteAnimator2.currentFrame())
			},
		});
		showAreaInfo($(this));	
		if(aquaSteps['step_'+moveStep].customCursor != 'yes')
			{
				if((getClass+'sprite_'+getNo) == aquaSteps['step_'+moveStep].clickelem){						
					if(aquaSteps['step_'+moveStep].clickelem == 'cashsprite_6') updateCashValues()
					stopSprite();	
					showPopNext();
					if(aquaSteps['step_'+moveStep].updateArea == 'yes'){
						againAreaUpdate($(this));
					}					
				}
				else{							
					errorPop();			
				}
			}
		else
			{
				if(aquaSteps['step_'+moveStep].postBox == 'yes'){					
					if((getClass+'sprite_'+getNo) == aquaSteps['step_'+moveStep].clickelem){
						writePost();			
					}
					else{							
						errorPop();			
					}
				}
			}
		var checkDoubleSel = $(this).parent().attr('data-dual');
		if(checkDoubleSel=="dual"){
			$(this).parent().children().eq(0).css('display','none');
			$(this).parent().children().eq(1).css('display','block');
		}		
	}
	else
	{						
		selector.attr('data-forward', 1);
		$('.area-info-box-holder').css('display','none');
		getAnimator.reverse();
        getAnimator.play();
		$(this).parent().attr('data-flip','normal');		
		if(aquaSteps['step_'+moveStep].customCursor == 'yes'){			
			if((getClass+'sprite_'+getNo) == aquaSteps['step_'+moveStep].clickelem){
				
				$(this).parent().attr('data-flip','flip');	
				againAreaUpdate($(this));	
				$('.area-info-box-holder').css('display','block');	
				
				if(aquaSteps['step_'+moveStep].changeSprite == 'yes'){
					var updateImg = aquaSteps['step_'+moveStep].changeSrc;
					var url = selector.css('background-image');
					var img = url.replace(/(url\(|\)|")/g, '');
					img = img.substring(img.lastIndexOf('/')+1, img.length);					
					selector.css('background-image','url('+simImgPath+updateImg+'.png),url('+simImgPath+img+')');	
				}
				getAnimator.stop();
				getAnimator.reverse();
				var currElem = aquaSteps['step_'+moveStep].customCursorSel;
				aquaSteps['step_'+moveStep].clickelem = currElem;
				aquaSteps['step_'+moveStep].customCursor = 'no';					
				stopSprite();
				var imgName = aquaSteps['step_'+moveStep].cursorImage;					
				$('.mouseCursor img').attr('src',simImgPath+imgName+'.svg');
				var leftPos = ((event.clientX)-$('.aquasilCont').offset().left)+10;
				var topPos = ((event.clientY)-$('.aquasilCont').offset().top)-0;	
				$('.mouseCursor').css('left', leftPos).css('top',topPos);
				$('.mouseCursor').css('display','block');
				$('.aquasilCont').off('mousemove').on('mousemove', cursorMoving);
				$('.aquasilCont').trigger('mousemove');
				childAnim(currElem);
			}
			else{			
				errorPop();
			}
		}
		else
		{
			if((getClass+'sprite_'+getNo) == aquaSteps['step_'+moveStep].clickelem){			
				stopSprite();					
				showPopNext();	
			}
			else{			
				errorPop();
			}
		}
		var checkDoubleSel = $(this).parent().attr('data-dual');
		if(checkDoubleSel=="dual"){
			$(this).parent().children().eq(0).css('display','block');
			$(this).parent().children().eq(1).css('display','none');
		}
	}
}

function updateCashValues(){
	var val100 = aquaSteps['step_'+moveStep].cashValues[0];
	var val1000 = aquaSteps['step_'+moveStep].cashValues[1];
	var val5000 = aquaSteps['step_'+moveStep].cashValues[2];
	$('.tray_100,.tray_1000,.tray_5000').empty();
	for(var i=0;i<val100;i++){
		$('.tray_100').append('<img src="assets/images/simulation/token100.png" style="top:'+(i*(-6))+'px" class="absPos" width="55px"/>')
	}
	for(var j=0;j<val1000;j++){
		$('.tray_1000').append('<img src="assets/images/simulation/token1000.png" style="top:'+(j*(-6))+'px" class="absPos" width="55px"/>')
	}
	for(var k=0;k<val5000;k++){
		$('.tray_5000').append('<img src="assets/images/simulation/token5000.png" style="top:'+(k*(-6))+'px" class="absPos" width="55px"/>')
	}	
}

function showAreaInfo(ctcls)
	{
		$('.token-holder').empty();		
		var areaName = ctcls.parent().attr('data-value');	
		var ctSelector = ctcls.attr('class'); 	
		$('.area-info-title').text(areaName);		
		for(var i=0;i<aquaValues[ctSelector]['data'].length;i++){
			var token = aquaValues[ctSelector]['data'][i];
			var getVal = aquaValues[ctSelector]['val'][i];			
			$('.token-holder').append('<div class="'+token+'">'+getVal+'</div>');
		}		
		$('.value-total').find('span').html(aquaValues[ctSelector]['areaTotal']);
		$('.area-info-box-holder').css('display','block');
	}
	
function againAreaUpdate(elem){
	var findSel = elem.attr('class'); 	 	
	aquaValues[findSel]['val'] = aquaSteps['step_'+moveStep].areaData; 
	aquaValues[findSel]['areaTotal'] = aquaSteps['step_'+moveStep].areaDataTotal;
	for(var i=0;i<aquaValues[findSel]['val'].length;i++){
		$('.token-holder').children().eq(i).text(aquaValues[findSel]['val'][i]);		
	}	
	$('.value-total').find('span').html(aquaValues[findSel]['areaTotal']);
	if(aquaSteps['step_'+moveStep].postBox == 'yes'){
		$('.cash-total').find('span').html(aquaValues[findSel]['areaTotal']);		
		for(var j=aquaValues[findSel]['val'].length-1,k=0;j>0;j--,k++){
			console.log(k, aquaValues[findSel]['val'][j]);	
			$('.cash-box-title').find('div').eq(k).text(aquaValues[findSel]['val'][j]);
		}	
	}
}

function validateAns(e)
{
	var crctAns = Number($(this).attr('data-correct'));
	var inputVal = Number($('#postit-input').val());	
	if(inputVal == crctAns){
		$('.postPop').css('display','none');		
		var imgName = aquaSteps['step_'+moveStep].cursorImage;					
		$('.mouseCursor img').attr('src',simImgPath+imgName+'.svg');
		var leftPos = ((e.clientX)-$('.aquasilCont').offset().left)+10;
		var topPos = ((e.clientY)-$('.aquasilCont').offset().top)-0;	
		$('.mouseCursor').css('left', leftPos).css('top',topPos);
		$('.mouseCursor').css('display','block');
		$('.aquasilCont').off('mousemove').on('mousemove', cursorMoving);		
		aquaSteps['step_'+moveStep].customCursor = 'no';
		stopSprite();		
		var currElem = aquaSteps['step_'+moveStep].customCursorSel;	
		aquaSteps['step_'+moveStep].clickelem = currElem;			
		childAnim(currElem);
	}
	else
	{
		$('.postit-message').css('display','block');		
	}
}

function closePost(){
	$('.postPop').css('display','none');
	$('.postit-message').css('display','none');
}

function writePost(){
	$('.postPop').css('display','flex');
}

function errorPop(){
	if($('.postPop').css('display') == 'flex') return;
	$('.errorMsg').stop();	
	$('.errorMsg').fadeIn(200, function(){
		$('.errorMsg').delay(1500).fadeOut(200);
	})
}

function childAnim(sel){	
	rightSprite = $('#'+sel);	
	rightSprite.stop().animate({
		transform: 'translate(0px,8px)'
	},300,function(){
		rightSprite.stop().animate({
			transform: 'translate(0px, 0px)'
		},300,function(){
			childAnim(sel)
		})
	})  
}

function stopSprite(){
	rightSprite.stop().animate({
		transform: 'translate(0px, 0px)'
	},0)
	rightSprite.clearQueue();
	rightSprite.stop();	
}
	
//Zoom & Navigation
function goZoomIn(e){
	e.stopImmediatePropagation();	
	if(oneTimeSet){currentScale = ((maxScale - scalePos)/3)}
	if(zoomLevel < 3)	
		{	
			zoomLevel++;		
			zoomVal = currentScale*zoomLevel;		
			$('#zoomOut').off('click').on('click', goZoomOut).css('opacity','1');
			canvasResize();
			oneTimeSet = false;	
	}
	if(zoomLevel >= 3)	
		{
			$('#zoomIn').off('click').css('opacity','0.5');
		}		
}

function goZoomOut(e){
	e.stopImmediatePropagation();		
	if(zoomLevel > 0)
	{
		zoomLevel--;
		zoomVal = currentScale*zoomLevel;	
		$('#zoomIn').off('click').on('click', goZoomIn).css('opacity','1');	
		canvasResize();
		oneTimeSet = false;	
	}
	if(zoomLevel <= 0)
	{
		$('#zoomOut').off('click').css('opacity','0.5');
	}	
}	

function navAquasail(event)
	{		
		//event.preventDefault();
		var dir = $(this).attr('data-direction');
		if(zoomPos[dir] == 'leftMov' || zoomPos[dir] == 'rightMov'){
			var pos = (zoomPos[dir] == 'leftMov')?+150:-150;
			var movePos = parseInt($('.canvasBase').css('left'))+pos;		
			$('.canvasBase').stop().animate({left:movePos},400);
		}
		else{
			var pos = (zoomPos[dir] == 'topMov')?+150:-150;
			var movePos = parseInt($('.canvasBase').css('top'))+pos;		
			$('.canvasBase').stop().animate({top:movePos},400);
		}		
	}

function toggleContent()
	{
		if($('.contentStep').height() < 20) return;
		var rotateval = $(this).attr('data-rot');
		if(rotateval == 225){
			var animval = 45;
			$(this).attr('data-rot', animval);
			$('.move-box-holder').css('height','40px');
			$('.contentStep').css('line-height','26px').css('padding-top','6px');
			$(this).find('i').css('top','5px');
		}
		else
		{
			var animval = 225;
			$(this).attr('data-rot', animval);
			$('.move-box-holder').css('height','auto');
			$('.contentStep').css('line-height','18px').css('padding-top','10px');
			$(this).find('i').css('top','8px');
		}
		$(this).find('i').stop().animate({
			transform: 'rotate('+animval+'deg)'
		},200)
	}

$('input[name="number"]').keypress(function (e) { 
	var numKey = e.keyCode || e.which;	
    if (numKey != 8 && numKey != 0 && (numKey < 48 || numKey > 57)) {        
        return false;
    }
});
	
//Sprites setter
function setSprite(){	
	
	supls_1 = $('#suplssprite_1');	
	supls_1_Animator = supls_1.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	emps_2 = $('#empssprite_2');	
	emps_2_Animator = emps_2.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	fgw_3 = $('#fgwsprite_3');	
	fgw_3_Animator = fgw_3.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	rmw_4 = $('#rmwsprite_4');	
	rmw_4_Animator = rmw_4.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	asslines1_5 = $('#asslines1sprite_5');	
	asslines1_5_Animator = asslines1_5.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	asslines2_5 = $('#asslines2sprite_5');	
	asslines2_5_Animator = asslines2_5.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	asslines3_5 = $('#asslines3sprite_5');	
	asslines3_5_Animator = asslines3_5.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	asslines4_5 = $('#asslines4sprite_5');	
	asslines4_5_Animator = asslines4_5.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	cash_6 = $('#cashsprite_6');	
	cash_6_Animator = cash_6.spriteAnimator({
		cols: 1,
		rows: 1,		
	});
	
	post_7 = $('#postsprite_7');	
	post_7_Animator = post_7.spriteAnimator({
		cols: 1,
		rows: 1,		
	});
	
	accspay_8 = $('#accspaysprite_8');	
	accspay_8_Animator = accspay_8.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	bankdt_9 = $('#bankdtsprite_9');	
	bankdt_9_Animator = bankdt_9.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	equity_10 = $('#equitysprite_10');	
	equity_10_Animator = equity_10.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	accsrec_11 = $('#accsrecsprite_11');	
	accsrec_11_Animator = accsrec_11.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	shareholds_12 = $('#shareholdssprite_12');	
	shareholds_12_Animator = shareholds_12.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	bank_13 = $('#banksprite_13');	
	bank_13_Animator = bank_13.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	tax_14 = $('#taxsprite_14');	
	tax_14_Animator = tax_14.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	services_15 = $('#servicessprite_15');	
	services_15_Animator = services_15.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	propagt_16 = $('#propagtsprite_16');	
	propagt_16_Animator = propagt_16.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
	
	cust_17 = $('#custsprite_17');	
	cust_17_Animator = cust_17.spriteAnimator({
		cols: 5,
		rows: 6,		
	});
}