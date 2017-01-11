import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    PlayComponent,
    PuckComponent,
    ConnectorComponent,
    JunctionComponent,
    StatusComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
