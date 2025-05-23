package com.example.SpringMongoProject.Controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringMongoProject.AuthRequest;
import com.example.SpringMongoProject.AuthResponse;
import com.example.SpringMongoProject.JwtUtil;
import com.example.SpringMongoProject.Entity.Employe;
import com.example.SpringMongoProject.Services.EmployeService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")

public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    
    @Autowired
    private EmployeService employeService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        // Récupérer l'utilisateur depuis la base de données
        Employe employe = employeService.findByName(request.getUsername());

        if (employe == null || !passwordEncoder.matches(request.getPassword(), employe.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        // Créer manuellement un UserDetails pour le JWT
        UserDetails userDetails = org.springframework.security.core.userdetails.User
            .withUsername(employe.getNom())
            .password(employe.getPassword())
            .authorities("ROLE_" + employe.getRole())
            .build();

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", employe.getRole()); // Ajoute le rôle dans les claims
        claims.put("id", employe.getId());
        String token = jwtUtil.createToken(claims, employe.getNom());
        // Générer le JWT

        return ResponseEntity.ok(new AuthResponse(token));
    }


}

