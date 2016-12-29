import {PlayService} from "./play.service";
import {HttpService} from "./http.service";
import {Component, OnInit, Input} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

export let Shapes = {
    junction: {},
    puck: {},
    connector: []
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.less'],
  providers: [PlayService, HttpService]
})

/**
 * Handles the main game interface
 */
export class PlayComponent implements OnInit {

  /**
   * Global State
   */
  state;

  /**
   * Require Initial Board Components from JSON
   */
  boardDefinition = require("../../assets/boardDefinition.json");
  BOARD_ID = PlayService.BOARD_ID;

  constructor(private playService: PlayService, private httpService: HttpService) {   

    /**
     * Default values until state arrives from server
     */
    this.state = { white: { name: "Player 1" },
      black: { name: "Player 2" }};

    /**
     * Listen to playService Observer
     */
    playService.getObservable().subscribe((message) => {
      this.state = JSON.parse(message.data);
      console.log("state updated");
    });
  }

  ngOnInit() {    

  }

  /**
   * updates Board and activates/deactivates pucks
   */
  updateBoard() {
    
  }

}
