import {PlayService} from "./play.service";
import {Component, OnInit, Input} from '@angular/core';

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

  constructor(private playService: PlayService) {
    playService.connect().then(state => {
      this.state = state;
      console.log(this.state);
    });
  }

  ngOnInit() {
    
  }

}
