import { Component } from '@angular/core';
import {StarWarsListComponent} from "./star-wars-list/star-wars-list.component";

@Component({
  selector: 'app-star-wars',
  standalone: true,
  imports: [
    StarWarsListComponent
  ],
  templateUrl: './star-wars.component.html',
  styleUrl: './star-wars.component.scss'
})
export class StarWarsComponent {

}
