state = {};

(function() {
    /**
      * State
      */
    $(document).ready(function() {
        requestState();
    });

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

    /**
     * View
     */
     function requestState() {
          $.ajax({
              url: "json",
              success: updateState
          });
     }

    function requestCommand(command, query) {
         $.ajax({
             url: "json?" + command + "=" + query,
             success: updateState
         });
    }

    function updateState(result) {
        state = result;
        updateBoard();
    }

    function updateBoard() {
        for (var key in state.board) {
            if ($.isEmptyObject(state.board[key])) {
                continue;
            }
            placePuck(Shapes.Junction[key], state.board[key].man);
        }
    }

    function placePuck(junction, man) {
        var el = $(junction.el).clone();
        el.attr('class', 'junction-' + man.toLowerCase());
        $(el).appendTo("#board");

        var html = new mojs.Html({
          // selector for HTMLElement
          el: el[0],
          className: "junction-" + man,
        });

        // TODO: Click event for MOVE and PICK
    }

    /**
     * Helper
     */

})();
