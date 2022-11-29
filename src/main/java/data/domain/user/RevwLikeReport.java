package data.domain.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RevwLikeReport {
    // 평점 좋아요 & 평점 싫어요에 사용
    private int user_pk;
    private int review_pk;
}
