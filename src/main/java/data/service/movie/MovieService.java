package data.service.movie;

import data.domain.movie.JoinMovie;
import data.domain.movie.Movie;
import data.repository.movie.JoinMovieRepository;
import data.repository.movie.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MovieService {


    private final MovieRepository movieRepository;
    private final JoinMovieRepository joinMovieRepository;

    public Movie selectMovieData(String movie_pk){
        return movieRepository.selectMovieData(movie_pk);
    }

    public List<JoinMovie> selectMovieList(Map<String,String> map) {
        return joinMovieRepository.selectMovieList(map);
    }
}
