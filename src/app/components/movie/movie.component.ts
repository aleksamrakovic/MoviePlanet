import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { element } from 'protractor';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieId: string;
  model: any;
  similar: any[] = [];
  cast: any[] = [];
  trailer: any;
  watchlist: any[] = [];

  constructor(private route: ActivatedRoute, private movieService: MoviesService, private spinner: NgxSpinnerService, private _snackBar: MatSnackBar, private location: Location) { }

  ngOnInit(): void {
    this.spinner.show();

    this.watchlist = this.movieService.watchlist;

    this.route.params.subscribe(
      res => {
        this.movieId = res.id;

        let res1 = this.getDetails(this.movieId);
        let res2 = this.getActors(this.movieId);
        let res3 = this.getSimilar(this.movieId);
        let res4 = this.getTrailer(this.movieId);

        forkJoin(res1, res2, res3, res4).subscribe(results => {
          console.log(results);
          this.model = results[0];
          this.cast = results[1].cast;
          this.similar = results[2].results;
          this.trailer = results[3].results[0];

          this.spinner.hide();
        });
      }
    );
  }

  getDetails(id): Observable<any> {
    return this.movieService.getDetails(id)
  }

  getActors(id): Observable<any> {
    return this.movieService.getCredits(id)
  }

  getSimilar(id): Observable<any> {
    return this.movieService.getSimilar(id)
  }

  getTrailer(id): Observable<any> {
    return this.movieService.getTrailer(id)
  }

  addToWatchlist(model) {
    var item = model;

    var find = this.watchlist.find(el => el.id == model.id);
    console.log(find);
    
    if (find == undefined) {
      this.watchlist.push(item);
      this.movieService.setWatchlist(this.watchlist);
      this._snackBar.open('Movie has been added to your watchlist', 'Close', { duration: 5000 });
    } else {
      this._snackBar.open('Movie is already in your watchlist', 'Close', { duration: 5000 });
    }
  }


  goBack() {
    this.location.back();
  }

}
