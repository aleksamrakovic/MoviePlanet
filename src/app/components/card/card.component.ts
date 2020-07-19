import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public model: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  seeMovie(id) {
    this.router.navigate(['/movie/' + id])
  }

}
