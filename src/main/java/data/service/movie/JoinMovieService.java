package data.service.movie;

import data.repository.movie.JoinMovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JoinMovieService {

    private final JoinMovieRepository joinMovieRepository;

}
