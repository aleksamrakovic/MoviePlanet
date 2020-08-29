import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  nowPlaying: any[] = [];
  upcoming: any[] = [];
  popular: any[] = [];
  totalNowPlaying: any;
  totalPopular: any;
  totalUpcoming: any;
  genres: any[] = [];

  selectedGenre;

  constructor(private movieService: MoviesService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.movieService.getGenres().subscribe(
      (res: any) => {
        console.log(res);
        this.genres = res.genres;
        this.selectedGenre = this.genres[0];

        this.movieService.getMoviesByGenre(this.selectedGenre.id.toString(), 1).subscribe(
          res => {
            console.log(res);
            
            this.totalPopular = res.total_results;
            this.popular = res.results;
            this.spinner.hide();
          }
        )
      }
    )
    
  }


  changePage(event) {
    this.spinner.show();

    this.movieService.getMoviesByGenre(this.selectedGenre.id, event.pageIndex + 1).subscribe(
      res => {
        console.log(res);
        this.spinner.hide();
        this.popular = res.results;
        this.totalPopular = res.total_results;
      }
    )
  }

  selectGenre(genre) {
    this.selectedGenre = genre;
    this.movieService.getMoviesByGenre(this.selectedGenre.id, 1).subscribe(
      res => {
        console.log(res);
        this.popular = res.results;
        this.totalPopular = res.total_results;
      }
    )
  }

}
