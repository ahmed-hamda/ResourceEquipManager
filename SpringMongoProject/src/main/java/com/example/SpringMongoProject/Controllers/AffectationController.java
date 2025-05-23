package com.example.SpringMongoProject.Controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.SpringMongoProject.Entity.Affectation;
import com.example.SpringMongoProject.Entity.Certification;
import com.example.SpringMongoProject.Entity.Employe;
import com.example.SpringMongoProject.Entity.Equipement;
import com.example.SpringMongoProject.Services.AffectationService;

@RestController
@RequestMapping("/api/affectations")
@CrossOrigin("*")
public class AffectationController {

    @Autowired
    private AffectationService affectationService;

    @PostMapping("/add")
    public ResponseEntity<Affectation> createAffectation(@RequestBody Affectation affectation) {
        Affectation created = affectationService.createAffectation(affectation);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<?> getAllAffectations() {
    	List<Affectation> affectations = affectationService.getAllAffectations();
    	return ResponseEntity.ok(affectations);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getAffectationById(@PathVariable String id) {
        Affectation affectation = affectationService.getAffectationById(id);
        return ResponseEntity.ok(affectation);
    }
    
    @GetMapping("/employes-compatibles/{equipementId}")
    public ResponseEntity<?> getEmployesCompatibles(@PathVariable String equipementId) {
       
         List<Employe> employescompatibles = affectationService.getEmployesCompatiblesPourEquipement(equipementId);
         return ResponseEntity.ok(employescompatibles);
    }

    @GetMapping("/equipements-compatibles/{employeId}")
    public ResponseEntity<List<Equipement>> getEquipementsCompatibles(@PathVariable String employeId) {
        List<Equipement> equipementsCompatibles = affectationService.getEquipementsCompatiblesPourEmploye(employeId);
        return ResponseEntity.ok(equipementsCompatibles);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Affectation> updateAffectation(
    		@PathVariable String id, 
    		@RequestBody Affectation updatedAffectation) {
            Affectation affectation = affectationService.updateAffectation(id, updatedAffectation);
            return ResponseEntity.ok(affectation);
        
    }

    
    @DeleteMapping("/{id}")
    public void deleteAffectation(@PathVariable String id) {
         affectationService.deleteAffectation(id);
    }
    
    @GetMapping("/affectationById/{employeId}")
    public ResponseEntity<List<Affectation>> getAffectationsByEmploye(@PathVariable String employeId) {
        List<Affectation> affectations = affectationService.getAffectationsByEmployeId(employeId);
        return ResponseEntity.ok(affectations);
    }
    
}

