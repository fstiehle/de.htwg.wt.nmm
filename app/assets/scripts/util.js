$(window).resize(function() {
    for (var key in Shapes.Junction) {
        Shapes.Junction[key].tune({ radius: document.getElementById("board").offsetWidth / 30 })
        .replay();
    }
});