package data.controller.movie;

import data.domain.movie.Movie;
import data.domain.movie.Person;
import data.service.movie.MovieService;
import data.service.movie.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/movie")
@CrossOrigin
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    private final PersonService personService;



    //    @GetMapping("/test")
//    public void test(){
//        int num = 1;
//        Map<String, Object> map = new HashMap<>();
//
//        Person person = personService.selectPersonData(num);
//        System.out.println(person);
//        System.out.println(person.getPer_name());
//
//    }
//    @GetMapping("/")
//    public String home(){
//        int num = 1;
//        Map<String, Object> map = new HashMap<>();
//
//
//        Person person = personService.selectPersonData(num);
//        System.out.println(person);
//        System.out.println(person.getPer_name());
//
//        return "/";
//    }
    @GetMapping("/selectMovieData")
    public Movie selectMovieData(@RequestParam String movie_pk) {
        return movieService.selectMovieData(movie_pk);
    }


}
