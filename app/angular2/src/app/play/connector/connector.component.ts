import { Component, OnInit, Input } from '@angular/core';
import Connector from './Connector';

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.less']
})
export class ConnectorComponent implements OnInit {

  @Input() x: number;
  @Input() y: number;
  @Input() length: number;
  @Input() rotation: number;

  constructor() { }

  ngOnInit() {
  }

}
