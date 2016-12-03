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

/**
 * Handles the game state, request and update
 * @param data
 * @constructor
 */
Game.State = function () {
    this.request();
};

Game.State.prototype.request = function () {
    $.ajax({
        url: "json",
        success: this.update.bind(this)
    });
};

Game.State.prototype.requestCommand = function (command, query) {
    var data = { command: command, query: query};

    $.ajax({
        url: 'json',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: this.update.bind(this)
    });
};

/**
 * @Callback
 */
Game.State.prototype.update = function (result) {
    this.data = result;
    Game.Board.update();
    Game.Board.updateStatusBar();
};

/**
 * Handles the Board update process
 * @type {{updateBoard: Game.Board.updateBoard, updateStatusBar: Game.Board.updateStatusBar}}
 */
Game.Board  = {
    update: function () {
        for (var key in Game.State.data.board) {
            if ($.isEmptyObject(Game.State.data.board[key])) {
                Shapes.Puck[key].deactivate();
                continue;
            }
            Shapes.Puck[key].activate(Game.State.data.board[key].man);
        }
    },

    updateStatusBar: function () {
        var blackState = Game.State.data.black,
            whiteState = Game.State.data.white,
            $white = $("#player-white-state"),
            $black = $("#player-black-state");

        $white.find("i").html(whiteState.name);
        $black.find("i").html(blackState.name);

        var whiteProgress = ((blackState.numPucksTakenAway - whiteState.numPucksTakenAway) * 10) / 2 + 50;
        var blackProgress = 100 - whiteProgress;

        $white.css("width", whiteProgress + "%");
        $black.css("width", blackProgress + "%");
    }
};

/**
 * Document Ready Initial
 */

$(document).ready(function() {

    Game.State = new Game.State();

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

});