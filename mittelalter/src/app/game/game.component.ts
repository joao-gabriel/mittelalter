import { Component, ComponentFactoryResolver, NgModule, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PlayerComponent } from '../player/player.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfantryComponent } from '../cards/infantry/infantry.component';

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

  constructor(private componentFactoryResolver: ComponentFactoryResolver){
    let player1 = new PlayerComponent();
    let player2 = new PlayerComponent();
    this.players.push(player1);
    this.players.push(player2);
    this.newTurn();
  }

  newTurn(){
    this.players[0].fillHand(3);
    this.players[1].fillHand(3);
  }

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
        element.cardEffect(this);
      }
    });
  }

}
