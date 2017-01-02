import { Component, OnInit, Input } from '@angular/core';
import { PlayService } from "../play.service";
import Junction from './Junction';
import Puck from '../puck/Puck';

@Component({
  selector: 'app-junction',
  templateUrl: './junction.component.html',
  styleUrls: ['./junction.component.less'],
  host: {'[id]': 'id', '[style.left]': 'left' , '[style.top]': 'top'},
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
   * board state
   */
  @Input() state;

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
  hasPuck = false;

  playService: PlayService

  constructor(playerService: PlayService) { 
    this.playService = playerService;
  }

  ngOnInit() {
    this.junction = new Junction(this.id, this.board);
    this.left = this.junction.calculateOffset(this.x) + "%";
    this.top = this.junction.calculateOffset(this.y) + "%";
  }

  ngAfterViewInit() {
    this.junction.generateMojs();
  }

  onResize() {
    
  }

  onClick(player, playerState) {
    console.log(this.state)

    if (!(player && playerState)) {
      console.log("Still loading...");
      return;
    }
    if (this.hasPuck) {
      //this.puckClick.emit({player, playerState});
    } 
    else if (playerState === "SET") {
      this.hasPuck = true;
      this.playService.send("processCommand", "set", [this.id]);
    }
    else if (playerState === "PICK") {
      this.hasPuck = false;
      this.playService.send("processCommand", "pick", [this.id]);
    }
    // else activate or deactivate depending on player state
    // else in move state add puck to mouseQueue
  }

}
