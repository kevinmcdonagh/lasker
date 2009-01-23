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
		addToMsgs(this.id + " ClickNo: " + window.clickCount)
		highlightCells(["x4y3", "x5y3", "x6y3", "x5y4", "x5y2"]);
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

function clrMsgs(){
	$("#messages p").remove();
}

function highlightCells(tiles){
	jQuery.each( tiles, function(index, item){
		$("#" + item + " img").attr("src","img/highlight.png");
	});
}