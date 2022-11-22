package data.domain.movie;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class JoinTime {
    private int screen_pk;      // screentime - 상영시간표 고유키
    private int movie_pk;       // screentime - 영화 고유키
    private Date scrt_date;     // screentime - 상영 날짜
    private Time scrt_stime;    // screentime - 상영시작시간
    private Time scrt_etime;    // screentime - 상영종료시간
    private String scr_name;    // screen - 상영관 명
    private String seat_plot;   // screen - 좌석 배치 타입
    private int scr_tot_seat;   // screen - 상영관의 총 좌석수
    private String the_name;    // theater - 극장명
    private int booked;         // booking - 예매된 좌석 수
    private String m_name;      // movie - 영화명
    private String m_age_grd;   // movie - 나이
    private List<ScreenTime> scrt_detail; // screentime - 데이터배열
}
