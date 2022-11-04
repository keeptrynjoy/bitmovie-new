package data.controller;

import data.dto.demodto;
import data.mapper.demomapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class demo {
    @Autowired
    demomapper demomapper;

    @GetMapping("select")
    public List<demodto> getall()
    {
        return demomapper.getall();
    }

    @PostMapping("insert")
    public void insert(demodto dto)
    {
        demomapper.insert(dto);
    }

}
