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

		
		//This should iterate over a collection of tiles (moves) and then choose the images based on the attributes of the move. 
				
		if(tiles[tileCoOrds] != "" && tiles[tileCoOrds] != null){
			$("#" + tileCoOrds).append("<img class='"+ tiles[tileCoOrds] +"' src='../../img/" + tiles[tileCoOrds] + ".png' />" );
		}
		
	}
	
}

function loadJSONmove(fname){

	$.getJSON(fname,
        function(response){
			var tileSet = new Array();
			
			if(response.activity == "highlight"){

				//Add active
				if(response.actingUnit != "" && response.actingUnit != null){
					$(".active").removeClass('active');
					$.each(response.actingUnit, function(index, unitItem){
						$("#" + response.actingUnit[index].coOrds).addClass('active');
						$("#" + response.actingUnit[index].coOrds).empty();
						$("#" + response.actingUnit[index].coOrds).append("<img class='"+ response.actingUnit[index].unit +"' src='../../img/" + response.actingPlayer + "/" + response.actingUnit[index].unit + ".png' />" );
					});
				}
				
				// All the manual image weaving should be replaced here with just passing the move into the changeTileImg function
				// The response should then be dealt with in somewhere different.
				
				for(move in response.tiles) {
					if(response.tiles[move].unit == null || response.tiles[move].unit == "" ){
						tileSet[response.tiles[move].coOrds] = response.activity;
					}else{
						tileSet[response.tiles[move].coOrds] =  response.tiles[move].plr + "/" + response.tiles[move].unit;
					}
				}
			}
			
			if(response.activity == "replace"){
				//Add image
				$.each(response.tiles, function(index, moveItem){
					if(moveItem.unit != "" && moveItem.unit != null){
						tileSet[response.tiles[index].coOrds] = response.actingPlayer + "/" + response.tiles[index].unit;	
					}else{
						tileSet[response.tiles[index].coOrds] = null;	
					}
				});
			}
		
			changeTileImg(tileSet);			
        });
}

