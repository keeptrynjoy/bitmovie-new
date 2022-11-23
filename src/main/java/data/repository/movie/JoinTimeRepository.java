package data.repository.movie;

import data.domain.movie.JoinTime;
import data.domain.movie.ScreenTime;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface JoinTimeRepository {

    public List<JoinTime> selectTimeByMovie(Map<String, Object> map);     //영화 페이지에서 상영 시간표 출력

    public List<JoinTime> selectTimeByClick(Map<String, Object> map);       // 영화 상영 시간표 테스트중

    public List<JoinTime> testMovieTime(Map<String, Object> map);           // 테스트 중

    public List<JoinTime> selectScrtFirstInfo(ScreenTime screenTime);

    public List<Map<String,Object>> selectTimeByMovieTest(Map<String, Object> map);
}
