package com.example.bitmovie;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling //스케줄링 기능 활성화
@ComponentScan({"data.*"})
@MapperScan({"data.*"})
public class BitmovieApplication {

    public static void main(String[] args) {
        SpringApplication.run(BitmovieApplication.class, args);
    }

}
