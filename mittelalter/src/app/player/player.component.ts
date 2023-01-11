import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  damage:number = 10;  
  deck:Array<CardComponent> = [];
  hand:Array<CardComponent> = [];
  battlefield:Array<CardComponent> = [];
  discarded:Array<CardComponent> = [];

  constructor(){
    for(let i=0; i<30; i++){
      let card:CardComponent = new CardComponent();
      card.hasEffect = true;
      card.cardEffect = (game:GameComponent) => {console.log('efeito da carta '+i); console.log(game.players[0].damage);};
      this.deck.push(card);
    }
  }
}
