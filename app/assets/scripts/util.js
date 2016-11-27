(function() {
    /**
     * Resize Events
     */
    $(window).resize(function() {
        var boardWidth = document.getElementById("board").offsetWidth;

        for (var key in Shapes.Junction) {
            Shapes.Junction[key].tune({ radius: boardWidth / 30 })
            .replay();
        }

        Shapes.Connector.forEach(function(connector) {
            connector.tune({
                radius: connector.defaultLength * boardWidth / 6,
                radiusY: document.getElementById("board").offsetWidth / 100
            })
            .replay();
        });
    });


    /**
     * Event Handler
     */
    $("#show-footer").click(function() {
        var $footer = $("#footer");

        if ($footer.is( ":hidden" ) ) {
            this.innerHTML = 'Hide';
        } else {
            this.innerHTML = "Show Footer";
        }
        $footer.slideToggle();
    });

})();
