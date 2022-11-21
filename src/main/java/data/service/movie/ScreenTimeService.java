package data.service.movie;

import data.domain.movie.JoinTime;
import data.domain.movie.ScreenTime;
import data.repository.movie.JoinTimeRepositroy;
import data.repository.movie.ScreenTimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ScreenTimeService {

    private final ScreenTimeRepository screenTimeRepository;
    private final JoinTimeRepositroy joinTimeRepositroy;

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

    public List<JoinTime> selectTimeByMovie(int movie_pk, String date) {
        Map<String, Object> map = new HashMap<>();
        map.put("movie_pk", movie_pk);
        map.put("date", date);
        return joinTimeRepositroy.selectTimeByMovie(map);
    }
}
