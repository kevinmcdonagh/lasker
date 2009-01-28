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
		loadJSONmove('../fixture/move1.json');
		updateCurrentHighlightedTile(this);
		logClick(this.id);
    });
	
	$("#btnNextMove").live("click", function(){
		window.moveCount = window.moveCount+1;		
		loadJSONmove('../fixture/move'+ window.moveCount + '.json');
    });
	
	$("#btnLastMove").live("click", function(){
		window.moveCount = window.moveCount-1;		
		loadJSONmove('../fixture/move'+ window.moveCount + '.json');
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
        function(response){
			var tileSet = new Array();
			
			if(response.activity == "highlight"){
				for(move in response.move) {
					tileSet[response.move[move].coOrds] = response.activity;	
				}
			}
			
			if(response.activity == "replace"){
				$.each(response.move, function(index, moveItem){
					if(moveItem.unit != "" && moveItem.unit != null){
						tileSet[response.move[index].coOrds] = response.activePlayer + "/" + response.move[index].unit;	
					}else{
						tileSet[response.move[index].coOrds] = null;	
					}
				});
			}
		
			changeTileImg(tileSet);			
        });
}

