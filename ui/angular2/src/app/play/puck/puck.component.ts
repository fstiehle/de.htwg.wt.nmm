import { Component, OnInit, Input } from '@angular/core';
import Puck from "./Puck";

@Component({
  selector: 'app-puck',
  template: '<ng-content></ng-content>',
  styleUrls: ['./puck.component.less'],
  host: {'[id]': 'id', '[class]': 'player', '[class.selected]': "isSelected"}
})
export class PuckComponent implements OnInit {

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

  /**
   * HTML ID
   */
  @Input() id: string;

  /**
   * board element to base positioning on
   */
  @Input() board: string;

  /**
   * Puck is hidden by default until
   * player sets it
   */
  @Input() player: string;
  @Input() isSelected = false;
  
  puck: Puck;

  ngOnInit() {
    this.puck = new Puck(this.id, this.board);
    this.left = this.puck.calculateOffset(this.x) + "%";
    this.top = this.puck.calculateOffset(this.y) + "%";
  }

  ngAfterViewInit() {
    this.puck.generateMojs();
    this.puck.mojs.tune({isShowStart: false})
  }

  ngOnChanges() {
    if (!this.puck) {
      return;
    }
    if (this.isSelected) {
      this.puck.mojs.tune({
        angle: {0 : -180 },
        scale: {1 : 1},
        duration: 500
      })
      .replay();
    }
    
    if (!this.isSelected && this.player) {
      this.puck.mojs.tune({
        scale: {0 : 1},
        angle: {0 : -180 },
        duration: 250 
      })
      .replay();
    }

    if (!this.player) {
      this.puck.mojs.tune({
        scale: {1 : 0},
        angle: {0 : -180 },
        duration: 500 
      })
      .replay();
    }
  }

  onResize() {
    this.puck.rescale();
  }
}
