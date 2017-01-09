import Junction from './Junction';

/**
 * Connector between Junctions
 */
export default class Connector extends Junction {

  /**
   * @param x coordinate
   * @param y coordinate
   * @param length
   * @param rotation
   * @param parent HTML container
   */
  constructor(id, board, length, rotation) {
    super(id, board);
    this.length = length;
    this.rotation = rotation;
    this.MUTE = 100;
    this.MUTE_RADIUS = 6;
    this.SHAPE = "rect";
    this.STROKE = 0;
    this.POINTS = 0;
  }

  /**
   * @Override
   * Creates a new mojs from class variables
   */
  generateMojs() {
    this.mojs = new Mojs.Shape({
      parent: "#" + this.id,
      shape: this.SHAPE,
      points: this.POINTS,
      strokelength: this.STROKE,
      radius: this.radius(),
      angle: this.rotation,
      radiusY: this.calculateScale(),
      isShowStart: true,
      left: 0
    });
    this.mojs.el.style.position = "relative"; 
  };

  radius() {
    return this.length * document.getElementById(this.board).offsetWidth / this.MUTE_RADIUS;
  }

  /**
   * @Override
   * Rescales the mojs object
   */
  rescale() {
    this.mojs.tune({
      radius: this.radius(),
      radiusY: this.calculateScale()
    })
    .replay();
  }
  
}