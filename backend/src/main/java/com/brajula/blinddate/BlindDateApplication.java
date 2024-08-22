package com.brajula.blinddate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

@SpringBootApplication
@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
public class BlindDateApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(BlindDateApplication.class);
        app.setBanner(new CustomBanner());
        app.run(args);
    }
}
