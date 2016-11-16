(function($) {

    //Handle click on a shape
    function handleSingleClick(shape) {
        alert(shape);
    }

    $(document).ready(function(){
        //Add a onclick callback to every shape
        $("shape").each(function() {
            $(this).attr("onclick", "handleSingleClick(this)");
        });
    });

})(jQuery);

function handleClick(event, par) {
    console.log(par);
    document.getElementById('Puck__MA_Material_000').setAttribute('diffuseColor', '1 0 0');
}



