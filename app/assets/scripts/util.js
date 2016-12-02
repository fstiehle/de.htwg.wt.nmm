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

        for (var keyJ in Shapes.Junction) {
            Shapes.Junction[keyJ].tune({ radius: boardWidth / 30 })
            .replay();
        }

        for (var keyP in Shapes.Puck) {
            Shapes.Puck[keyP].tune({ radius: boardWidth / 30 })
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

    $(".junction").click(function() {
        requestCommand("set", this.id);
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
        var data = { command: command, query: query};

        $.ajax({
            url: 'json',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: true,
            success: function(data) {
                updateState(data);
            }
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

    }

    /**
     * Helper
     */

})();
