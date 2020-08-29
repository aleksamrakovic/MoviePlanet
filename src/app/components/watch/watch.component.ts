import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  watchlist;

  constructor(private movieService: MoviesService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.watchlist = this.movieService.watchlist;
  }

  deleteItem(model, i) {
    console.log(model);
    
    var find = this.watchlist.find(el => el.id == model.id);
    console.log(find);
    
    if (find != undefined) {
      this.watchlist.splice(i, 1);
      this.movieService.setWatchlist(this.watchlist)
      this._snackBar.open('Movie has been removed from watchlist.', 'Close', { duration: 5000 });
    } 
  }

}
