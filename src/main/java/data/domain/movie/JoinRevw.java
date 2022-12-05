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
    private String m_name;
    private int user_pk;
    private String revw_star;
    private String revw_text;
    private int count_like;
    private int count_report;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private Timestamp revw_date;
    private boolean likeYorN;       //user 가 해당 글에 좋아요를 눌렀는지 여부를 판단 (좋아요: t, 좋아요 안함:f)


}
