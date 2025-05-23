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

import com.example.SpringMongoProject.Entity.Certification;
import com.example.SpringMongoProject.Services.CertificationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin("*") // pour éviter les problèmes CORS
public class CertificationController {

	@Autowired
    private CertificationService CertificationService;

    @PostMapping("/add")
    public ResponseEntity<?> createCertification(@RequestBody @Valid Certification Certification) {
        Certification saved = CertificationService.createCertification(Certification);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAllCertifications() {
    	List<Certification> Certifications = CertificationService.getAllCertifications();
    	return ResponseEntity.ok(Certifications);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getCertificationById(@PathVariable String id) {
        Certification Certification = CertificationService.getCertificationById(id);
        return ResponseEntity.ok(Certification);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCertification(@PathVariable String id, @RequestBody @Valid Certification CertificationDetails) {
        Certification updated = CertificationService.updateCertification(id, CertificationDetails);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public void deleteCertification(@PathVariable String id) {
         CertificationService.deleteCertification(id);
    }
}
