$(window).resize(function() {
    for (var key in Shapes.Junction) {
        Shapes.Junction[key].tune({ radius: document.getElementById("board").offsetWidth / 30 })
        .replay();
    }

    Shapes.Connector.forEach(function(connector) {
        connector.tune({ radius: connector.defaultLength * (connector.defaultLength / document.getElementById("board").offsetWidth) * 30 })
        .replay();

        console.log(connector.defaultLength * (connector.defaultLength / document.getElementById("board").offsetWidth) * 30);
    });
});
