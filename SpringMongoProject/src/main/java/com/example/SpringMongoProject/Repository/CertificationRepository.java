package com.example.SpringMongoProject.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.SpringMongoProject.Entity.Certification;

public interface CertificationRepository extends MongoRepository<Certification, String> {

	Optional<Certification> findByNom(String nom);

}
