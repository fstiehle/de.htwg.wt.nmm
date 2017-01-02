import { Component, OnInit, Input } from '@angular/core';
import Connector from './Connector';

@Component({
  selector: 'app-connector',
  template: '<ng-content></ng-content>',
  styleUrls: ['./connector.component.less'],
  host: {'[id]': 'id', '[style.left]': 'left' , '[style.top]': 'top'}
})
export class ConnectorComponent implements OnInit {

  /**
   * Coordinates
   */ 
  @Input() x: number;
  @Input() y: number;

  /**
   * HTML ID
   */
  @Input() id: string;

  /**
   * Relative positioning in %
   * based on Coordinates
   */ 
  top: string;
  left: string;

  @Input() length: number;
  @Input() rotation: number;

  /**
   * board element to base positioning on
   */
  @Input() board: string;

  connector: Connector;

  constructor() { }

  ngOnInit() {
    this.connector = new Connector(this.id, this.board, this.length, this.rotation);
    this.left = this.connector.calculateOffset(this.x) + "%";
    this.top = this.connector.calculateOffset(this.y) + "%";
  }

  ngAfterViewInit() {
    this.connector.generateMojs();
  }

  onResize() {
    
  }

}
