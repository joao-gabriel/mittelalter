import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { GameComponent } from '../game/game.component';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  id:string;
  damage:number = 10;  
  deck:Array<any> = [];
  hand:Array<CardComponent> = [];
  battlefield:Array<CardComponent> = [];
  discarded:Array<CardComponent> = [];
  gameRef:GameComponent;

  constructor(game:GameComponent){
    this.gameRef = game;
    this.id = crypto.randomUUID();
    this.createDeck();
  }

  shuffle() {
    let currentIndex = this.deck.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [this.deck[currentIndex], this.deck[randomIndex]] = [
        this.deck[randomIndex], this.deck[currentIndex]];
    }
  
    //return array;
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
        quantity:6,
        name: 'Infantry',
        points: 2,
        imageSrc: 'infantry.PNG',
        value:0
      },
      {
        quantity:4,
        name: 'Archers',
        points: 2,
        imageSrc: 'archers.PNG',
        value: 1,
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

    availableCards.forEach((element, index) => {
      let cardObj = new CardComponent();
      for (let i=0; i<element.quantity; i++){
        let thisCard = {...cardObj};
        thisCard.onwer = this;
        thisCard.id = crypto.randomUUID();
        thisCard.name = element.name;
        thisCard.points = element.points;
        thisCard.imageSrc = element.imageSrc;
        if (typeof element.text == 'string'){
          thisCard.text = element.text;
        }
        if (typeof element.hasEffect == 'boolean'){
          thisCard.hasEffect = element.hasEffect;
        }
        if (typeof element.cardEffect == 'function'){
          thisCard.cardEffect = element.cardEffect;
        }
        this.deck.push(thisCard);
      }

    });

  }

}
