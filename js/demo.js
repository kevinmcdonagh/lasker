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
		addToMsgs(this.id)
		highlightCells();
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

function highlightCells(){
	var tiles= new Array(5)
	tiles[0]="x4y3";
	tiles[1]="x5y3";
	tiles[2]="x6y3";
	tiles[3]="x5y4";
	tiles[4]="x5y2"; 
	
	jQuery.each( tiles, function(index, item){
		$("#" + item + " img").attr("src","img/highlight.png");
	});
}