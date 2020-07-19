import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  watchlist: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
  }

}
