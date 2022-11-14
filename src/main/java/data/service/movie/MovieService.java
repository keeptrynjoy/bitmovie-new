package data.service.movie;

import data.domain.movie.Movie;
import data.repository.movie.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

    @Autowired
    MovieRepository movieRepository;

    public Movie selectMovieData(String movie_pk){
        return movieRepository.selectMovieData(movie_pk);
    }
}
