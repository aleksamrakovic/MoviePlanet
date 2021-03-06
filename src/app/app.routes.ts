import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movie/movie.component';
import { WatchComponent } from './components/watch/watch.component';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'all-movies', component: MoviesComponent},
    { path: 'movie/:id', component: MovieComponent },
    { path: 'watchlist', component: WatchComponent},
    { path: 'search', component: SearchComponent},
    { path: 'about', component: AboutComponent }
  ];