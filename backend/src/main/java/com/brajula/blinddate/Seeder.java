package com.brajula.blinddate;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // empty method doesnt compile, so empty message is printed.
        System.out.println("todo update seeder");
    }
}
