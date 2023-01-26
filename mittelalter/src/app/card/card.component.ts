import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  @Input() data: any = null;
  @Output() sendToDeck = new EventEmitter();
  @Output() sendToEnemy = new EventEmitter();

  id!:string;
  name!:string;
  points!:number;
  imageSrc!:string;
  text!:string;
  effectPhase!:number;
  precendence!:number;
  hasEffect!:boolean;
  onwer!:PlayerComponent;
  value!:number;
  cardEffect = (game:GameComponent, card:CardComponent) => {}; 
  effectInterruptBattle = false;

  constructor(){
    
  }

  ngOnInit(): void {
    if (this.data != null){
      this.id = this.data.id;
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

  sendThisCardToDeck(id:string){
    console.log(id);
    this.sendToDeck.emit();
  }

  sendThisCardToEnemy(){
    this.sendToEnemy.emit();
  }

}
