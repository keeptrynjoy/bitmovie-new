package data.service.user;

import data.repository.user.PointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointRepository;

    public int selectPointByUser(int user_pk){
        return pointRepository.selectPointByUser(user_pk);
    }
}
