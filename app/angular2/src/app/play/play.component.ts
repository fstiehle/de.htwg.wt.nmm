import {PlayService} from "./play.service";
import {Component, OnInit, Input} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';


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

  state;

  private boardDefinitionUrl = 'assets/board/boardDefinition.json';  // URL to web API

  constructor(private playService: PlayService, private http: Http) {
    playService.connect().then(state => {
      this.state = state;
      console.log(this.state);
      this.updateBoard();
    });
  }

  ngOnInit() {
    this.http.get(this.boardDefinitionUrl)
             .map(this.generateBoard);
  }

  /**
   * Generates Initial Board Components from JSON
   */
  generateBoard(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  /**
   * updates Board and activates/deactivates pucks
   */
  updateBoard() {
    
  }

}
