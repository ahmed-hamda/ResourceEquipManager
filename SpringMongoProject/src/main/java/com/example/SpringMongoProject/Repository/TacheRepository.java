package com.example.SpringMongoProject.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.SpringMongoProject.Entity.Tache;

public interface TacheRepository extends MongoRepository<Tache, String>{

}
