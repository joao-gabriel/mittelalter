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
  deckQty:number=0;

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
        text : "If there's no Archers or Catapults on enemy battlefield, add 1 point",
        effectPhase:2,
        precendence: 129,
        hasEffect:true,
        cardEffect:(game:GameComponent, card:CardComponent) => {
          let thisCard = card;
          let otherPlayer = game.otherPlayer(thisCard.onwer);
          thisCard.points = 3;
          if (typeof otherPlayer == 'object'){
            otherPlayer.battlefield.forEach((element: CardComponent) => {
              console.log(element.name);
              if (element.name == 'Archers' || element.name == 'Catapult'){
                thisCard.points = 2;
              }
              console.log(thisCard.points);
            });
          }
        }
      },
      {
        quantity:3,
        name: 'Cavalry',
        points: 3,
        imageSrc: 'cavalry.png',
        value:2
      },
      {
        quantity:2,
        name: 'Catapult',
        points: 3,
        imageSrc: 'catapult.png',
        value: 4,
        text : "If there's no Catapults on enemy battlefield, add 1 point",
        effectPhase:2,
        precendence: 129,
        hasEffect:true,
        cardEffect:(game:GameComponent, card:CardComponent) => {
          let thisCard = card;
          let otherPlayer = game.otherPlayer(thisCard.onwer);
          console.log(otherPlayer?.battlefield);
          thisCard.points = 4;
          if (typeof otherPlayer == 'object'){
            otherPlayer.battlefield.forEach((element: CardComponent) => {
              console.log(element.name);
              if (element.name == 'Catapult'){
                thisCard.points = 3;
              }
              console.log(thisCard.points);
            });
          }
        }
      }, 
      {
        quantity:2,
        name: 'Constructors',
        points: 1,
        imageSrc: 'constructors.png',
        value:2,
        text : "If you win this battle, remove 1 damage point",
        effectPhase:3,
        precendence: 129,
        hasEffect:true,
        cardEffect:(game:GameComponent, card:CardComponent) => {
          let thisCard = card;
          let otherPlayer = game.otherPlayer(thisCard.onwer);
          console.log(otherPlayer?.battlefield);
          thisCard.points = 4;
          if (typeof otherPlayer == 'object'){
            otherPlayer.battlefield.forEach((element: CardComponent) => {
              console.log(element.name);
              if (element.name == 'Catapult'){
                thisCard.points = 3;
              }
              console.log(thisCard.points);
            });
          }
        }
      },
      {
        quantity:4,
        name: 'Saboteur',
        points: -1,
        imageSrc: 'saboteur.png',
        value:1
      },
         
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
        this.deckQty++;
      }

    });

  }

}
