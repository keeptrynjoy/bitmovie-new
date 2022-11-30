package data.repository.user;

import data.domain.user.RevwClick;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReportRepository {

    public void insertReport(RevwClick revwClick);    // 평점 신고하기

    public void deleteReport(RevwClick revwClick);    // 평점 신고 취소하기

    public int selectReportYorN(RevwClick revwClick);    // 평점 신고 유무 확인


}
