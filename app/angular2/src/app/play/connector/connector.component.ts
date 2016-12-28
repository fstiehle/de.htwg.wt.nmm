import { Component, OnInit, Input } from '@angular/core';
import Connector from './Connector';

@Component({
  selector: 'app-connector',
  template: '<ng-content></ng-content>',
  styleUrls: ['../play.component.less']
})
export class ConnectorComponent implements OnInit {

  @Input() x: number;
  @Input() y: number;
  @Input() length: number;
  @Input() rotation: number;
  @Input() parent: string;

  connector: Connector;

  constructor() { }

  ngOnInit() {
    //this.connector = new Connector(this.x, this.y, this.length, this.rotation, this.parent);
    //this.connector.generateMojs();
  }

}
