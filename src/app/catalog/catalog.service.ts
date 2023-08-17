import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { MovieResponse } from '../../common/interfaces/movie-response.interface';

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

  getMoviesWithLocal(page: number = 1) {
    const url = `${this.apiUrl}/info?page=${page}`;
    return this.http.get<MovieResponse>(url);
  }

  searchMovie(searchValue: string) {
    const url = `${this.apiUrl}/search?search=${searchValue}`;
    return this.http.get<MovieResponse>(url);
  }

  searchMovieWithLocal(searchValue: string) {
    const url = `${this.apiUrl}/search/info?search=${searchValue}`;
    return this.http.get<MovieResponse>(url);
  }

  rateMovie(id: number, rating: number) {
    const url = `${this.apiUrl}/rate`;
    return this.http.post(url, { id, rating });
  }

  likeMovie(id: number) {
    const url = `${this.apiUrl}/like`;
    return this.http.post(url, { id });
  }

  writeNoteAboutMovie(id: number, note: string) {
    const url = `${this.apiUrl}/note`;
    return this.http.post(url, { id, note });
  }
}
