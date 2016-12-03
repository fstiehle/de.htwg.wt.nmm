/**
 * Junction
 * Holds the mojs shape
 * @param x coordinate
 * @param y coordinate
 * @param id
 * @constructor
 */
Game.Junction = function (x, y, id) {

    /**
     * Used as a mute for the rescale process
     * @type {number}
     * @const
     */
    this.MUTE = 30;
    this.CLASS_NAME = "junction";
    this.SHAPE = "circle";
    this.STROKE = 4;
    this.POINTS = 0;

    this.id = id;

    this.left = this.calculateOffset(x);
    this.top = this.calculateOffset(y);

    this.mojs = this.generateMojs();
    this.mojs.el.dataset.id = id;
};

/**
 * Depiction to a 0 - 7 coordinate system
 * 100 / 7 (Seven board parts)
 * Aligned from left 0 and top 0:
 * @var left distance in percentage from left
 * @var right distance in percentage from top
 */
Game.Junction.prototype.calculateOffset = function (coordinate) {
    return (100 / 7) * coordinate;
};

/**
 * Creates a new mojs from class variables or returns the already created
 * @returns {mojs.Shape}
 */
Game.Junction.prototype.generateMojs = function () {
    return new mojs.Shape({
        parent: "#" + Game.defaults.BOARD_ID,
        className: this.CLASS_NAME,
        shape: this.SHAPE,
        points: this.POINTS,
        strokeWidth: this.STROKE,
        radius: this.calculateScale(),
        left: this.left + "%",
        top: this.top + "%",
        isShowStart:  true
    });
};

/**
 * Calculates scale
 */
Game.Junction.prototype.calculateScale = function () {
    return document.getElementById(Game.defaults.BOARD_ID).offsetWidth / this.MUTE;
};

/**
 * Rescales the mojs object
 */
Game.Junction.prototype.rescale = function () {
    this.mojs.tune({
        radius: this.calculateScale()
    })
    .replay();
};