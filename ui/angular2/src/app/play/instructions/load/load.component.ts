import { Component, OnInit, Input } from '@angular/core';
import { PlayService } from "../../play.service";

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.less']
})
export class LoadComponent implements OnInit {

  @Input() load: any;

  playService: PlayService;

  constructor(playerService: PlayService) { 
    this.playService = playerService;
  }

  ngOnInit() { }

  onclick() {
    console.log("attempt to load session");
    if (this.load == null || this.load.id == null) {
      return
    }
    this.playService.send("loadGame", "id", [this.load.id])
  }

}
