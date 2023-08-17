import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { CatalogService } from './catalog.service';
import { Movie } from 'src/common/interfaces/movie.interface';
import { MovieResponse } from 'src/common/interfaces/movie-response.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CatalogComponent implements OnInit {
  public cols: number = 0;
  public imageUrl: string;
  public movies: Movie[];
  public movieToSearch: string;

  private _unsubscribeAll: Subject<void>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _catalogService: CatalogService,
  ) {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.cols = 2;
      } else {
        this.cols = 5;
      }
    });
    this.imageUrl = environment.imageUrl
    this.movies = [];
    this.movieToSearch = '';
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this._catalogService
      .getMovies()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: MovieResponse) => {
        this.movies = response.results;
      });
  }

  searchMovie() {
    this._catalogService
      .searchMovie(this.movieToSearch)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: MovieResponse) => {
        this.movies = response.results;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
