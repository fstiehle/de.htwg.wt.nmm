import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.less']
})
export class InstructionsComponent implements OnInit {

  @Input() message: string;
  @Input() currentPlayer: string;

  constructor() { }

  ngOnInit() { }

}
