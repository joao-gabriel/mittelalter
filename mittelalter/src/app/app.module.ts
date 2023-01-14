import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PlayerComponent } from './player/player.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayerComponent,
    GameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
