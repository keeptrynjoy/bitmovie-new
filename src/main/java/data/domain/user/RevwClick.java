package data.domain.user;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
public class RevwClick {
    // 평점 좋아요 & 평점 싫어요에 사용
    private int user_pk;
    private int review_pk;
}
