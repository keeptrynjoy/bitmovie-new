package data.repository;

import data.domain.ScreenTime;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ScreenTimeRepository {
    public ScreenTime selectScrTimeByTheater(int theater_pk);
    public ScreenTime selectScrTimeByScreen(int screen_pk);
    public ScreenTime selectScrTimeByMovie(int movie_pk);
    public void updateScrTimeByPk(ScreenTime screenTime);
    public void deleteScrTime(int scrtime_pk);
}
