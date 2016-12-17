/**
 * Junction
 * Holds the mojs shape 
 */
export default Junction {
  
  /**
   * Uses as a mute for the rescale process
   */
  const MUTE = 30;
  const CLASS_NAME = "junction";
  const SHAPE = "circle";
  const STROKE = 4;
  const POINTS = 0;
  
  /**
   * Coordinates
   */ 
  let x = 0;
  let y = 0;
  let top: String; // % value
  let left: String; // % value
  
  /**
   * HTML ID
   */ 
  let id: String;
  
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
  private calculateOffset(coordinate) {
    return (100 / 7) * coordinate;
  }
  
  /**
   * Creates a new mojs shape
   * @returns {mojs.Shape}
   */
  private generateMojs() {
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
  }
  
  /**
   * Calculates scale
   */
  private calculateScale() {
    return document.getElementById(Game.defaults.BOARD_ID).offsetWidth / this.MUTE;
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
