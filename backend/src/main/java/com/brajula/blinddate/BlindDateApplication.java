package com.brajula.blinddate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BlindDateApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(BlindDateApplication.class);
        app.setBanner(new CustomBanner());
        app.run(args);
    }
}
