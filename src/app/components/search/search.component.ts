import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchRes: any[] = [];

  constructor(private movieService: MoviesService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
  }

  searchMovie(query: string) {
    this.spinner.show();
    console.log(query);
    
    this.movieService.searchMovie(query).subscribe(
      res => {
        console.log(res);
        this.searchRes = res.results;
        this.spinner.hide();
      }
    )
  }

}
