import Junction from '../junction/Junction';

/**
 * Connector between Junctions
 */
export default class Connector extends Junction {

  Mojs = require('../../../../node_modules/mo-js/build/mo.js');

  /**
   * Uses as a mute for the rescale process
   */
  MUTE = 100;

  MUTE_RADIUS = 6;
  SHAPE = "rect";
  STROKE = 0;
  POINTS = 0;
     
  length: number;
  rotation: number;
  
  /**
   * @param x coordinate
   * @param y coordinate
   * @param length
   * @param rotation
   * @param parent HTML container
   */
  constructor(id: string, board: string, length: number, rotation: number) {
    super(id, board);
    this.length = length;
    this.rotation = rotation;
  }

  /**
   * @Override
   * Creates a new mojs from class variables
   */
  generateMojs() {
    this.mojs = new this.Mojs.Shape({
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

  private radius() {
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