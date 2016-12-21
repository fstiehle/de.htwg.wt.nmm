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

  constructor(private playService: PlayService, private httpService: HttpService) {   
    playService.connect().then(state => {
      this.state = state;
      console.log(this.state);
      this.updateBoard();
    });
  }

  ngOnInit() {    
    console.log(this.boardDefinition);
  }

  /**
   * updates Board and activates/deactivates pucks
   */
  updateBoard() {
    
  }

}
