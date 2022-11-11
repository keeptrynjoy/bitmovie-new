package data.controller.movie;

import data.domain.movie.ScreenTime;
import data.service.movie.ScreenTimeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/screentime")
@RequiredArgsConstructor
@Slf4j
public class ScreenTimeController {

    private final ScreenTimeService screenTimeService;

    @GetMapping("/test")
    public ResponseEntity<ScreenTime> screenTimeByMovie(@RequestParam int movie){

        ScreenTime screenTime=screenTimeService.selectScrTimeByMovie(movie);

        return new ResponseEntity<>(screenTime,HttpStatus.OK);
    }
}
