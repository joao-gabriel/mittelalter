import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent {

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  winner!:PlayerComponent;
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
  moveCard(card:CardComponent, source:string, destination:string, who:PlayerComponent){

    switch(source){
      case "deck":
        who.deck.pop();
        break;

      case "discarded":
        who.discarded.pop();
        break;

      case "hand":
        who.discarded.pop();
        break;

      case "battlefield":
        who.discarded.pop();
        break;

    }

    switch (destination) {
      case "deck":
        who.deck.push(card);
        break;

      case "hand":
        who.hand.push(card);
        break;
    
      case "battlefield":
        who.battlefield.push(card);
        break;

      case "discarded":
        who.discarded.push(card);
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
    });
  }

  otherPlayer(player:PlayerComponent){

    return this.players.find(element => element.id != player.id);
    
  }

}
