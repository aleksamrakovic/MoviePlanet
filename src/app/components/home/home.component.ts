import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nowPlaying: any[] = [];
  upcoming: any[] = [];
  popular: any[] = [];

  constructor(private movieService: MoviesService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.movieService.getTopRated(1).subscribe(
      res => {
        console.log(res);
        this.nowPlaying = res.results;

        this.movieService.getUpcoming(1).subscribe(
          res => {
            this.upcoming = res.results;

            this.movieService.getPopular(1).subscribe(
              res => {
                this.popular = res.results;
                this.spinner.hide();
              }
            )
          }
        )
        
      }
    )

    

    
  }

}
