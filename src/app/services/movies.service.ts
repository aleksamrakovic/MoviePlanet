import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  myApi: string;
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.myApi = 'd3e3fb04a0c1f1d2c62ab93ab6bb1e0a';
    this.baseUrl = 'https://api.themoviedb.org/3/';
  }

  getNowPlaying(page: number) {
    return this.http.get<any>(this.baseUrl + 'movie/now_playing?api_key=' + this.myApi + '&language=en-US&page=' + page);
  }

  getUpcoming(page: number) {
    return this.http.get<any>(this.baseUrl + 'movie/upcoming?api_key=' + this.myApi + '&language=en-US&page='  + page);
  }

  getPopular(page: number) {
    return this.http.get<any>(this.baseUrl + 'movie/popular?api_key=' + this.myApi + '&language=en-US&page='  + page);
  }

  getDetails(id) {
    return this.http.get<any>(this.baseUrl + 'movie/' + id + '?api_key=' + this.myApi + '&language=en-US')
  }

  getSimilar(id) {
    return this.http.get<any>(this.baseUrl + 'movie/' + id + '/similar?api_key=' + this.myApi + '&language=en-US&page=1')
  }

  getCredits(id) {
    return this.http.get<any>(this.baseUrl + 'movie/' + id + '/credits?api_key=' + this.myApi)
  }

  getTrailer(id) {
    return this.http.get<any>(this.baseUrl + 'movie/' + id + '/videos?api_key=' + this.myApi + '&language=en-Us')
  }


}
