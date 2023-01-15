import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent {

  winner!:PlayerComponent;
  sendToEnemyBtnClicked = false;
  sendToDeckBtnClicked = false;
  turn!:number;
  maxTurns!:number;
  time!:number;
  players:Array<PlayerComponent> = [];
  running:boolean = false;

  constructor(){
    let player1 = new PlayerComponent(this);
    let player2 = new PlayerComponent(this);
    this.players.push(player1);
    this.players.push(player2);
    this.players[0].shuffle();
    this.players[1].shuffle();
    this.newTurn();
  }

  newTurn(){
    this.players[0].fillHand(4);
    this.players[1].fillHand(4);
    console.log(this.players[0]);
    console.log(this.players[1]);
  }

  // FIXME: Review if the code is actually removing the right card from source
  moveCard(index:number, source:string, sourceWho:PlayerComponent, destination:string, destinationWho:PlayerComponent){
    let card;
    // Get card
    switch(source){
      case "deck":
        card = sourceWho.deck[index];
        break;

      case "discarded":
        card = sourceWho.discarded[index]
        break;

      case "hand":
        card = sourceWho.hand[index];
        break;

      case "battlefield":
        card = sourceWho.battlefield[index];
        break;

    }
   
    // Remove card from source
    switch(source){
      case "deck":
        sourceWho.deck.splice(index, 1);
        break;

      case "discarded":
        sourceWho.discarded.splice(index, 1);
        break;

      case "hand":
        sourceWho.hand.splice(index, 1);
        break;

      case "battlefield":
        sourceWho.battlefield.splice(index, 1);
        break;

    }
    
    // Put card in destination
    switch (destination) {
      case "deck":
        destinationWho.deck.push(card);
        break;

      case "hand":
        destinationWho.hand.push(card);
        break;
    
      case "battlefield":
        destinationWho.battlefield.push(card);
        break;

      case "discarded":
        destinationWho.discarded.push(card);
        break;

      default:
        break;
    }
  
  }

  checkBattlefields(battlefield1:any, battlefield2:any){
    let player1Points = 0;
    let player2Points = 0;
    console.log(battlefield1);
    battlefield1.forEach((element: any) => {
      if (element.hasEffect){
        element.cardEffect(this, element);
      }
      player1Points += element.points;
    });

    console.log ('forca de ataque: '+player1Points);
  }

  otherPlayer(player:PlayerComponent){
    return this.players.find(element => element.id != player.id);
  }

  sendCardToDeck(index:number){
    this.moveCard(index, 'hand', this.players[0], 'deck', this.players[0]);
    this.sendToDeckBtnClicked = true;
    this.checkActions();
  }

  sendCardToEnemy(index:number){
    this.moveCard(index, 'hand', this.players[0], 'deck', this.players[1]);
    this.sendToEnemyBtnClicked = true;
    this.checkActions();
  }

  checkActions(){
    console.log(this.sendToDeckBtnClicked);
    if (this.sendToEnemyBtnClicked && this.sendToDeckBtnClicked){
      this.moveCard(0, 'hand', this.players[0], 'battlefield', this.players[0]);
      this.moveCard(0, 'hand', this.players[0], 'battlefield', this.players[0]);
      this.checkBattlefields(this.players[0].battlefield, this.players[1].battlefield);
    }
  }

}
