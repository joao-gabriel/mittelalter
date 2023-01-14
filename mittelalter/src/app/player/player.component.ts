import { Component } from '@angular/core';
import { Guid } from 'guid-typescript';
import { timestamp } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { GameComponent } from '../game/game.component';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  id:Guid;
  damage:number = 10;  
  deck:Array<any> = [];
  hand:Array<CardComponent> = [];
  battlefield:Array<CardComponent> = [];
  discarded:Array<CardComponent> = [];
  gameRef:GameComponent;

  constructor(game:GameComponent){
    this.gameRef = game;
    this.id = Guid.create();
    this.createDeck();
  }

  shuffleDeck(){

  }

  fillHand(limit:number){
    for (let i = 0; i<limit; i++){
      this.hand.push(this.deck[this.deck.length-1]);
      this.deck.pop();
    }
  }

  // TODO: Get deck cards from external json file
  createDeck(){

    let availableCards = [
      {
        quantity:1,
        name: 'Infantry',
        points: 2,
        imageSrc: 'infantry.PNG',
        
      },
      {
        quantity:2,
        name: 'Archers',
        points: 2,
        imageSrc: 'archers.PNG',
        text : "If there's no Archers on enemy battlefield, add 1 point",
        effectPhase:3,
        precendence: 129,
        hasEffect:true,
        cardEffect:(game:GameComponent, card:CardComponent) => {
          let thisCard = card;
          let otherPlayer = game.otherPlayer(thisCard.onwer);
          thisCard.points = 3;
          if (typeof otherPlayer == 'object'){
            otherPlayer.battlefield.forEach((element: CardComponent) => {
              if (element.name == 'Archers'){
                thisCard.points = 2;
              }
            });
          }
        }
      }
    ];

    availableCards.forEach(element => {
      let thisCard = new CardComponent();
      thisCard.onwer = this;
      thisCard.name = element.name;
      thisCard.points = element.points;
      thisCard.imageSrc = element.imageSrc;
      if (typeof element.hasEffect == 'boolean'){
        thisCard.hasEffect = element.hasEffect;
      }
      if (typeof element.cardEffect == 'function'){
        thisCard.cardEffect = element.cardEffect;
      }
      this.addCardToPlayersDeck(thisCard, element.quantity);
    });

  }

  addCardToPlayersDeck(card:CardComponent, quantity:number){
    for (let i=0; i<quantity; i++){
      this.deck.push(card);
    }
  }

}
