import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlayService } from "../play.service";

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.less']
})
export class InstructionsComponent implements OnInit {
  
  saveGameForm: FormGroup;
  sessionName: string = "My Game";
  play: PlayService;

  @Input() message: string;
  @Input() currentPlayer: string;
  @Input() load: any;
  constructor(fb: FormBuilder, play: PlayService) { 
    this.play = play;
    this.saveGameForm = fb.group({
      'name' : [null, Validators.compose([Validators.required, Validators.minLength(2)])]
    });
  }

  /**
   * On form submit
   * sends saveGame request
   */
  onSubmit(e, form) { 
      e.preventDefault();
      this.play.send("saveGame", "name", [form.value.name]);
  }

  resetGame() {
    this.play.send("resetGame");
  }

  ngOnInit() { }

}
