import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlayService } from "../play.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent implements OnInit {

  @Input() whiteName: String;
  @Input() blackName: String;

  playerWhiteForm: FormGroup;
  playerBlackForm: FormGroup;
  play: PlayService;

  constructor(fb: FormBuilder, play: PlayService) {
    this.play = play;
    this.playerWhiteForm = fb.group({
      'name' : [null, Validators.compose([Validators.required, Validators.minLength(2)])],
    });
    this.playerBlackForm = fb.group({
      'name' : [null, Validators.compose([Validators.required, Validators.minLength(2)])]
    });
  }

  ngOnInit() { }

  /**
   * On form submit
   * sends setPlayerName request
   * @param man white or black Player
   */
  onSubmit(e, form, man) {
    e.preventDefault();
    if (!form.valid) {
      // TODO: Handle illegal input
      console.log("not vaild");
      return;
    }
    this.play.send("setPlayerName", man.toUpperCase(), form.value.name);
  }

}
