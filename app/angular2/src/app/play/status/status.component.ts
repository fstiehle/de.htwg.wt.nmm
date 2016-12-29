import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent implements OnInit {

  @Input() whiteName: String;
  @Input() blackName: String;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("Submit!");
  }

}
