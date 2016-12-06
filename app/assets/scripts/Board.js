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
    Game.Board.highlightCurrentPlayer();
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
            $white = $("#player-white"),
            $black = $("#player-black");

        $white.find("i").html(whiteState.name);
        $black.find("i").html(blackState.name);

        var whiteProgress = ((blackState.numPucksTakenAway - whiteState.numPucksTakenAway) * 10) / 2 + 50;
        var blackProgress = 100 - whiteProgress;

        $white.css("width", whiteProgress + "%");
        $black.css("width", blackProgress + "%");
    },

    changePlayerName: function (target) {
        var data = { "man": $(target).data("man"), "name": $(target).val()};

        $.ajax({
            url: 'json/setplayername',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: true,
            success: function(result) {
                $(target).hide();
                $(target).prev()
                         .text($(target).val())
                         .show();
            }
        });

    },

    highlightCurrentPlayer: function() {
        $(".current-player").removeClass("current-player", "current-puck");
        $("#player-" + Game.State.data.currentPlayer.man.toLowerCase()).addClass("current-player");
        $(".puck." + Game.State.data.currentPlayer.man.toLowerCase()).addClass("current-puck");
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
     * Reset Selection
     */
    $(document).mouseup(function (e) {
        if ($(e.target).is("path") || $(e.target).is("ellipse")) {
            return;
        }
        Game.mouseQueue = [];
        $(".selected").removeClass("selected");
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
     * msg Event Handler
     */
    $("#show-msg").click(function() {
        var $msg = $("#msg");
        $msg.slideToggle();
    });

    /**
     * PlayerName Event Handler
     */
    $("#status i").dblclick(function(e) {
        $(e.target).hide();
        $(e.target).next("input")
                   .on("focusout", function(e) {Game.Board.changePlayerName(e.target);})    // turn focus event ON
                   .val($(e.target).text())
                   .show()
                   .select();
    });

    /**
     * PlayerName Input Event Handler
     */
    $("#status input").keyup(function(e) {
        if (e.keyCode === 13) {     // enter
            Game.Board.changePlayerName(e.target);
        }
        if (e.keyCode === 27) {     // esc
            $(e.target).off("focusout");        // turn focus event OFF
            $(e.target).hide();
            $(e.target).prev().show();
        }
    });
    $("#status input").focusout(function(e) {
        Game.Board.changePlayerName(e.target);
    });
});