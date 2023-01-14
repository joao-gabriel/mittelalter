import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  @Input() data: any = null;

  name!:string;
  points!:number;
  imageSrc!:string;
  text!:string;
  effectPhase!:number;
  precendence!:number;
  hasEffect:boolean = false;
  onwer!:PlayerComponent;
  cardEffect = (game:GameComponent) => {}; 

  constructor(){}

  ngOnInit(): void {
    if (this.data != null){
      this.name = this.data.name;
      this.points = this.data.points;
      this.imageSrc = this.data.imageSrc;
      this.text = this.data.text;
      this.effectPhase = this.data.effectPhase;
      this.precendence = this.data.precendence;
      this.hasEffect = this.data.hasEffect;
      this.onwer = this.data.onwer;
      this.cardEffect = this.data.cardEffect;
    }
  }

}
