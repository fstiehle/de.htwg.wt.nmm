import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
    public constructor(private titleService: Title) { }

    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }
}
