import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';

let SOCKET_URL = "ws:";

let loc = window.location;
if (loc.protocol === "https:") {
    SOCKET_URL = "wss:";
}
SOCKET_URL += "//" + loc.host + "/socket";

/**
 * DEV WebSocket URL for Angular2 DEV only
 */
//SOCKET_URL = "ws://localhost:9000/socket";

@Injectable()
export class PlayService {

  static BOARD_ID = "board";
  load: boolean;
  
  /**
   * Subject with MessageEvent data
   * A MessageEvent is the interface representing a message received by a target,
   * being a WebSocket or a WebRTC 
   * https://developer.mozilla.org/de/docs/Web/API/MessageEvent
   */
  private subject: Observable<MessageEvent>;
  private socket: WebSocket;

  /**
   * First to call for service will initialize the Websocket
   */
  constructor() {
    this.load = false;
    this.socket = new WebSocket(SOCKET_URL);
    this.subject = Observable.create((observer: Observer<MessageEvent>) => {
      // bind socket events to observer events
      this.socket.onmessage = (ev) => { observer.next(ev); this.load = false; }
      this.socket.onerror = observer.error.bind(observer);
      this.socket.onclose = observer.complete.bind(observer);
      this.socket.onopen = () => {
        console.log('Socket Status: open');
        this.send("refreshGame");
      };
    });
  }

  getObservable() {
    return this.subject;
  }

  /**
   * @param type
   *   "processCommand": Communicate with game logic
   *   "setPlayerName": Change the player name
   *   "refreshGame": Refresh and get current state
   *   "resetGame": Resets game,
   *   "loadGame": loads Game
   *   "saveGame": saves game
   * @param command
   *   when "processCommand": "set" | "pick" | "move"
   *   when "setPlayerName": "WHITE" | "BLACK"
   *   when "loadGame": "ID"
   *   when "saveGame": "game"
   * @param query
   *   when "processCommand": Array of PuckIDs ["a1"]
   *   when "setPlayerName": "theNewPlayerName"
   *   when "loadGame": "sessionID"
   *   when "saveGame": "sessionName"
   */
  send(type, command = " ", query: Array<string> = []) {
    if (this.socket.readyState !== WebSocket.OPEN) {
      console.log("Websocket not open");
      return;
    }
    var data = {type: type, command: command, query: query};
    this.socket.send(JSON.stringify(data));
    this.load = true;
    console.log('Socket Status: data sent');
  }
}
