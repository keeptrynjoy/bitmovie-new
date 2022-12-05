package data.domain.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

import java.sql.Time;
import java.sql.Timestamp;

@Getter
@Setter
@Alias("Mypage")
public class MyPage {
    //예매 및 무비로그
    private String paytype;
    private int price;
    private int booknumber;
    private String theater;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private Timestamp issue;
    private String seat;
    private int adult;
    private int youth;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private Timestamp date;
    private Time begin;
    private Time endtime;
    private int movie_pk;
    private String screen;
    private String title;
    private String engtitle;
    private String grade;
    private String poster;
    //포인트
    private int user;
    private int in_decrease;
    private int inDePoint;
    private String history;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private Timestamp pDate;
    private int sumPoint;
}
