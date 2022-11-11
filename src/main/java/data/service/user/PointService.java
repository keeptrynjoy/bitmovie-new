package data.service.user;

import data.repository.BookingRepository;
import data.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointRepository;

    public int selectPointByUser(int user_pk){
        return pointRepository.selectPointByUser(user_pk);
    }
}
