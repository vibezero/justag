import { Component, OnInit, Input } from '@angular/core';

import { MovieService } from '../../movie.service';

@Component({
  selector: 'app-movie-list-entry',
  templateUrl: './movie-list-entry.component.html',
  styleUrls: ['./movie-list-entry.component.css']
})
export class MovieListEntryComponent implements OnInit {
  @Input() movie: Movie;  
  poster: string;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getPoster(this.movie.poster_path);    
  }

  getPoster(link: string) {
    this.movieService.fetchPoster(link).subscribe(
      (data: string) => {
        this.poster = data;
      },

      (err: string) => {
        this.poster = '/assets/icons/icons8-popcorn-time.png';
        console.log(err);
      }
    );
  }

  updateUrl(title) {
    let result = '';

    for (let i = 0; i < title.length; i++) {
      if (result[result.length - 1] === ':') {
        result += title[i].match(/\s/) ? '' : title[i].toLowerCase();
      } else {
        result += title[i].match(/\s/) ? '-' : title[i].toLowerCase();
      }
    }

    return result;
  }

}

interface Movie {
  vote_count: number,
  id: number,
  video: boolean,
  title: string,
  popularity: number,
  poster_path: string,
  original_language: string,
  original_title: string,
  genre_ids: number[],
  backdrop_path: string,
  adult: boolean,
  overview: string,
  release_date: string,
}