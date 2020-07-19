import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';

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

  constructor(private route: ActivatedRoute, private movieService: MoviesService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    
    if (JSON.parse(localStorage.getItem('watchlist'))) {
      this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
    } else {
      this.watchlist = [];
    }
    
    this.route.params.subscribe(
      res => {
        this.movieId = res.id;

        let res1 = this.getDetails(this.movieId);
        let res2 = this.getActors(this.movieId);
        let res3 = this.getSimilar(this.movieId);
        let res4 = this.getTrailer(this.movieId);

        forkJoin(res1,res2,res3,res4).subscribe(results => {
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

  getDetails(id):Observable<any> {
    return this.movieService.getDetails(id)
  }

  getActors(id):Observable<any> {
    return this.movieService.getCredits(id)
  }

  getSimilar(id):Observable<any> {
    return this.movieService.getSimilar(id)
  }

  getTrailer(id):Observable<any> {
    return this.movieService.getTrailer(id)
  }

  addToWatchlist(model) {
    console.log(model);
    
    console.log(this.watchlist);
    
    var index = this.watchlist.indexOf(model);
    if (index != -1) {
      alert('Movie is already in the watchlist')
    } else {
      this.watchlist.push(model);
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    }
  }

}
