import mojs from 'mo-js';

/**
 * Connector between Junctions
 */
export default class Connector {
  
  /**
   * Uses as a mute for the rescale process
   */
  const MUTE = 100;
  const CLASS_NAME = "connector";
  const SHAPE = "rect";
  const STROKE = 0;
  const POINTS = 0;
  
  /**
   * Coordinates
   */ 
  let x = 0;
  let y = 0;
  let top: string; // % value
  let left: string; // % value
   
  let length: number;
  let rotation: number;
  
  /**
   * @param x coordinate
   * @param y coordinate
   * @param length
   * @param rotation
   */
  constructor(x: number, y: number, length: number, rotation: number) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.rotation = rotation;
    
    this.left = this.calculateOffset(x);
    this.top = this.calculateOffset(y);
    
    this.mojs = this.generateMojs();
  }

  /**
   * @Override
   * Creates a new mojs from class variables
   * @returns {mojs.Shape}
   */
  private generateMojs() {
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
          isShowStart: true
      });
  };

  private radius() {
      return this.length * document.getElementById(Game.defaults.BOARD_ID).offsetWidth / this.MUTE_RADIUS;
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