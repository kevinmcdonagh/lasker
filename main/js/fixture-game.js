$.fn.jsonLocation = "../fixture";

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

function highlightAllowedMoveOnClick()
{
	
//	$("#customwarsboard td").live("click", function(){
//		cleanAnyVisualState();
//		
//		loadJSONmove('../fixture/1/move1.json');
//		updateCurrentHighlightedTile(this);
//		logClick(this.id);
//    });
	
	
	$("#btnNextMove").live("click", function(){
		cleanAnyOnScreenState();
		
		window.moveCount = window.moveCount+1;		
		loadJSONmove($.fn.jsonLocation + "/1/move"+ window.moveCount + '.json');
		$("#moveNo").replaceWith("<span id='moveNo'>" + window.moveCount+ "</span>");
    });

	$("#btnLastMove").live("click", function(){
		cleanAnyOnScreenState();
		
		if(window.moveCount > 1){
			window.moveCount = window.moveCount-1;
			loadJSONmove($.fn.jsonLocation + "/1/move"+ window.moveCount + '.json');
			$("#moveNo").replaceWith("<span id='moveNo'>" + window.moveCount+ "</span>");
		}else{
		
			if(window.moveCount == 1){		
				window.moveCount = 0;
				$("#moveNo").replaceWith("<span id='moveNo'>" + 0 + "</span>");
			}
		}
		
		
    });
	
	$("#moveBack").live("click", function(){  
		var src = $("#x24y11 img").attr('src');
		var another = src;
	});
	
	
}

function showCoOrdinatesOnTileHover(){
	$("#gameboard td").hover(function(event){
		addToMsgs(this.id)
		currentXY = this.id;
	}, function(){
		clrMsgs();
	});
}

function addToMsgs(msg){
	$("#messages").append("<p>" + msg + "</p>");
}

function logClick(msg){
	addToMsgHist(msg + " ClickNo: " + window.clickCount);
	window.clickCount = window.clickCount+1;
}

function addToMsgHist(msg){
	$("#messagesHistory").append("<p>" + msg + "</p>");
}

function clrMsgs(){
	$("#messages p").remove();
}

function loadJSONmove(fname){
    $.getJSON(fname,
        function(action){
			
			if(action.preMove != "" && action.preMove != null){
				$.fn.preActions(action);
			}

            if (action.activity == "highlight") {
                $.fn.highlightTiles(action);
            }

            if (action.activity == "highlightCastlingKing") {
                $.fn.highlightCastlingKing(action);
            }
			
            if (action.activity == "replace") {
                $.fn.replaceTiles(action);
            }
			
			if(action.postMove != "" && action.postMove != null){
				$.fn.postActions(action);
			}
			
        });
}

$.fn.preActions = function(action){
}

$.fn.postActions = function(action){
	
	$.each(action.postMove, function(index, postAction){
		
		if (postAction.check != "" && postAction.check != null) {
			addToMsgHist("Check!");
		}
		
		if (postAction.checkmate != "" && postAction.checkmate != null) {
			addToMsgHist("Check Mate!");
		}
			
	});
}


