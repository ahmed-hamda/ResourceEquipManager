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

import com.example.SpringMongoProject.Entity.Employe;
import com.example.SpringMongoProject.Services.EmployeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employes")
@CrossOrigin("*") // pour éviter les problèmes CORS
public class EmployeController {

    @Autowired
    private EmployeService employeService;

    @PostMapping("/add")
    public ResponseEntity<?> createEmploye(@RequestBody @Valid Employe employe) {
        Employe saved = employeService.createEmploye(employe);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<?> getAllEmployes() {
    	List<Employe> employes = employeService.getAllEmployes();
    	return ResponseEntity.ok(employes);
    }
    
    @GetMapping("/employes-sans-affectation")
    public ResponseEntity<List<Employe>> getEmployesSansAffectation() {
        List<Employe> employesSansAffectation = employeService.getEmployesSansAffectation();
        return ResponseEntity.ok(employesSansAffectation);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeById(@PathVariable String id) {
        Employe employe = employeService.getEmployeById(id);
        return ResponseEntity.ok(employe);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmploye(@PathVariable String id, @RequestBody @Valid Employe employeDetails) {
        Employe updated = employeService.updateEmploye(id, employeDetails);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public void deleteEmploye(@PathVariable String id) {
         employeService.deleteEmploye(id);
    }
    
}
