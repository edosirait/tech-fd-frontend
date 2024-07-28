import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {StarWarsService} from "../../../services/star-wars.service";
import {GlobalResponseModel} from "../../../models/global-response.model";
import {CharacterDetail} from "../../../models/star-wars-detail.model";
import {TableSharedComponent} from "../../../shared/table-shared/table-shared.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-star-wars-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    TableSharedComponent
  ],
  templateUrl: './star-wars-list.component.html',
  styleUrls: ['./star-wars-list.component.scss']
})
export class StarWarsListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  starWars: CharacterDetail[] = [];

  constructor(private starWarsService: StarWarsService, private router: Router) {
  }

  ngOnInit() {
    this.getStarWarsList();
  }

  getStarWarsList() {
    this.starWarsService.getAllStarWars().pipe(
      takeUntil(this.destroy$))
      .subscribe((val: GlobalResponseModel<CharacterDetail[]>) => {
        this.starWars = val.results;
      });
  }

  getFormattedStarWars() {
    return this.starWars.map(character => ({
      name: character.name,
      id: character.url?.split('/').filter(Boolean).pop()
    }));
  }

  onDetail(character: { name: string; id: string }) {
    this.router.navigate(['/star-wars-detail', character.id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
