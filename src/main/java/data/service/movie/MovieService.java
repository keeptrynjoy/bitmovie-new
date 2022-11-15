package data.service.movie;

import data.domain.movie.Movie;
import data.repository.movie.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MovieService {


    private final MovieRepository movieRepository;

    public Movie selectMovieData(String movie_pk){
        return movieRepository.selectMovieData(movie_pk);
    }
}
