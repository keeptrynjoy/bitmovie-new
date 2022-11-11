package data.controller;

import data.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/booking")
public class BookingController {

    private final PointService pointService;

//    @GetMapping("/userpoint")
//    public ResponseEntity<Integer>

}
