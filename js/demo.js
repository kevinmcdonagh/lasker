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
		$("#messages").append("<p>" + this.id + "</p>");
    });
}

function getCoOrdinatesOfCurrentTile()
{
	$("#customwarsboard td").hover(function(event){
		$("#messages").append("<p>" + this.id + "</p>");
		currentXY = this.id;
	}, function(){
		$("#messages p").remove();
	});
}