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

import com.example.SpringMongoProject.Entity.Tache;
import com.example.SpringMongoProject.Services.TacheService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/taches")
@CrossOrigin("*") // pour éviter les problèmes CORS
public class TacheController {

	@Autowired
    private TacheService TacheService;

    @PostMapping("/add")
    public ResponseEntity<?> createTache(@RequestBody @Valid Tache Tache) {
        Tache saved = TacheService.createTache(Tache);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllTaches() {
    	List<Tache> Taches = TacheService.getAllTaches();
    	return ResponseEntity.ok(Taches);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getTacheById(@PathVariable String id) {
        Tache Tache = TacheService.getTacheById(id);
        return ResponseEntity.ok(Tache);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTache(@PathVariable String id, @RequestBody @Valid Tache TacheDetails) {
        Tache updated = TacheService.updateTache(id, TacheDetails);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public void deleteTache(@PathVariable String id) {
         TacheService.deleteTache(id);
    }
}
