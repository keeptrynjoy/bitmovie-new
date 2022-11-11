package data.controller;


import data.domain.Theater;
import data.service.TheaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/theater")
@RequiredArgsConstructor
public class TheaterController {

    private final TheaterService theaterService;

    /*   */
    @GetMapping("/")
    public ResponseEntity<List<Theater>> allTheNameResponse(){

        List<Theater> theater_list = theaterService.selectAllTheater();

        return new ResponseEntity<>(theater_list, HttpStatus.OK);
    }
}
