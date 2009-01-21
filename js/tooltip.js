function hoverSelectionImg() {

        var listenForHoversClass= "td"; 
        xOffset = 7;
        yOffset = -10;
        $(listenForHoversClass).hover(function(e){                                                                                       
               $("body").append("<div id='tooltip' style='display:none;'></div>");
                $("#tooltip")
                        .css("top",(e.pageY - xOffset) + "px")
                        .css("left",(e.pageX + yOffset) + "px")
                        .show();                
    },
        function(){
                $("#tooltip").remove();
    }); 
        $(listenForHoversClass).mousemove(function(e){
                $("#tooltip")
                        .css("top",(e.pageY - xOffset) + "px")
                        .css("left",(e.pageX + yOffset) + "px");
        });
}

