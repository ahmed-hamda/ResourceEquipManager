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

import com.example.SpringMongoProject.Entity.Equipement;
import com.example.SpringMongoProject.Services.EquipementService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/equipements")
@CrossOrigin("*") // pour éviter les problèmes CORS
public class EquipementController {
	
	@Autowired
    private EquipementService equipementService;

    @PostMapping("/add")
    public ResponseEntity<?> createEquipement(@RequestBody @Valid Equipement equipement) {
        Equipement saved = equipementService.createEquipement(equipement);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllEquipements() {
    	List<Equipement> equipements = equipementService.getAllEquipement();
    	return ResponseEntity.ok(equipements);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getEquipementById(@PathVariable String id) {
        Equipement equipement = equipementService.getEquipementById(id);
        return ResponseEntity.ok(equipement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEquipement(@PathVariable String id, @RequestBody @Valid Equipement equipementDetails) {
        Equipement updated = equipementService.updateEquipement(id, equipementDetails);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public void deleteEquipement(@PathVariable String id) {
         equipementService.deleteEquipement(id);
    }

}
