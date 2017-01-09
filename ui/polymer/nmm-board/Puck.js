
/**
 * Puck thats placed on a Junction
 * @param id
 * @param parent HTML container
 */
class Puck extends Junction {
  
  constructor(id, parent) {
    super(id, parent);
    this.MUTE = 25;
    this.SHAPE = "polygon";
    this.STROKE = 3;
    this.POINTS = 6;
  }

}