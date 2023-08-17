import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { CatalogService } from './catalog.service';
import { Movie } from 'src/common/interfaces/movie.interface';
import { MovieResponse } from 'src/common/interfaces/movie-response.interface';
import { environment } from 'src/environments/environment';
import { User } from 'src/common/interfaces/user.interface';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogData } from 'src/common/interfaces/dialog-data.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CatalogComponent implements OnInit {
  @Input() currentUser!: User;

  public cols: number = 0;
  public imageUrl: string;
  public movies: Movie[];
  public movieToSearch: string;

  private _unsubscribeAll: Subject<void>;

  constructor(
    private _catalogService: CatalogService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.imageUrl = environment.imageUrl
    this.movies = [];
    this.movieToSearch = '';
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    if (this.currentUser) {
      this._catalogService
        .getMoviesWithLocal()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response: MovieResponse) => {
          this.movies = response.results;
        });
    } else {
      this._catalogService
        .getMovies()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response: MovieResponse) => {
          this.movies = response.results;
        });
    }
  }

  searchMovie() {
    if (this.currentUser) {
      this._catalogService
        .searchMovieWithLocal(this.movieToSearch)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response: MovieResponse) => {
          this.movies = response.results;
        });
    } else {
      this._catalogService
        .searchMovie(this.movieToSearch)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response: MovieResponse) => {
          this.movies = response.results;
        });
    }
  }

  likeMovie(id: number) {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }

    this._catalogService
      .likeMovie(id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        const icon = document.getElementById(`movie-like-${id}`);
        if (res.status === 'ACTIVE') {
          icon?.classList.add('like');
        } else {
          icon?.classList.remove('like');
        }

        this.getMovies();
      });
  }

  rateMovie(id: number, rating: number) {
    this._catalogService
      .rateMovie(id, rating)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.getMovies();
      });
  }

  writeANoteAboutMovie(id: number, note: string) {
    this._catalogService
      .writeNoteAboutMovie(id, note)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.getMovies();
      });
  }

  openDialog(rating: number, note: string, movieId: number): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const dialogRef = this.dialog.open(DialogComponent, {
      data: { rating, note },
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result?.rating) {
        this.rateMovie(movieId, result.rating);
      }

      if (result?.note) {
        this.writeANoteAboutMovie(movieId, result.note);
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
