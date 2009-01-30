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
    });
	
	$("#btnLastMove").live("click", function(){
		if(window.moveCount > 1){
			window.moveCount = window.moveCount-1;
			loadJSONmove('../fixture/1/move'+ window.moveCount + '.json');
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
			var tileSet = new Array();

			if(action.activity == "highlight"){

				if(action.actingUnit != "" && action.actingUnit != null){
					$(".active").removeClass('active');
					$.each(action.actingUnit, function(index, unitItem){
						$("#" + action.actingUnit[index].coOrds).addClass('active');
						$("#" + action.actingUnit[index].coOrds).empty();
						$.fn.addImgToCoOrds(action.actingUnit[index].coOrds, action.actingUnit[index].unit, action.actingPlayer, action.actingUnit[index].unit);
					});
				}


				$.each(action.tiles, function(index, tile){
					$("#" + tile.coOrds).empty();
					
					if(action.tiles[index].unit == null || action.tiles[tile].unit == "" ){
						$("#" + action.tiles[index].coOrds).append("<img class='"+ action.activity +"' src='../../img/" + action.activity + ".png' />" );
					}else{
						$("#" + tile.coOrds).append("<img class='active' src='../../img/highlight.png' />" );
					}					
				});

			}
			
		

};

$.fn.replaceTiles = function(action){
			var tileSet = new Array();

			if(action.activity == "replace"){
				//Add image
				$.each(action.tiles, function(tileIndex, tile){
					if(tile.unit != "" && tile.unit != null){
						tileSet[action.tiles[tileIndex].coOrds] = action.actingPlayer + "/" + action.tiles[tileIndex].unit;
					}else{
						tileSet[action.tiles[tileIndex].coOrds] = null;
					}
				});
			}

			changeTileImg(tileSet);
};

$.fn.addImgToCoOrds = function (divCoOrds, imgClass, actingPlayer, actingUnit) {
	$("#" + divCoOrds).append("<img class='"+ imgClass +"' src='../../img/" + actingPlayer + "/" + actingUnit + ".png' />" );
};




