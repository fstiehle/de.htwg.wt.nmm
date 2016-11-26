$(window).resize(function() {

    var boardWidth = document.getElementById("board").offsetWidth;

    for (var key in Shapes.Junction) {
        Shapes.Junction[key].tune({ radius: boardWidth / 30 })
        .replay();
    }

    Shapes.Connector.forEach(function(connector) {
        connector.tune({
            radius: connector.defaultLength * boardWidth / 6,
            radiusY: document.getElementById("board").offsetWidth / 90
        })
        .replay();

        console.log(connector.defaultLength * boardWidth / 6);
    });
});
