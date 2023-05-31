import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}
  getMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/popular?api_key=82e309254331f8d8f952fabdb0d32305&language=en-US&page=2'
    );
  }
  getMovieDetails(id: number) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=82e309254331f8d8f952fabdb0d32305&language=en-US`
    );
  }
}