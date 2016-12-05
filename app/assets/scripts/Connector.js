/**
 * Puck thats placed on a Junction
 * Holds the mojs shape
 * @param x coordinate
 * @param y coordinate
 * @param id
 * @constructor
 */
Game.Connector = function (x, y, length, rotation) {
    /**
     * Used as a mute for the rescale process
     * @type {number}
     * @const
     */
    this.MUTE = 100;
    this.MUTE_RADIUS = 6;
    this.CLASS_NAME = "connector";
    this.SHAPE = "rect";
    this.STROKE = "0";
    this.POINTS = 0;

    this.length = length;
    this.rotation = rotation;

    this.left = this.calculateOffset(x);
    this.top = this.calculateOffset(y);

    this.mojs = this.generateMojs();
};

$.extend(Game.Connector.prototype, Game.Junction.prototype);

/**
 * @Override
 * Creates a new mojs from class variables
 * @returns {mojs.Shape}
 */
Game.Connector.prototype.generateMojs = function () {
    return new mojs.Shape({
        parent: "#" + Game.defaults.BOARD_ID,
        className: this.CLASS_NAME,
        shape: this.SHAPE,
        points: this.POINTS,
        strokeWidth: this.STROKE,
        radius: this.radius(),
        left: this.left + "%",
        top: this.top + "%",

        angle: this.rotation,
        radiusY: this.calculateScale(),
        isShowStart:  true
    });
};

Game.Connector.prototype.radius = function () {
    return this.length * document.getElementById(Game.defaults.BOARD_ID).offsetWidth / this.MUTE_RADIUS;
};

/**
 * @Override
 * Rescales the mojs object
 */
Game.Connector.prototype.rescale = function () {
    this.mojs.tune({
        radius: this.radius(),
        radiusY: this.calculateScale()
    })
    .replay();
};