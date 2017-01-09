/**
 * Junction
 * Holds the mojs shape 
 */
export default class Junction {


  /**
   * mojs object
   */
  //mojs;
  
  /**  
   * @param Angular component to which shape will be attached
   * @param board element to base positioning on
   */
  constructor(id, board) {
    this.id = id;
    this.board = board;
    this.MUTE = 30;
    this.SHAPE = "circle";
    this.STROKE = 4;
    this.POINTS = 0;
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
    this.mojs = new Mojs.Shape({
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
  calculateScale() {
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
