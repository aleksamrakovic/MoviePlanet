import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { NgxSpinnerService } from 'ngx-spinner';


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

  constructor(private movieService: MoviesService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.movieService.getPopular(1).subscribe(
        res => {
          console.log(res);
          this.totalPopular = res.total_results;
          this.popular = res.results;
          this.spinner.hide();
        }
      )
    }, 1500)


    this.movieService.getGenres().subscribe(
      (res: any) => {
        console.log(res);
        this.genres = res.genres;
      }
    )

  }


  changePage(event) {
    this.spinner.show();
    console.log(event);
    
    this.movieService.getPopular(event.pageIndex + 1).subscribe(
      res => {
        console.log(res);
        this.popular = res.results;
        this.spinner.hide();
      }
    )
  }

  selectGenre(genre) {
    console.log(genre);
    let vm = this;
    setTimeout(function() {
      genre.selected = !genre.selected
    },10);
  }

}
