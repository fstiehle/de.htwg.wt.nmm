import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent implements OnInit {

  @Input() whiteName: String;
  @Input() blackName: String;

  playerForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.playerForm = fb.group({
      'name' : [null, Validators.compose([Validators.required, Validators.minLength(2)])]
    });
  }

  ngOnInit() {
  }


  onSubmit() {
    if (this.playerForm.valid) {
      console.log("submit");
    }
  }

}
