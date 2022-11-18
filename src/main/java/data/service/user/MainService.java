package data.service.user;

import data.domain.movie.JoinRevw;
import data.repository.movie.JoinRevwRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {

    private final JoinRevwRepository joinRevwRepository;

    // 가장 최신 등록된 평점을 'count'갯수 만큼 반환
    public List<JoinRevw> selectRecentRevw(int count) {
        return joinRevwRepository.selectRecentRevw(count);
    }
}
