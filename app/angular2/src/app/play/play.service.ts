import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';

const SOCKET_URL = "ws://de-htwg-wt-nmm.herokuapp.com/socket";

@Injectable()
export class PlayService {

  static BOARD_ID = "board";

  /**
   * True if initial state has arrived from server
   */
  isReady = false;
  
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
    this.socket = new WebSocket(SOCKET_URL);
    this.subject = Observable.create((observer: Observer<MessageEvent>) => {
      // bind socket events to observer events
      this.socket.onmessage = observer.next.bind(observer);
      this.socket.onerror = observer.error.bind(observer);
      this.socket.onclose = observer.complete.bind(observer);
      this.socket.onopen = () => {
        console.log('Socket Status: open');
        this.send("refreshGame");
        this.isReady = true;
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
   *   "resetGame": NotImplementedYet
   * @param command
   *   when "processCommand": "set" | "pick" | "move"
   *   when "setPlayerName": "white" | "black"
   * @param query
   *   when "processCommand": Array of PuckIDs ["a1"]
   *   when "setPlayerName": "theNewPlayerName"
   */
  send(type, command = " ", query = " ") {
    if (this.socket.readyState !== WebSocket.OPEN) {
      console.log("Websocket not open");
      return;
    }
    var data = {type: type, command: command, query: query};
    this.socket.send(JSON.stringify(data));
    console.log('Socket Status: data sent');
  }
}
