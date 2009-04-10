/**
 * @author kevin
 */

$.fn.fileFormat = ".png";
$.fn.styleName = "lasker";
$.fn.stylesDir = "../../style";

function snapToMovableTiles(){
	$("img").draggable({ 
		snap: 'td',
		cursorAt: { cursor: 'move', top: 0, left: 0 },
		containment: '#customwarsboard'
	});
}

function cleanAnyOnScreenState(){
	$(".active").removeClass('active');
	$("img.highlight").remove();
}

function updateCurrentHighlightedTile(tile){
	$(".active").removeClass('active');
	$(tile).addClass('active');
}

function changeTileImg(tiles){
	
	for(tileCoOrds in tiles) {
		$("#" + tileCoOrds).empty();
		if(tiles[tileCoOrds] != "" && tiles[tileCoOrds] != null){
			$("#" + tileCoOrds).append("<img class='"+ tiles[tileCoOrds] +"' src='"+ $.fn.stylesDir +"/"+$.fn.styleName +"/img/" + tiles[tileCoOrds] + $.fn.fileFormat + "' />");
		}
	}
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
            $("#" + tile.coOrds).append("<img class='"+ tile.unit +"' src='"+ $.fn.stylesDir +"/"+$.fn.styleName +"/img/" + action.actingPlayer + "/" + tile.unit + $.fn.fileFormat + "' />");
        }
    });
    $(".targetted").removeClass('targetted');

};

$.fn.addUnitToCoOrds = function (idCoOrds, imgClass, actingPlayer, actingUnit) {
	$("#" + idCoOrds).append("<img class='"+ imgClass +"' src='"+ $.fn.stylesDir +"/"+$.fn.styleName +"/img/" + actingPlayer + "/" + actingUnit + $.fn.fileFormat + "' />");
};

$.fn.addActionToCoOrds = function (idCoOrds, imgClass, activity) {
	$("#" + idCoOrds).append("<img class='"+ imgClass +"' src='"+ $.fn.stylesDir +"/"+$.fn.styleName +"/img/" + activity + $.fn.fileFormat + "' />");
};

function loadJSONmove(fname){
    $.getJSON(fname,
        function(action){
			
			if(action.preMove != "" && action.preMove != null){
				$.fn.preActions(action);
			}

            if (action.activity == "highlight") {
                $.fn.highlightTiles(action);
            }
			
            if (action.activity == "replace") {
                $.fn.replaceTiles(action);
            }
			
			if(action.postMove != "" && action.postMove != null){
				$.fn.postActions(action);
			}
			
        });
}




