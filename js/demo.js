/**
 * @author kevin
 */

$(document).ready(function(){
	//highlightCurrentTile();
	hoverSelectionImg();
});

function highlightCurrentTile()
{
	$("td img").hover(
	  function () {
	    $(this).attr("src","img/trees.png");
	  },
	  function () {
        $(this).attr("src","img/plain.png");
	  }
	);
}