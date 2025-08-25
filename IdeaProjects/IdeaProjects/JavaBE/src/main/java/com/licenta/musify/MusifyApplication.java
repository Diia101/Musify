package com.licenta.musify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class MusifyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MusifyApplication.class, args);
    }

}
