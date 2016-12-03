/**
 * Holds all Shapes
 */
Shapes = {
    Junction: {},
    Connector: [],
    Puck: {}
};

/**
 * Global Object for Game specific Constants and classes
 */
Game = {
    defaults: {
        BOARD_ID: "board"
    },
    State: {},
    mouseQueue: []
};


(function() {
    /**
     * State
     */
    $(document).ready(function() {
        requestState();

        /**
         * Resize Events
         */
        $(window).resize(function() {
            for (var key in Shapes.Junction) {
                Shapes.Junction[key].rescale();
                Shapes.Puck[key].rescale();
            }

            Shapes.Connector.forEach(function(connector) {
                connector.rescale();
            });
        });

        /**
         * Footer Event Handler
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

        /**
         * Junction Event Handler
         */
        $(".junction").click(function() {
            if (state.currentPlayer.currentState == "MOVE") {
                if (mouseQueue.length > 0) {
                    movePuck(mouseQueue.pop(), this);
                }
                return;
            }
            requestCommand(state.currentPlayer.currentState.toLowerCase(), this.dataset.id);
        });

        /**
         * Puck Event Handler
         */
        $(".puck").click(function() {
            if (state.currentPlayer.currentState == "MOVE") {
                if (mouseQueue.length === 0) {
                    mouseQueue.push(this);
                }
                return;
            }
            requestCommand(state.currentPlayer.currentState.toLowerCase(), this.dataset.id);
        });
    });

    /**
     * State
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

    /**
     * Statusbar
     */
    function updateStatusBar() {
        var $white = $("#player-white-state");
        var $black = $("#player-black-state");
        $white.find("i").html(state.white.name);
        $black.find("i").html(state.black.name);

        var whiteProgress = ((state.black.numPucksTakenAway - state.white.numPucksTakenAway) * 10) / 2 + 50;
        var blackProgress = 100 - whiteProgress;

        $white.css("width", whiteProgress + "%");
        $black.css("width", blackProgress + "%");
    }

    /**
     * Board Redraw process
     */
    function updateBoard() {
        for (var key in state.board) {
            if ($.isEmptyObject(state.board[key])) {
                Shapes.Puck[key].deactivate();
                continue;
            }
            Shapes.Puck[key].activate(state.board[key].man);
        }
    }

    /**
     * Sophisticated actions
     */
    function movePuck(first, second) {
        requestCommand(state.currentPlayer.currentState.toLowerCase(), first.dataset.id + second.dataset.id);
    }

})();