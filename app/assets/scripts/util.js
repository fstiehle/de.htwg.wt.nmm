$(window).resize(function() {
    $(Shapes).each(function() {
       this.tune({ y: -100 })
           .replay();
    });
});