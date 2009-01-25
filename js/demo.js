/**
 * @author kevin
 */
 
$(document).ready(function(){
	getCoOrdinatesOfCurrentTile();
	getCoOrdinatesOfCurrentTileOnClick();
});

function getCoOrdinatesOfCurrentTileOnClick()
{
    $("#customwarsboard td").live("click", function(){
		addToMsgHist(this.id + " ClickNo: " + window.clickCount)
		var tileSet = new Array();
		tileSet["x4y3"] = "img/highlight.png";
		tileSet["x5y3"] = "img/highlight.png";
		tileSet["x6y3"] = "img/highlight.png";
		tileSet["x5y4"] = "img/highlight.png";
		tileSet["x5y2"] = "img/highlight.png";
		
		changeTileImg(tileSet);
		window.clickCount = window.clickCount+1;
    });
}

function getCoOrdinatesOfCurrentTile()
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

function addToMsgHist(msg){
	$("#messagesHistory").append("<p>" + msg + "</p>");
}

function clrMsgs(){
	$("#messages p").remove();
}

function changeTileImg(tiles){
	for(tileCoOrds in tiles) {
		$("#" + tileCoOrds + " img").attr("src", tiles[tileCoOrds]);
	}
}