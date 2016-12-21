import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.less']
})
/**
 * Handles the main game interface
 */
export class PlayComponent implements OnInit {

  y: number;
  
  constructor() { 
    this.y = 2;
  }
  
  ngOnInit() {
  }

}
