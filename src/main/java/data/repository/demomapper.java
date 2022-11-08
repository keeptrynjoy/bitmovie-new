package data.repository;

import data.domain.demodto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface demomapper {
    public List<demodto> getall();
    public void insert(demodto dto);

    public void delete(int num);
}
