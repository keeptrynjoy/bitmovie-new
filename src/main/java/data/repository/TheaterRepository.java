package data.repository;

import data.domain.Theater;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TheaterRepository {
    public List<Theater> selectAllTheater();
}
