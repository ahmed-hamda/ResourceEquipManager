package com.example.SpringMongoProject;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.SpringMongoProject.Entity.Employe;
import com.example.SpringMongoProject.Services.EmployeService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
	@Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmployeService employeService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();

        String jwt = extractJwtFromRequest(request);
        if (jwt != null && jwtUtil.validateToken(jwt)) {
            String username = jwtUtil.extractUsername(jwt);

            if (username != null) {
                // Trouver l'utilisateur dans la base de données
            	Employe employe = employeService.findByName(username);
            	if (employe != null) {
            	    UserDetails userDetails = org.springframework.security.core.userdetails.User
            	        .withUsername(employe.getNom())
            	        .password(employe.getPassword())
            	        .authorities("ROLE_" + employe.getRole())
            	        .build();

            	    Authentication authentication = new UsernamePasswordAuthenticationToken(
            	        userDetails, null, userDetails.getAuthorities());

            	    SecurityContextHolder.getContext().setAuthentication(authentication);
            	}

            }
        }

        filterChain.doFilter(request, response);
    }

    // Fonction pour extraire les autorités (rôles)


    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Extraire le JWT du header Authorization
        }
        return null;
    }
}

