package com.example.SpringMongoProject.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.SpringMongoProject.Entity.Competence;

public interface CompetenceRepository extends MongoRepository<Competence, String> {
	
	Optional<Competence> findByNom(String nom);
}
