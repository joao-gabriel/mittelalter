import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { GameComponent } from '../game/game.component';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent  {

  innerComponentFunction = () => {};

  name!:string;
  points!:number;
  imageSrc!:string;
  text!:string;
  effectPhase!:number;
  precendence!:number;
  hasEffect:boolean = false;
  cardEffect = (game:GameComponent) => {}; 

  constructor(){

  }

}
