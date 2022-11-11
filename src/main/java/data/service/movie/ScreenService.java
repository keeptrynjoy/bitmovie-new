package data.service.movie;

import data.repository.MovieRepository;
import data.repository.ScreenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScreenService {

    @Autowired
    ScreenRepository screenRepository;
}
