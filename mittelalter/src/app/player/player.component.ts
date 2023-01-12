import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { InfantryComponent } from '../cards/infantry/infantry.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  damage:number = 10;  
  deck:Array<any> = [];
  hand:Array<CardComponent> = [];
  battlefield:Array<CardComponent> = [];
  discarded:Array<CardComponent> = [];

  constructor(){
    this.createDeck();
  }

  shuffleDeck(){

  }

  fillHand(limit:number){
    for (let i = 0; i<limit; i++){
      this.hand.push(this.deck[0]);
      this.deck.pop();
    }
  }

  // TODO: Get deck cards from external json file
  createDeck(){

    let availableCards = [
      InfantryComponent,
      InfantryComponent,
      InfantryComponent,
      InfantryComponent      
    ];

    availableCards.forEach(element => {
      this.deck.push(new element());
    });

  }

}
