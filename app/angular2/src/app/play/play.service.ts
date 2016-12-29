import { Injectable } from '@angular/core';

const SOCKET_URL = "ws://de-htwg-wt-nmm.herokuapp.com/socket";

@Injectable()
export class PlayService {

  static BOARD_ID = "board";

  /**
   * Last received state
   */
  state;

  socket: WebSocket;

  constructor() {}

  connect() {
    // TODO: REJECT ON ERROR
    return new Promise((resolve, reject) => {
        this.socket = new WebSocket(SOCKET_URL);        

        this.socket.onmessage = message => {
          console.log('Socket Status: '+ message + ' (onmessage)');
          this.state = (JSON.parse(message.data));
          resolve(this.state);
        };

        this.socket.onopen = () => {
          console.log('Socket Status: '+ this.socket.readyState + ' (open)');
          this.send("refreshGame");
        };

        this.socket.onclose = () => {
          console.log('Socket Status: '+ this.socket.readyState + ' (closed)');
        };

    });
  }

  getState() {
    return this.state;
  }

  /**
   * @param type
   *   "processCommand": Communicate with game logic
   *   "setPlayerName": Change the player name
   *   "refreshGame": Refresh and get current state
   *   "resetGame": NotImplementedYet
   * @param command
   *   when "processCommand": "set" | "pick" | "move"
   *   when "setPlayerName": "white" | "black"
   * @param query
   *   when "processCommand": Array of PuckIDs ["a1"]
   *   when "setPlayerName": "theNewPlayerName"
   */
  send(type, command = " ", query = " ") {
    var data = {type: type, command: command, query: query};
    this.socket.send(JSON.stringify(data));
    console.log('Socket Status: data sent');
  }
}
