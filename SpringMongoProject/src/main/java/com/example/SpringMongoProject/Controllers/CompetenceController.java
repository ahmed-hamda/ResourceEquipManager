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

import com.example.SpringMongoProject.Entity.Competence;
import com.example.SpringMongoProject.Entity.Employe;
import com.example.SpringMongoProject.Services.CompetenceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/competences")
@CrossOrigin("*") // pour éviter les problèmes CORS
public class CompetenceController {

	@Autowired
    private CompetenceService competenceService;

    @PostMapping("/add")
    public ResponseEntity<?> createCompetence(@RequestBody @Valid Competence competence) {
        Competence saved = competenceService.createCompetence(competence);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllCompetences() {
    	List<Competence> competences = competenceService.getAllCompetences();
    	return ResponseEntity.ok(competences);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getCompetenceById(@PathVariable String id) {
        Competence competence = competenceService.getCompetenceById(id);
        return ResponseEntity.ok(competence);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCompetence(@PathVariable String id, @RequestBody @Valid Competence competenceDetails) {
        Competence updated = competenceService.updateCompetence(id, competenceDetails);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public void deleteCompetence(@PathVariable String id) {
         competenceService.deleteCompetence(id);
    }
}
