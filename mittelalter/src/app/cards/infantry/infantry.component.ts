import { Component } from '@angular/core';
import { CardComponent } from 'src/app/card/card.component';

@Component({
  selector: 'app-infantry',
  templateUrl: './infantry.component.html',
  styleUrls: ['./infantry.component.css']
})
export class InfantryComponent extends CardComponent {

  constructor(){
    super();
    this.name = 'Infantry';
    this.points = 2;
    this.imageSrc = 'infantry.PNG';
  }


}
