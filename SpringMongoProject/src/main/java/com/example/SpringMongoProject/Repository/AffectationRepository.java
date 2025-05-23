package com.example.SpringMongoProject.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.SpringMongoProject.Entity.Affectation;
import com.example.SpringMongoProject.Entity.Employe;

public interface AffectationRepository extends MongoRepository<Affectation, String> {
	
    List<Affectation> findByEmploye(Employe employe);
    void deleteByEmploye_Id(String employeId);
    List<Affectation> findByEquipement_Id(String equipementId);
    List<Affectation> findByEmploye_Id(String employeid);

}
