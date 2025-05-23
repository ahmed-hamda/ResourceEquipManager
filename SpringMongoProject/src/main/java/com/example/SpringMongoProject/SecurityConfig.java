package com.example.SpringMongoProject;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.SpringMongoProject.Services.EmployeService;



@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtRequestFilter; // Le filtre pour valider le JWT

    @Autowired
    private EmployeService employeService ;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
            	    .requestMatchers("/api/auth/**").permitAll()
            	    .requestMatchers("/api/employes/**").hasRole("ADMIN")
            	    .requestMatchers("/api/equipements/**").hasRole("ADMIN")
            	    .requestMatchers("/api/competences/**").hasRole("ADMIN")
            	    .requestMatchers("/api/certifications/**").hasRole("ADMIN")
            	    .requestMatchers("/api/taches/**").hasRole("ADMIN")
            	    .requestMatchers("/api/affectations/affectationById/{employeId}").hasRole("USER")
            	    .requestMatchers("/api/affectations/{id}").hasAnyRole("ADMIN","USER")
            	    .requestMatchers("/api/affectations/**").hasRole("ADMIN")
            	    .anyRequest().authenticated()
            	)
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
            .userDetailsService(employeService)
            ; 

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Pour encoder les mots de passe
    }
    
}


