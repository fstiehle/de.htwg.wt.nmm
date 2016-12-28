import { Component, OnInit, Input } from '@angular/core';
import { PlayService } from "../play.service";
import Junction from './Junction';

@Component({
  selector: 'app-junction',
  template: '<ng-content></ng-content>',
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

  constructor() { }

  ngOnInit() {
    this.junction = new Junction(this.id, this.board);
    this.left = this.junction.calculateOffset(this.x) + "%";
    this.top = this.junction.calculateOffset(this.y) + "%";
  }

  ngAfterViewInit() {
    this.junction.generateMojs();
  }

}
