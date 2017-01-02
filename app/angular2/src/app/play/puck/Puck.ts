import Junction from '../junction/Junction';

/**
 * Puck thats placed on a Junction
 * @param id
 * @param parent HTML container
 */
export default class Puck extends Junction {

  /**
   * Override Junction constants
   * Uses as a mute for the rescale process
   */
  MUTE = 25;

  SHAPE = "polygon";
  STROKE = 3;
  POINTS = 6;
  
  constructor(id: string, parent: string) {
    super(id, parent);
  }

  /**
   * Activates puck visually for
   * player @man
   * @param man player of puck
   */
  activate(man) {
    //$(this.mojs.el).attr("class", CLASS_NAME_ACTIVATED + " " + man.toLowerCase());
    //this.mojs.play();
  }

  /**
   * Deactivates and hide the puck on the board
   */
  deactivate() {
    //$(this.mojs.el).attr("class", CLASS_NAME);
  }

  /**
   * Puck Event Handler
   * !!@this is here the clicked element!!
   */
  clickEvent() {
    /**
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
      */
  }
  
}