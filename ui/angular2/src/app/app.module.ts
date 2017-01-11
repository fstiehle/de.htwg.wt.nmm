import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PolymerElement } from '@vaadin/angular2-polymer';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { PlayComponent } from './play/play.component';
import { JunctionComponent } from "./play/junction/junction.component";
import { ConnectorComponent } from "./play/connector/connector.component";
import { PuckComponent } from "./play/puck/puck.component";
import { StatusComponent } from './play/status/status.component';
import { InstructionsComponent } from './play/instructions/instructions.component';
import { PolymerComponent } from './polymer/polymer.component';

@NgModule({
  declarations: [
    AppComponent,
    PolymerElement('nmm-board'),
    HeaderComponent,
    AboutComponent,
    PlayComponent,
    PuckComponent,
    ConnectorComponent,
    JunctionComponent,
    StatusComponent,
    InstructionsComponent,
    PolymerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'play',
        component: PlayComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'polymer',
        component: PolymerComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
