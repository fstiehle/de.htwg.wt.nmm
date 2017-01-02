/**
 * Junction
 * Holds the mojs shape 
 */
export default class Junction {

  Mojs = require('../../../../node_modules/mo-js/build/mo.js');

  /**
   * Use a mute for the rescale process
   */
  MUTE = 30;
  
  SHAPE = "circle";
  STROKE = 4;
  POINTS = 0;
  
  /**
   * Angular component to which shape will be attached
   */ 
  id: string;

  /**
   * board element to base positioning on
   */
  board: string; 

  /**
   * mojs object
   */
  mojs;
  
  /**  
   * @param Angular component to which shape will be attached
   * @param board element to base positioning on
   */
  constructor(id: string, board: string) {
    this.id = id;
    this.board = board;
  }
  
  /**
   * Depiction to a 0 - 7 coordinate system
   * 100 / 7 (Seven board parts)
   * Aligned from left 0 and top 0:
   * @var left distance in percentage from left
   * @var right distance in percentage from top
   */
  calculateOffset(coordinate) {
    return (100 / 7) * coordinate;
  }
  
  /**
   * Creates a new mojs shape
   */
  generateMojs() {
    this.mojs = new this.Mojs.Shape({
      parent: "#" + this.id,
      shape: this.SHAPE,
      points: this.POINTS,
      strokeWidth: this.STROKE,
      radius: this.calculateScale(),
      isShowStart:  true,
      left: 0
    });
  }
  
  /**
   * Calculates scale
   */
  protected calculateScale() {
    return document.getElementById(this.board).offsetWidth / this.MUTE;
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
