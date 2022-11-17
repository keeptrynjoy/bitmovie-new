package data.repository.user;

import data.domain.user.Report;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReportRepository {

    public void insertReport(Report report);    // 평점 신고하기

    public void deleteReport(Report report);    // 평점 신고 취소하기


}
