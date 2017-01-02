import { Component, OnInit, Input } from '@angular/core';
import { PlayService } from "../play.service";
import Junction from './Junction';
import Puck from '../puck/Puck';

@Component({
  selector: 'app-junction',
  templateUrl: './junction.component.html',
  styleUrls: ['./junction.component.less'],
  host: {'[id]': 'id', '[style.left]': 'left' , '[style.top]': 'top'}
})
export class JunctionComponent implements OnInit {

  /**
   * HTML ID
   */
  @Input() id: string;

  /**
   * board element to base positioning on
   */
  @Input() board: string;

  /**
   * Coordinates
   */ 
  @Input() x: number;
  @Input() y: number;

  /**
   * Relative positioning in %
   * based on Coordinates
   */ 
  top: string;
  left: string;

  junction: Junction;

  /**
   * Junction can be ocupied by a
   * players puck
   */ 
  puck: Puck;
  hasPuck: boolean;

  constructor() { }

  ngOnInit() {
    this.junction = new Junction(this.id, this.board);
    this.left = this.junction.calculateOffset(this.x) + "%";
    this.top = this.junction.calculateOffset(this.y) + "%";
  }

  ngAfterViewInit() {
    this.junction.generateMojs();
  }

  onResize(event) {
    
  }

  clickEvent(event, playerState) {
    // check if state has arrived
    // decide if hasPuck
    // if not set puck
    // else activate or deactivate depending on player state
    // else in move state add puck to mouseQueue
  }

}
