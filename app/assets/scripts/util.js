state = {};
mouseQueue = [];

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

        (function() {
            for (var key in Shapes.Junction) {
                Shapes.Junction[key].tune({ radius: boardWidth / 30 })
                .replay();

                Shapes.Puck[key].tune({ radius: boardWidth / 25 })
                .replay();
            }
        })();

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

        if ($footer.is(":hidden")) {
            this.innerHTML = 'Hide';
        } else {
            this.innerHTML = "Show Footer";
        }
        $footer.slideToggle();
    });

    $(".junction").click(function() {
        if (state.currentPlayer.currentState == "MOVE") {
            if (mouseQueue.length > 0) {
                movePuck(mouseQueue.pop(), this);
            }
            return;
        }
        requestCommand(state.currentPlayer.currentState.toLowerCase(), this.dataset.id);
    });

    $(".puck").click(function() {
        if (state.currentPlayer.currentState == "MOVE") {
            if (mouseQueue.length === 0) {
                mouseQueue.push(this);
            }
            return;
        }
        requestCommand(state.currentPlayer.currentState.toLowerCase(), this.dataset.id);
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
        updateStatusBar();
    }


    function updateStatusBar() {
        $("player-one-status").innerHTML = state.white.name;
        $("player-one-status").innerHTML = state.black.name;

        var whiteProgress = ((state.black.numPucksTakenAway - state.white.numPucksTakenAway) * 10) / 2 + 50;
        var blackProgress = 100 - whiteProgress;

        $("#player-white-state").css("width", whiteProgress + "%");
        $("#player-black-state").css("width", blackProgress + "%");
    }

    function updateBoard() {
        for (var key in state.board) {
            if ($.isEmptyObject(state.board[key])) {
                deactivatePuck(key);
                continue;
            }
            activatePuck(key, state.board[key].man);
        }
    }

    function activatePuck(key, man) {
        $(Shapes.Puck[key].el).attr("class", "puck " + man.toLowerCase() + "-man");
        Shapes.Puck[key].play();
    }

    function deactivatePuck(key) {
        $(Shapes.Puck[key].el).attr("class", "puck hidden");
    }

    function movePuck(first, second) {
        requestCommand(state.currentPlayer.currentState.toLowerCase(), first.dataset.id + second.dataset.id);
    }

    /**
     * Helper
     */

})();
