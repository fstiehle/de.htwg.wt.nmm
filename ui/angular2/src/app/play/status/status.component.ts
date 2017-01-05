import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlayService } from "../play.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less'],
})
export class StatusComponent implements OnInit {

  @Input() white;
  @Input() black;
  @Input() currentPlayer: String;

  playerWhiteForm: FormGroup;
  playerBlackForm: FormGroup;
  play: PlayService;

  /**
   * Progress calculated based on Pucks left
   */
  whiteProgress = 50;
  blackProgress = 50;

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

  ngOnChanges() {
    this.calculateProgress();
  }

  private calculateProgress() {
    if (!this.black || !this.white) {
      return;
    }
    // TODO: adjust formula to nine pucks
    this.whiteProgress = ((this.black.numPucksTakenAway - this.white.numPucksTakenAway) * 10) + 50;
    this.blackProgress = 100 - this.whiteProgress;
  }

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
