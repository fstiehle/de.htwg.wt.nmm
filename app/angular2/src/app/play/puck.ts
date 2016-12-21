import mojs from 'mo-js';

/**
 * Puck thats placed on a Junction
 * Holds the mojs shape
 * @param x coordinate
 * @param y coordinate
 * @param id
 * @constructor
 */
export default class Puck {
  
  /**
   * Uses as a mute for the rescale process
   */
  const MUTE = 25;
  const CLASS_NAME = "puck hidden";
  const CLASS_NAME_ACTIVATED = "puck";
  const SHAPE = "polygon";
  const STROKE = 3;
  const POINTS = 6;
  
  /**
   * Coordinates
   */ 
  let x = 0;
  let y = 0;
  let top: string; // % value
  let left: string; // % value
   
  let length: number;
  let rotation: number;
  
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
   * Activates puck on the board
   * @param man player of puck
   */
  activate(man) {
      $(this.mojs.el).attr("class", this.CLASS_NAME_ACTIVATED + " " + man.toLowerCase());
      this.mojs.play();
  }

  /**
   * Deactivates and hide the puck on the board
   */
  deactivate() {
      $(this.mojs.el).attr("class", this.CLASS_NAME);
  }

  /**
   * Puck Event Handler
   * !!@this is here the clicked element!!
   */
  clickEvent() {
      var data = Game.State.data,
          playerState = data.currentPlayer.currentState === "HOP" ? "MOVE": data.currentPlayer.currentState;

      // prevent player from selection opponents puck
      if (playerState !== "PICK" && !$(this).hasClass(data.currentPlayer.man.toLowerCase())) {
          return;
      }
      if (playerState === "MOVE" && Game.mouseQueue.length === 0) {
          Game.mouseQueue.push(this);
          $(this).addClass("selected");
          return;
      }
      //Game.State.requestCommand(playerState.toLowerCase(), [this.dataset.id]);
      Game.Socket.send("processCommand", playerState.toLowerCase(), [this.dataset.id]);
  }
  
}