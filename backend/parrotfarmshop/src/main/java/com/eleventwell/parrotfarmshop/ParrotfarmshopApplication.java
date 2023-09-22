package com.eleventwell.parrotfarmshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class ParrotfarmshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(ParrotfarmshopApplication.class, args);
	}

}
