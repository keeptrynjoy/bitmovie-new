package data.service.movie;

import data.domain.movie.ScreenTime;
import data.repository.movie.ScreenTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScreenTimeService {

    @Autowired
    ScreenTimeRepository screenTimeRepository;

    public ScreenTime selectScrTimeByTheater(int theater_pk){
        return screenTimeRepository.selectScrTimeByTheater(theater_pk);
    };
    public ScreenTime selectScrTimeByScreen(int screen_pk){
        return screenTimeRepository.selectScrTimeByScreen(screen_pk);
    };
    public ScreenTime selectScrTimeByMovie(int movie_pk){
        return screenTimeRepository.selectScrTimeByMovie(movie_pk);
    };
    public void updateScrTimeByPk(ScreenTime screenTime){
        screenTimeRepository.updateScrTimeByPk(screenTime);
    };
    public void deleteScrTime(int scrtime_pk){
        screenTimeRepository.deleteScrTime(scrtime_pk);
    };
}
