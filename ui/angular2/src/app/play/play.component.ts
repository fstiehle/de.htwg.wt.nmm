import {PlayService} from "./play.service";
import {MouseQueueService} from "./mouse-queue.service";
import {Component, OnInit, Input} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.less'],
  providers: [PlayService, MouseQueueService]
})

/**
 * Handles the main game interface
 */
export class PlayComponent implements OnInit {

  /**
   * Global State
   */
  state: any;
  boardState = {};

  /**
   * Require Initial Board Components from JSON
   */
  boardDefinition = require("../../assets/boardDefinition.json");
  BOARD_ID = PlayService.BOARD_ID;

  constructor(private playService: PlayService) {   

    /**
     * Default values until state arrives from server
     */
    this.state = { 
      white: { name: "Loading..." },
      black: { name: "Loading..." },
      currentPlayer: { man: undefined, currentState: undefined },
      board: undefined
    };

    /**
     * Subscribe to playService observerable
     */
    playService.getObservable().subscribe((message) => {
      this.state = JSON.parse(message.data);
      this.boardState = this.state.board;
      console.log(this.state);
      console.log("state updated");
    });
  }

  ngOnInit() { }

}
