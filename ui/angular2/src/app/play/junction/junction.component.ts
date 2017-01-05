import { Component, OnInit, Input } from '@angular/core';
import { PlayService } from "../play.service";
import { MouseQueueService } from "../mouse-queue.service";
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
   * Junction state
   * Empty object if not occupied
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

  isSelected = false;

  playService: PlayService
  mouseQueue: MouseQueueService

  constructor(playerService: PlayService, mouseQueue: MouseQueueService) { 
    this.playService = playerService;
    this.mouseQueue = mouseQueue;
  }

  ngOnInit() {
    this.junction = new Junction(this.id, this.board);
    this.left = this.junction.calculateOffset(this.x) + "%";
    this.top = this.junction.calculateOffset(this.y) + "%";
  }

  ngAfterViewInit() {
    this.junction.generateMojs();
  }

  ngOnChanges() {
    this.isSelected = false;
  }

  onResize() {
    this.junction.rescale();
  }

  /**
   * Handles clickEvent
   * @param player Player who clicked
   * @param playerState @player's current state
   */
  onClick(player, playerState) {
    if (!(player && playerState)) {
      console.log("Still loading...");
      return;
    }
    else if (playerState === "SET") {
      this.playService.send("processCommand", "set", [this.id]);
    }
    if (playerState === "PICK") {
      this.playService.send("processCommand", "pick", [this.id]);
    }
    else if (playerState === "MOVE" || playerState === "HOP") {
      this.movePuck(player);
    }
  }

  /**
   * @param player Player who clicked
   */
  private movePuck(player) {
    let mouseQueue;
    if (this.mouseQueue.getLength() == 0 && this.state.man != player) {
      return; // don't procced if not player's puck or no puck at all
    } 
    this.isSelected = true;
    mouseQueue = this.mouseQueue.addClick(this.id);
    console.log(mouseQueue);
    if (mouseQueue.length == 2) {
      this.playService.send("processCommand", "move", mouseQueue);
    }
  }

}
