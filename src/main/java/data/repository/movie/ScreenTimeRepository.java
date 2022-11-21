package data.repository.movie;

import data.domain.movie.JoinTime;
import data.domain.movie.ScreenTime;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ScreenTimeRepository {
    public ScreenTime selectScrTimeByTheater(int theater_pk);
    public ScreenTime selectScrTimeByScreen(int screen_pk);
    public ScreenTime selectScrTimeByMovie(int movie_pk);
    public void updateScrTimeByPk(ScreenTime screenTime);
    public void deleteScrTime(int scrtime_pk);


}
