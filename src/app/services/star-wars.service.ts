import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, of } from 'rxjs';
import { shareReplay, catchError, debounceTime } from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  private apiUrl = environment.apiUrl;
  private cache: { [url: string]: ReplaySubject<any> } = {};

  constructor(private http: HttpClient) {}

  getAllStarWars(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/people/`).pipe(
      debounceTime(100),
      shareReplay(1),
      catchError(this.handleError<any>('getAllStarWars'))
    );
  }

  getCharacterDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/people/${id}/`).pipe(
      debounceTime(100),
      shareReplay(1),
      catchError(this.handleError<any>('getCharacterDetail'))
    );
  }

  getDetailFromUrl<T>(url: string): Observable<T> {
    if (!this.cache[url]) {
      this.cache[url] = new ReplaySubject(1);
      this.http.get<T>(url).pipe(
        shareReplay(1),
        catchError(this.handleError<T>(`getDetailFromUrl url=${url}`))
      ).subscribe(this.cache[url]);
    }
    return this.cache[url].asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
