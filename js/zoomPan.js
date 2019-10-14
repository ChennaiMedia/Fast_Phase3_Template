var mapfVisit = true;
var tokenLegend = [['token-key-100','100'],['token-key-1000','1000'],['token-key-5000','5000'],['token-key-rawmat','Raw Materials'],['token-key-finishedgoods','Finished Goods'],['token-key-wages','Wages']];
var aquaLegends = {
	
	supls:{
		txt:'Suppliers',
		lpos:1970,
		tpos:2080,		
		visit:false
	},
	emps:{
		txt:'Employees',
		lpos:2310,
		tpos:1890,		
		visit:false
	},
	fgw:{
		txt:'Finished Goods Warehouse',
		lpos:2500,
		tpos:1450,		
		visit:false
	},
	rmw:{
		txt:'Raw Materials Warehouse',
		lpos:1610,
		tpos:1720,		
		visit:false
	},
	asslines:{
		txt:'Assembly Lines',
		lpos:2140,
		tpos:1490,
		visit:false
	},
	cash:{
		txt:'Cash',
		lpos:1920,
		tpos:1460,		
		visit:false
	},
	post:{
		txt:'Post-it',
		lpos:2160,
		tpos:1300,		
		visit:false
	},
	accspay:{
		txt:'Accounts Payable',
		lpos:1450,
		tpos:1420,		
		visit:false
	},
	bankdt:{
		txt:'Bank Debt',
		lpos:1640,
		tpos:1320,		
		visit:false
	},
	equity:{
		txt:'Equity',
		lpos:1810,
		tpos:1240,		
		visit:false
	},
	accsrec:{
		txt:'Accounts Receivable',
		lpos:1850,
		tpos:1150,
		visit:false
	},			
	cust:{
		txt:'Customers',
		lpos:2660,
		tpos:940,
		visit:false
	},
	propagt:{
		txt:'Property Agent',
		lpos:2380,
		tpos:800,
		visit:false
	},	
	serv:{
		txt:'Services',
		lpos:2210,
		tpos:730,
		visit:false
	},
	tax:{
		txt:'Taxes',
		lpos:1880,
		tpos:460,
		visit:false
	},
	bank:{
		txt:'Bank',
		lpos:1580,
		tpos:620,
		visit:false
	},
	shareholds:{
		txt:'Shareholders',
		lpos:1290,
		tpos:820,
		visit:false
	},
}

var aquaRecent = {
	aquasail_1:{
		elem:['Shareholders','Equity','Cash'],
		value:['0','14,000','14,000'],
		post:['Equity']
	},
	aquasail_2:{
		elem:['Bank','Bank Debt','Cash'],
		value:['0','24,000','38,000'],
		post:['Bank Debt']
	},
	aquasail_3:{
		elem:['Property Agent','Cash','Suppliers'],
		value:['12,000','21,200','4,800'],
		post:['']
	}
}

var recentColor = "#ff6a13";
var defaultColor = "#981d97";

function setRecentAquasail(){
	createAquasail();
	$.each(aquaRecent['aquasail_'+aquasilVisitPos]['elem'], function(ind,elem){		
		$('[data-label="'+elem+'"]').attr('data-color',recentColor);
		$('[data-label="'+elem+'"]').find('.item-label').css('background-color',recentColor);
		$('[data-label="'+elem+'"]').find('.item-icon').children().css('background-color',recentColor);		
		$('[data-label="'+elem+'"]').find('.item-icon').css('border-color',recentColor);
		var getValue = aquaRecent['aquasail_'+aquasilVisitPos]['value'][ind];
		$('[data-label="'+elem+'"]').find('.total-value').text(getValue);
	});	
	$.each(aquaRecent['aquasail_'+aquasilVisitPos]['post'], function(ind,elem){		
		$('[data-label="'+elem+'"]').find('.item-content').find('.postit-holder').remove();
		var setValue = $('[data-label="'+elem+'"]').find('.total-value').text();
		$('[data-label="'+elem+'"]').find('.item-content').append('<div class="postit-holder special-holder"><div class="postit-icon"></div><div class="special-value">'+setValue+'</div></div>');
	});	
}

function showZoomNav()
	{		
		$('.zoompan').append('<div class="navBox"></div>');
		$('.navBox').append('<div class="legend"></div>');
		$('.navBox').append('<div id="map-btn"></div><div class="zoom-holder"><button data-ui="zoomIn" class="zoom-in" id="zoomIn" style="outline:none"></button><button data-ui="zoomOut" id="zoomOut" class="zoom-out" style="outline:none"></button></div><div class="pan-holder"><button data-ui="pan" data-direction="left" id="leftMov" class="btnCanvas pan-btn"  style="outline:none"></button><button data-ui="pan" data-direction="right" class="btnCanvas pan-btn" id="rightMov" style="outline:none"></button><button data-ui="pan" data-direction="down" class="btnCanvas pan-btn" id="bottomMov" style="outline:none"></button><button data-ui="pan" id="topMov" data-direction="up" class="btnCanvas pan-btn" style="outline:none"></button></div>');			
		$('.navBox').append('<div class="dummyNav"></div>');
		$('#map-btn').off('click').on('click', showKeyLegend);
		$('.legend').append('<h3>TOKEN KEY</h3>');
		for(var i=0;i<tokenLegend.length;i++){
			$('.legend').append('<img class="tokenimgs" src="assets/images/'+tokenLegend[i][0]+'.svg" /><span>'+tokenLegend[i][1]+'</span><br/>')
		}					
		$('.zoompan,.legend').css('display','none');
		$('#zoomIn').off('click');
		
		$("#map-btn").hover(function(event) {
			$(this).css('background-color','#2a2867');
		},function (event) {
			$(this).css('background-color',activeCol);
		});	
	}

var activeCol = "#981d97";	
var showKeyLegend = function(){
	$('#map-btn').removeClass('animating');
	mapfVisit = false;
	var legenddis = $('.legend').css('display');	
	if(legenddis == 'none'){
		$('.legend,.legendAqua').fadeIn(200, function(){
			$('.legendAqua').css('display','block');
		});
		activeCol = '#e31c79';
		$('#map-btn').css('background-color',activeCol);	
	}	
	else
	{
		$('.legend,.legendAqua').fadeOut(200);
		activeCol = '#981d97';		
	}
}



