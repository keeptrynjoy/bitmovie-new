package data.domain.movie;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class JoinRevw {

    private int review_pk;
    private int movie_pk;
    private int user_pk;
    private String revw_star;
    private String revw_text;
    private int count_like;
    private int count_report;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private Timestamp revw_date;


}
