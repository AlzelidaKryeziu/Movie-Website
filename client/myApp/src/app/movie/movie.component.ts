import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  constructor(private route: Router, private moviesService: MoviesService) {}
  user: any;
  movies: any;
  hideContent = false;

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    token = JSON.parse(token as string);
    this.user = token;

  console.log(this.route.url);

    if(this.route.url.includes('details')){
    this.hideContent = true;
  }
    this.moviesService.getMovies().subscribe(
      (data)=>{
        console.log(data);
        this.movies = data;
      },
      (err) => {console.log(err)}
    )
  }


  movieDetails(id:number){
    console.log(id);
    window.open(`dashboard/details/${id}`, '_blank');
  }

  
}
