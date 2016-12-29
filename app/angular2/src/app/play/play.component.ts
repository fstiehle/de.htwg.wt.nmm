import {PlayService} from "./play.service";
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
  providers: [PlayService]
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

  constructor(private playService: PlayService) {   

    /**
     * Default values until state arrives from server
     */
    this.state = { white: { name: "Loading..." },
      black: { name: "Loading..." }};

    /**
     * Subscribe to playService observerable
     */
    playService.getObservable().subscribe((message) => {
      this.state = JSON.parse(message.data);
      console.log("state updated");
    });
  }

  ngOnInit() { }

}
