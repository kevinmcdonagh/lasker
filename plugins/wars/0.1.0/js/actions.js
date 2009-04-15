/**
 * @author kevin
 */

$(document).ready(function(){

	$(window).bind("ajaxError", function() {
		addToMsgHist("Ajax request unsuccessful");
	}); 

	//snapToMovableTiles();
	highlightAllowedMoveOnClick();
	showCoOrdinatesOnTileHover();
	
	$('#menu-right').nyroModal({	
		bgColor: 'none', 
		'blocker': '#gameboard',
		padding: 5,	
	  	minWidth: 100,
		minHeight: 100,
		css: { // Default CSS option for the nyroModal Div. Some will be overwritten or updated when using IE6
			wrapper: {
				top: '25%',
				bottom: '75%',
				right: '20%',
				left: '80%'
			},
			loading: {
				top: '25%',
				bottom: '75%',
				right: '20%',
				left: '80%'
			}
		},
		resizable:false
	});	
	
	$('#menu-left').nyroModal({	
		bgColor: 'none', 
		'blocker': '#gameboard',
		padding: 5,	
	  	minWidth: 100,
		minHeight: 100,
		css: { // Default CSS option for the nyroModal Div. Some will be overwritten or updated when using IE6
			wrapper: {
				top: '25%',
				bottom: '75%',
				right: '80%',
				left: '20%'
			},
			loading: {
				top: '25%',
				bottom: '75%',
				right: '80%',
				left: '20%'
			}
		},
		resizable:false
	});	
	
	$('.p2-base').nyroModal({	
		bgColor: 'none', 
		'blocker': '#gameboard',
		padding: 5,	
	  	minWidth: 150,
		minHeight: 100,
		css: { // Default CSS option for the nyroModal Div. Some will be overwritten or updated when using IE6
			wrapper: {
				top: '50%',
				bottom: '50%',
				right: '50%',
				left: '50%'
			},
			loading: {
				top: '50%',
				bottom: '50%',
				right: '50%',
				left: '50%'
			}
		},
		resizable:false
	});	
	
	$('.p1-base').nyroModal({	
		bgColor: 'none', 
		'blocker': '#gameboard',
		padding: 5,	
	  	minWidth: 150,
		minHeight: 100,
		css: { // Default CSS option for the nyroModal Div. Some will be overwritten or updated when using IE6
			wrapper: {
				top: '50%',
				bottom: '50%',
				right: '50%',
				left: '50%'
			},
			loading: {
				top: '50%',
				bottom: '50%',
				right: '50%',
				left: '50%'
			}
		},
		resizable:false
	});	
	 
	 
});