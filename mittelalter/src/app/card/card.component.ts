import { Component } from '@angular/core';
import { GameComponent } from '../game/game.component';

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
