import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { MovieResponse } from 'src/common/interfaces/movie-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  public apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/catalog`;
  }

  getMovies(page: number = 1) {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<MovieResponse>(url);
  }

  searchMovie(searchValue: string) {
    const url = `${this.apiUrl}/search?search=${searchValue}`;
    return this.http.get<MovieResponse>(url);
  }

  rateMovie() {}

  likeMovie() {}

  writeNoteAboutMovie() {}
}
