import { Component, OnInit, Input } from '@angular/core';
import Puck from "./Puck";

@Component({
  selector: 'app-puck',
  template: '<ng-content></ng-content>',
  styleUrls: ['./puck.component.less']
})
export class PuckComponent implements OnInit {

  @Input() x: number;
  @Input() y: number;
  @Input() id: string;
  @Input() parent: string;

  puck;

  constructor() {
    //this.puck = new Puck(this.x, this.y, this.id);
  }

  ngOnInit() {
  }

}
