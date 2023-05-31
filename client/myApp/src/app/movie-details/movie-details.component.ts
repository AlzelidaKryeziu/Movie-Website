import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private movieService: MoviesService,
   private route: Router
    
    
  ) {}

  movieDetails: any;

  ngOnInit(): void {
    this.router.params.subscribe((data) => {
      console.log(data);
      this.movieService.getMovieDetails(data['id']).subscribe(
        (data) => {
          console.log(data);
          this.movieDetails = data;
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
