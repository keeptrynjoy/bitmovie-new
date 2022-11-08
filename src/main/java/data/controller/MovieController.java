package data.controller;

import data.domain.Movie;
import data.domain.Person;
import data.service.MovieService;
import data.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class MovieController {

    @Autowired
    MovieService movieService;

    @Autowired
    PersonService personService;

    @GetMapping("/test")
    public void test(){
        int num = 1;
        Map<String, Object> map = new HashMap<>();


        Person person = personService.selectPersonData(num);
        System.out.println(person);
        System.out.println(person.getPer_name());


    }
    @GetMapping("/")
    public String home(){
        int num = 1;
        Map<String, Object> map = new HashMap<>();


        Person person = personService.selectPersonData(num);
        System.out.println(person);
        System.out.println(person.getPer_name());

        return "/";
    }

}
