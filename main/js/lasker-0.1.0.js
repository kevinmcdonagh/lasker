/**
 * @author kevin
 */

$.fn.fileFormat = ".png";
$.fn.styleName = "lasker";
$.fn.stylesDir = "../../style";
$.fn.jsonLocation = "../fixture";

$(document).ready(function(){

	$(window).bind("ajaxError", function() {
		addToMsgHist("Ajax request unsuccessful");
	}); 

	snapToMovableTiles();
	highlightAllowedMoveOnClick();
	showCoOrdinatesOnTileHover();
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
				$("#moveNo").replaceWith("<span id='moveNo'>" + 0 + "</span>");
			}
		}
		
		
    });
}

function snapToMovableTiles(){
	$("img").draggable({ 
		snap: 'td',
		cursorAt: { cursor: 'move', top: 0, left: 0 },
		containment: '#customwarsboard'
	});
}

function cleanAnyOnScreenState(){
	$(".active").removeClass('active');
	$("img.highlight").remove();
}

function updateCurrentHighlightedTile(tile){
	$(".active").removeClass('active');
	$(tile).addClass('active');
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

function changeTileImg(tiles){
	
	for(tileCoOrds in tiles) {
		$("#" + tileCoOrds).empty();
		if(tiles[tileCoOrds] != "" && tiles[tileCoOrds] != null){
			$("#" + tileCoOrds).append("<img class='"+ tiles[tileCoOrds] +"' src='"+ $.fn.stylesDir +"/"+$.fn.styleName +"/img/" + tiles[tileCoOrds] + $.fn.fileFormat + "' />");
		}
	}
	
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

$.fn.highlightTiles = function(action){

    if(action.actingUnit != "" && action.actingUnit != null){
        $(".active").removeClass('active');
        $.each(action.actingUnit, function(index, actingUnit){
            $("#" + actingUnit.coOrds).addClass('active');
            $("#" + actingUnit.coOrds).empty();
            $.fn.addUnitToCoOrds(actingUnit.coOrds, actingUnit.unit, action.actingPlayer, actingUnit.unit);
        });
    }

    $.each(action.tiles, function(index, tile){
        $("#" + tile.coOrds).empty();

        if(tile.unit == null || tile.unit == "" ){
            $.fn.addActionToCoOrds(tile.coOrds, action.activity, action.activity);
        }else{
            $.fn.addUnitToCoOrds(tile.coOrds, 'targetted', tile.occupant, tile.unit);
        }
    });
	
};

$.fn.highlightCastlingKing = function(action){

    if(action.actingUnit != "" && action.actingUnit != null){
        $(".active").removeClass('active');
        $.each(action.actingUnit, function(index, actingUnit){
            $("#" + actingUnit.coOrds).addClass('active');
            $("#" + actingUnit.coOrds).empty();
            $.fn.addUnitToCoOrds(actingUnit.coOrds, actingUnit.unit, action.actingPlayer, actingUnit.unit);
        });
    }

    $.each(action.tiles, function(index, tile){
        $("#" + tile.coOrds).empty();

        if(tile.unit == null || tile.unit == "" ){
            $.fn.addActionToCoOrds(tile.coOrds, "highlight", "highlight");
        }else{
            $.fn.addUnitToCoOrds(tile.coOrds, 'targetted', tile.occupant, tile.unit);
        }
    });
	
	$.each(action.target, function(index, tile){
        $("#" + tile.coOrds).empty();

        if(tile.unit == null || tile.unit == "" ){
            $.fn.addActionToCoOrds(tile.coOrds, "active", "highlight");
        }else{
            $.fn.addUnitToCoOrds(tile.coOrds, "active", tile.occupant, tile.unit);
			$.each(tile.tiles, function(innerIndex, innerTile){
		        $("#" + innerTile.coOrds).empty();
				$.fn.addActionToCoOrds(innerTile.coOrds, "highlight", "secondary-highlight");
			});
        }
    });
};

$.fn.replaceTiles = function(action){
    
	$.each(action.tiles, function(tileIndex, tile){
        $("#" + tile.coOrds).empty();
        if(tile.unit != "" && tile.unit != null){
            $("#" + tile.coOrds).append("<img class='"+ tile.unit +"' src='"+ $.fn.stylesDir +"/"+$.fn.styleName +"/img/" + action.actingPlayer + "/" + tile.unit + $.fn.fileFormat + "' />");
        }
    });
    $(".targetted").removeClass('targetted');

};

$.fn.addUnitToCoOrds = function (idCoOrds, imgClass, actingPlayer, actingUnit) {
	$("#" + idCoOrds).append("<img class='"+ imgClass +"' src='"+ $.fn.stylesDir +"/"+$.fn.styleName +"/img/" + actingPlayer + "/" + actingUnit + $.fn.fileFormat + "' />");
};

$.fn.addActionToCoOrds = function (idCoOrds, imgClass, activity) {
	$("#" + idCoOrds).append("<img class='"+ imgClass +"' src='"+ $.fn.stylesDir +"/"+$.fn.styleName +"/img/" + activity + $.fn.fileFormat + "' />");
};




