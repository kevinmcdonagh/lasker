/**
 * @author kevin
 */

$.fn.jsonLocation = "../fixture";

$(document).ready(function(){

	$(window).bind("ajaxError", function() {
		addToMsgHist("Ajax request unsuccessful");
	}); 

	//snapToMovableTiles();
	highlightAllowedMoveOnClick();
	showCoOrdinatesOnTileHover();
	
	$('#block').nyroModal({	
		bgColor: '#6699cc', 
		'blocker': '#gameboard',
		padding: 5,	
	  	minWidth: 100,
		minHeight: 100
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
}

function showCoOrdinatesOnTileHover(){
	$("#customwarsboard td").hover(function(event){
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


