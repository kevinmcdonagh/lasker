/**
 * @author kevin
 */

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

function loadJSONmove(fname){
    $.getJSON(fname,
        function(action){
			
			if(action.preMove != "" && action.preMove != null){
				$.fn.preActions(action);
			}

            if (action.activity == "highlight") {
                $.fn.highlightTiles(action);
            }
			
            if (action.activity == "possibleMoves") {
                $.fn.possibleMoves = tiles;
            }			
			
            if (action.activity == "replace") {
                $.fn.replaceTiles(action);
            }
			
			if(action.postMove != "" && action.postMove != null){
				$.fn.postActions(action);
			}
			
        });
}