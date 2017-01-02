import { Component, OnInit, Input } from '@angular/core';
import Puck from "./Puck";

@Component({
  selector: 'app-puck',
  template: '<ng-content></ng-content>',
  styleUrls: ['./puck.component.less'],
  host: {'[id]': 'id', '[class]': 'player', '[class.hidden]': 'isHidden'}
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
  puck: Puck;
  player: string;
  isHidden = true;
  isSelected = false;

  ngOnInit() {
    this.puck = new Puck(this.id, this.board);
    this.left = this.puck.calculateOffset(this.x) + "%";
    this.top = this.puck.calculateOffset(this.y) + "%";
  }

  ngAfterViewInit() {
    this.puck.generateMojs();
  }

  setClasses() {
    let classes =  {
      hidden: this.isHidden, 
      selected: this.isSelected,
    };
    return classes;
  }

}
