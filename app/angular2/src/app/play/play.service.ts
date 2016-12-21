import { Injectable } from '@angular/core';

const SOCKET_URL = "ws://localhost:9000/socket";


@Injectable()
export class PlayService {

  static BOARD_ID = "board";

  /**
   * Global State
   */
  state;

  socket: WebSocket;

  constructor() {
  }

  connect() {
    return new Promise((resolve, reject) => {
        this.socket = new WebSocket(SOCKET_URL);

        this.socket.onopen = this.onopen.bind(this);

        this.socket.onmessage = message => {
          console.log('Socket Status: '+ message + ' (onmessage)');
          this.state = (JSON.parse(message.data));
          resolve(this.state);
        };

        this.socket.onclose = this.onclose.bind(this);
    });
  }

  getState() {
    return this.state;
  }

  onopen() {
    console.log('Socket Status: '+ this.socket.readyState + ' (open)');
    this.send("refreshGame");
  }

  onclose() {
    console.log('Socket Status: '+ this.socket.readyState + ' (closed)');
  }

  /**
   * @param type
   *          "processCommand": Communicate with game logic
   *          "setPlayerName": Change the player name
   *          "refreshGame": Refresh and get current state
   *          "resetGame": NotImplementedYet
   * @param command
   *          when "processCommand": "set" | "pick" | "move"
   *          when "setPlayerName": "white" | "black"
   * @param query
   *          when "processCommand": Array of PuckIDs ["a1"]
   *          when "setPlayerName": "theNewPlayerName"
   */
  send(type, command = " ", query = " ") {
    var data = {type: type, command: command, query: query};
    this.socket.send(JSON.stringify(data));
    console.log('Socket Status: data sent');
  }
}
