import Junction from '../junction/Junction';

  /**
   * Uses as a mute for the rescale process
   */
  const MUTE = 100;
  const MUTE_RADIUS = 6;

  const CLASS_NAME = "connector";
  const SHAPE = "rect";
  const STROKE = 0;
  const POINTS = 0;

/**
 * Connector between Junctions
 */
export default class Connector extends Junction {

  Mojs = require('../../../../node_modules/mo-js/build/mo.js');
     
  length: number;
  rotation: number;
  
  /**
   * @param x coordinate
   * @param y coordinate
   * @param length
   * @param rotation
   * @param parent HTML container
   */
  constructor(x: number, y: number, length: number, rotation: number, parent : string) {
    super(x, y, "", parent);
    this.rotation = rotation;
    this.length = length;
  }

  /**
   * @Override
   * Creates a new mojs from class variables
   */
  generateMojs() {
    this.mojs = new this.Mojs.Shape({
      parent: "#" + this.parent,
      className: CLASS_NAME,
      shape: SHAPE,
      points: POINTS,
      strokelength: STROKE,
      radius: this.radius(),
      left: this.left + "%",
      top: this.top + "%",
      angle: this.rotation,
      radiusY: this.calculateScale(),
      isShowStart: true
    });
  };

  private radius() {
    return this.length * document.getElementById(this.parent).offsetWidth / MUTE_RADIUS;
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