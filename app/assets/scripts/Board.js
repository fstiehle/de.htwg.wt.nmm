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
        BOARD_ID: "board",
        MSG_ID: "msg"
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
    this.service = null;
    this.connect();

    this.service.requestCommand("refreshGame", "", "");
};

Game.State.prototype.connect = function () {
    this.service = new Game.Service(this.update);
};


/**
 * @Callback
 */
Game.State.prototype.update = function (result) {
    console.log("Game.State.prototype.update called ...");
    console.log(result);
    this.data = result;
    Game.Board.update();
    Game.Board.updateStatusBar();
    Game.Board.updateCurrentPlayer();
    Game.Board.updateStatusMessage();
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
        //Game.Socket.send("setPlayerName", $(target).data("man"), $(target).val());
        Game.State.service.requestCommand("setPlayerName", $(target).data("man"), $(target).val());
        $(target).hide();
        $(target).prev()
            .text($(target).val())
            .show();

    },

    updateCurrentPlayer: function() {
        $(".current-player").removeClass("current-player", "current-puck");
        $("#player-" + Game.State.data.currentPlayer.man.toLowerCase()).addClass("current-player");
        $(".puck." + Game.State.data.currentPlayer.man.toLowerCase()).addClass("current-puck");
    },

    updateStatusMessage: function() {
        var $log = $("#" + Game.defaults.MSG_ID),
            $overlay = $("#overlay-message");
        $log.append($("<div></div>").text(Game.State.data.status.message)[0]);
        $overlay.text(Game.State.data.status.message);
        $overlay.animate({ opacity: 1}, 800, "linear", function() {
            $overlay.animate({ opacity: 0}, 600, "linear");
        });
    }

};

/**
 * Document Ready Initial
 */

$(document).ready(function() {

    Game.State = new Game.State();

    /**
     * Scroll to Game statusbar
     */
    $("html, body").delay(1000).animate({scrollTop: $('#status').offset().top }, 2000);

    /**
     * Bootstrap Alert Overlay
     */
    $(".alert").delay(200).addClass("in").fadeOut(5000);

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
        var $msg = $("#" + Game.defaults.MSG_ID);
        $msg.slideToggle();
    });

    /**
     * PlayerName Event Handler
     */
    $("#status i").click(function(e) {
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

    /**
     * Reset Game Confirm Dialog
     */
    $("#new-game").click(function() {
        return confirm("Are you sure you want to start a new game?");
    });
});