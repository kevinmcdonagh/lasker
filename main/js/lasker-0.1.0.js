/**
 * @author kevin
 */
 
$(document).ready(function(){

	$(window).bind("ajaxError", function() {
		addToMsgHist("Ajax request unsuccessful");
	}); 

	highlightAllowedMoveOnClick();
	showCoOrdinatesOnTileHover();
});

function highlightAllowedMoveOnClick()
{
    $("div").live("click", function(){
		$(".active").removeClass('active');
		$("img.highlight").remove();
    });
	
	$("#customwarsboard td").live("click", function(){
		loadJSONmove('../fixture/1/move1.json');
		updateCurrentHighlightedTile(this);
		logClick(this.id);
    });
	
	$("#btnNextMove").live("click", function(){
		window.moveCount = window.moveCount+1;		
		loadJSONmove('../fixture/1/move'+ window.moveCount + '.json');
		$("#moveNo").replaceWith("<span id='moveNo'>" + window.moveCount+ "</span>");
    });
	
	$("#btnLastMove").live("click", function(){
		if(window.moveCount > 1){
			window.moveCount = window.moveCount-1;
			loadJSONmove('../fixture/1/move'+ window.moveCount + '.json');
			$("#moveNo").replaceWith("<span id='moveNo'>" + window.moveCount+ "</span>");
		}else{
		
			if(window.moveCount == 1){		
				$("#moveNo").replaceWith("<span id='moveNo'>" + 0 + "</span>");
			}
		}
		
		
    });
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
			$("#" + tileCoOrds).append("<img class='"+ tiles[tileCoOrds] +"' src='../../img/" + tiles[tileCoOrds] + ".png' />" );
		}
	}
	
}

function loadJSONmove(fname){
    $.getJSON(fname,
        function(action){

            if (action.activity == "highlight") {
                $.fn.highlightTiles(action);
            }

            if (action.activity == "replace") {
                $.fn.replaceTiles(action);
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

$.fn.replaceTiles = function(action){

    $.each(action.tiles, function(tileIndex, tile){
        $("#" + tile.coOrds).empty();
        if(tile.unit != "" && tile.unit != null){
            $("#" + tile.coOrds).append("<img class='"+ tile.unit +"' src='../../img/" + action.actingPlayer + "/" + tile.unit + ".png' />" );
        }
    });

};

$.fn.addUnitToCoOrds = function (idCoOrds, imgClass, actingPlayer, actingUnit) {
	$("#" + idCoOrds).append("<img class='"+ imgClass +"' src='../../img/" + actingPlayer + "/" + actingUnit + ".png' />" );
};

$.fn.addActionToCoOrds = function (idCoOrds, imgClass, activity) {
	$("#" + idCoOrds).append("<img class='"+ imgClass +"' src='../../img/" + activity + ".png' />" );
};




