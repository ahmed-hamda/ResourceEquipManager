package com.example.SpringMongoProject.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.SpringMongoProject.Entity.Equipement;

public interface EquipementRepository extends MongoRepository<Equipement, String>{

}
