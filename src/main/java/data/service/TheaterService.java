package data.service;

import data.domain.Theater;
import data.repository.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TheaterService {

    @Autowired
    TheaterRepository theaterMapper;

    public List<Theater> selectAllTheater(){
        return theaterMapper.selectAllTheater();
    };
}
