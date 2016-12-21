import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-puck',
  templateUrl: './puck.component.html',
  styleUrls: ['./puck.component.less']
})
export class PuckComponent implements OnInit {

  @Input() x: number;
  @Input() y: number;
  @Input() id: string;

  constructor() {

  }

  ngOnInit() {
  }

}
