package com.example.SpringMongoProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages={"com.example.SpringMongoProject","com.example.SpringMongoProject.Respository","com.example.SpringMongoProject.Controllers","com.example.SpringMongoProject.Services","com.example.SpringMongoProject.Controllers","com.example.SpringMongoProject.Errors"})

public class SpringMongoProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringMongoProjectApplication.class, args);
	}

}
