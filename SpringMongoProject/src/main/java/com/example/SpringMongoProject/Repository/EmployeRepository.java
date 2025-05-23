package com.example.SpringMongoProject.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.SpringMongoProject.Entity.Employe;

public interface EmployeRepository  extends MongoRepository<Employe, String> {

	Optional<Employe> findByNom(String nom);
}
