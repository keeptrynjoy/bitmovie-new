package data.domain.movie;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class JoinMovie {

    private int movie_pk;
    private String m_name;
    private String m_type;
    private String m_sdate;
    private String m_edate;
    private int m_runtime;
    private String m_age_grd;
    private String m_info;
    private String m_photo;
    private String m_enname;
    private String m_country;
    private int revw_avgstar;
    private int reserve_rate;
    private int wish_cnt;
    // 아래 두변수는 @JsonInclude(JsonInclude.Include.NON_EMPTY) 이 적용되면 안됨
    private String ing_or_not;  // 현재 상영중인지 여부 (상영중: ing, 상영전: before, 끝: after)
    private boolean mwhishYorN; // 현재 로그인한 user가 이 영화를 좋아요 눌렀는지 여부를 판단

}
