import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {forkJoin, of, Subject, takeUntil} from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { StarWarsService } from '../../../services/star-wars.service';
import {CommonModule} from "@angular/common";
import {TableSharedComponent} from "../../../shared/table-shared/table-shared.component";
import {CharacterDetail} from "../../../models/star-wars-detail.model";
import {FilmDetail, SpeciesDetail, StarshipDetail, VehicleDetail} from "../../../models/films-detail";


@Component({
  selector: 'app-star-wars-detail',
  standalone: true,
  templateUrl: './star-wars-detail.component.html',
  imports: [
    CommonModule,
    TableSharedComponent
  ],
  styleUrls: ['./star-wars-detail.component.scss']
})
export class StarWarsDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  character: CharacterDetail = {} as CharacterDetail;
  films: FilmDetail[] = [];
  species: string[] = [];
  vehicles: string[] = [];
  starships: string[] = [];
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private starWarsService: StarWarsService) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getCharacterDetail(id);
      }
    });
  }

  getCharacterDetail(id: string) {
    this.isLoading = true;
    this.starWarsService.getCharacterDetail(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(detail => {
      this.character = detail;
      this.fetchDetails();
    });
  }

  fetchDetails() {
    const filmRequests = this.character.films.length > 0
      ? forkJoin(this.character.films.map((url: string) => this.starWarsService.getDetailFromUrl<FilmDetail>(url))).pipe(
        mergeMap((films: FilmDetail[]) => {
          this.films = films;
          return forkJoin(
            films.map((film) =>
              forkJoin(
                film.characters.map((charUrl) => this.starWarsService.getDetailFromUrl<CharacterDetail>(charUrl).pipe(
                  map((char) => char.name)
                ))
              ).pipe(
                map((charNames) => ({ title: film.title, characters: charNames }))
              )
            )
          );
        })
      )
      : of([]);

    const speciesRequests = this.character.species.length > 0
      ? forkJoin(this.character.species.map(url => this.starWarsService.getDetailFromUrl<SpeciesDetail>(url)))
      : of([]);

    const vehiclesRequests = this.character.vehicles.length > 0
      ? forkJoin(this.character.vehicles.map(url => this.starWarsService.getDetailFromUrl<VehicleDetail>(url)))
      : of([]);

    const starshipsRequests = this.character.starships.length > 0
      ? forkJoin(this.character.starships.map(url => this.starWarsService.getDetailFromUrl<StarshipDetail>(url)))
      : of([]);

    forkJoin([filmRequests, speciesRequests, vehiclesRequests, starshipsRequests]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      ([filmsWithCharacters, speciesResults, vehiclesResults, starshipsResults]: [Array<{ title: string; characters: string[] }>, SpeciesDetail[], VehicleDetail[], StarshipDetail[]]) => {
        this.films = filmsWithCharacters;
        this.species = speciesResults.map(result => result.name);
        this.vehicles = vehiclesResults.map(result => result.name);
        this.starships = starshipsResults.map(result => result.name);
        this.isLoading = false;
      }
    );
  }

  getFormattedData(data: string[]): { name: string }[] {
    if (!data || data.length === 0) {
      return [{ name: 'Data is empty' }];
    }
    return data.map(name => ({ name }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
