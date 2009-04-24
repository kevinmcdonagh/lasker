function hoverSelectionImg() {

        var listenForHoversClass= "td"; 
        xOffset = 7;
        yOffset = -10;
        $("#customwarsboard td").hover(function(e){                                                                                       
               $("body").append("<div id='tooltip' style='display:block;'></div>");
                $("#tooltip")
                        .css("top",(e.pageY - xOffset) + "px")
                        .css("left",(e.pageX + yOffset) + "px")
                        .show();                
    },
        function(){
                
    }); 
        $(listenForHoversClass).mousemove(function(e){
                $("#tooltip")
                        .css("top",(e.pageY - xOffset) + "px")
                        .css("left",(e.pageX + yOffset) + "px");
        });
}

