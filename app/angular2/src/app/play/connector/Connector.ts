import Junction from '../junction/Junction';
import mojs from 'mo-js';

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
     
  length: number;
  rotation: number;
  
  /**
   * @param x coordinate
   * @param y coordinate
   * @param length
   * @param rotation
   */
  constructor(x: number, y: number, length: number, rotation: number) {
    super(x, y, "");
    
    this.rotation = rotation;
    this.length = length;
  }

  /**
   * @Override
   * Creates a new mojs from class variables
   * @returns {mojs.Shape}
   */
  protected generateMojs() {
      return new mojs.Shape({
          parent: "#" + Game.defaults.BOARD_ID,
          className: CLASS_NAME,
          shape: SHAPE,
          points: POINTS,
          strokeWidth: STROKE,
          radius: this.radius(),
          left: this.left + "%",
          top: this.top + "%",

          angle: this.rotation,
          radiusY: this.calculateScale(),
          isShowStart: true
      });
  };

  private radius() {
      return this.length * document.getElementById(Game.defaults.BOARD_ID).offsetWidth / MUTE_RADIUS;
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