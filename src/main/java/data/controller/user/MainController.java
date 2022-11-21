package data.controller.user;

import data.domain.movie.JoinRevw;
import data.service.user.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/main")
public class MainController {

    private final MainService mainService;


    // 가장 최신 등록된 평점을 'count'갯수 만큼 반환
    @GetMapping("/selectRecentRevw")
    public List<JoinRevw> selectRecentRevw(@RequestParam(defaultValue = "10") int count) {
        List<JoinRevw> joinRevws = mainService.selectRecentRevw(count);
        System.out.println(joinRevws);
        return joinRevws;
    }

    // 검색 기능
    @GetMapping("search")
    public Map<String,Object> search(String search){
        return mainService.selectSearchData(search);
    }



}
