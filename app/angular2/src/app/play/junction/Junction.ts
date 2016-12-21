import mojs from 'mo-js';

/**
 * Uses as a mute for the rescale process
 */
const MUTE = 30;

const CLASS_NAME = "junction";
const SHAPE = "circle";
const STROKE = 4;
const POINTS = 0;

/**
 * Junction
 * Holds the mojs shape 
 */
export default class Junction {
  
  /**
   * Coordinates
   */ 
  x = 0;
  y = 0;
  top: number; // % value
  left: number; // % value
  
  /**
   * HTML ID
   */ 
  id: string;

  /**
   * mojs object
   */
  mojs;
  
  /**  
   * @param x coordinate
   * @param y coordinate
   * @param id
   */
  constructor(x: number, y: number, id: string) {
    this.x = x;
    this.y = y;
    this.id = id;
    
    this.left = this.calculateOffset(x);
    this.top = this.calculateOffset(y);
    
    this.mojs = this.generateMojs();
    this.mojs.el.dataset.id = id;
  }
  
  /**
   * Depiction to a 0 - 7 coordinate system
   * 100 / 7 (Seven board parts)
   * Aligned from left 0 and top 0:
   * @var left distance in percentage from left
   * @var right distance in percentage from top
   */
  protected calculateOffset(coordinate) {
    return (100 / 7) * coordinate;
  }
  
  /**
   * Creates a new mojs shape
   * @returns {mojs.Shape}
   */
  protected generateMojs() {
    return new mojs.Shape({
        parent: "#" + Game.defaults.BOARD_ID,
        className: CLASS_NAME,
        shape: SHAPE,
        points: POINTS,
        strokeWidth: STROKE,
        radius: this.calculateScale(),
        left: this.left + "%",
        top: this.top + "%",
        isShowStart:  true
    });
  }
  
  /**
   * Calculates scale
   */
  protected calculateScale() {
    return document.getElementById(Game.defaults.BOARD_ID).offsetWidth / MUTE;
  }

  /**
   * Rescales the mojs object
   */
  rescale() {
      this.mojs.tune({
          radius: this.calculateScale()
      })
      .replay();
  }

}
