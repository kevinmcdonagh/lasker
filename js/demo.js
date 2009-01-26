/**
 * @author kevin
 */
 
$(document).ready(function(){
	highlightAllowedMoveOnClick();
	showCoOrdinatesOnTileHover();
});

function highlightAllowedMoveOnClick()
{
    $("#customwarsboard td").live("click", function(){
		showMoveType(this.id);
		highlightClickedTile(this);
		logClick(this.id);
    });
}

function highlightClickedTile(tile){
	$(tile).addClass('active');
}

function showCoOrdinatesOnTileHover()
{
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
		$("#" + tileCoOrds).append("<img src='" + tiles[tileCoOrds] + "' />" );
	}
}

function showMoveType(clickedTileId){
	
	var tileSet = new Array();
	var piece = $("#" + clickedTileId + " > img");
	var pieceType = $(piece).attr('class').split(' '); 
	
	switch (pieceType[0]) {
		case ("pawn"): 		
			tileSet["x4y2"] = "img/highlight.png";
			tileSet["x4y3"] = "img/highlight.png";
		break;
	}
	
	changeTileImg(tileSet);
}
