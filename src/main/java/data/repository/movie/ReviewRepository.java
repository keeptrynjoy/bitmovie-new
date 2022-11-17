package data.repository.movie;

import data.domain.movie.Review;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface ReviewRepository {

    public void insertReview(Review review);

    public void updateReview(Review review);

    public void deleteReview(String reviw_pk);
}
