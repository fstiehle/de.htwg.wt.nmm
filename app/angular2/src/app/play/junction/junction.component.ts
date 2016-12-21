import { Component, OnInit, Input } from '@angular/core';
import Junction from './Junction';

@Component({
  selector: 'app-junction',
  templateUrl: './junction.component.html',
  styleUrls: ['./junction.component.less']
})
export class JunctionComponent implements OnInit {

  @Input() x: number;
  @Input() y: number;
  @Input() id: string;

  constructor() { }

  ngOnInit() {
  }

}
