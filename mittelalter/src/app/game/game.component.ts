import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
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
  playerPoints = 0;
  enemyPoints = 0;
  playerDamage = 0;
  enemyDamage = 0;

  constructor(@Inject(DOCUMENT) private document: Document){
    let player1 = new PlayerComponent(this);
    let player2 = new PlayerComponent(this);
    this.players.push(player1);
    this.players.push(player2);
    this.players[0].shuffle();
    this.players[1].shuffle();
    this.newTurn();
  }

  newTurn(){
    this.players[0].hand = [];
    this.players[1].hand = [];
    this.players[0].battlefield = [];
    this.players[1].battlefield = [];
    this.sendToDeckBtnClicked = false;
    this.sendToEnemyBtnClicked = false;
    this.players[0].fillHand(4);
    this.players[1].fillHand(4);
    console.log(this.players[0]);
    console.log(this.players[1]);
    this.AISelection();
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
    battlefield1.forEach((element: any) => {
      if (element.hasEffect){
        element.cardEffect(this, element);
      }
      this.playerPoints += element.points;
    });

    battlefield2.forEach((element: any) => {
      if (element.hasEffect){
        element.cardEffect(this, element);
      }
      this.enemyPoints += element.points;
    });
    
    console.log ('forca de ataque: '+this.playerPoints);
    console.log ('forca de ataque inimiga: '+this.enemyPoints);
    if (this.playerPoints > this.enemyPoints){
      this.enemyDamage += this.playerPoints - this.enemyPoints;
    }
    if (this.playerPoints < this.enemyPoints){
      this.playerDamage += this.enemyPoints - this.playerPoints;
    }    
    let modalBtn = this.document.getElementById('battleModalBtn');
    modalBtn?.click();
    console.log(this.document.getElementById('battleModal'));
    let myModalEl = document.getElementById('battleModal');
    if (myModalEl){
      myModalEl.addEventListener('hidden.bs.modal',  (event) => {
        this.playerPoints = 0;
        this.enemyPoints = 0;
        this.moveCard(0, 'battlefield', this.players[0], 'discarded', this.players[0]);
        this.moveCard(0, 'battlefield', this.players[0], 'discarded', this.players[0]);
        this.moveCard(0, 'battlefield', this.players[1], 'discarded', this.players[1]);
        this.moveCard(0, 'battlefield', this.players[1], 'discarded', this.players[1]);    
        this.newTurn();
      });
    }
    
  }

  otherPlayer(player:PlayerComponent){
    let otherPlayer = this.players[0].id==player.id? this.players[1]:this.players[0];
    console.log(otherPlayer);
    return otherPlayer;
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

  AISelection(){
    let sendBackToEnemyDeck = 0;
    let sendToPlayerDeck = 0;
    let highValue = 9999;
    // Sends the lower card to player
    this.players[1].hand.forEach((element, index) => {
      if (element.value < highValue ){
        highValue = element.points;
        sendToPlayerDeck = index;
      }
    });
    console.log(sendToPlayerDeck);
    this.moveCard(sendToPlayerDeck, 'hand', this.players[1], 'deck', this.players[0]);              
    highValue = 9999;
    this.players[1].hand.forEach((element, index) => {
      // Sends the second lower card back to enemy deck
      if (element.value < highValue ){
        highValue = element.points;
        sendBackToEnemyDeck = index;
      }
    });
    console.log(sendBackToEnemyDeck);
    this.moveCard(0, 'hand', this.players[1], 'battlefield', this.players[1]);   
    this.moveCard(1, 'hand', this.players[1], 'battlefield', this.players[1]);   
  }

}
