package com.example.SpringMongoProject.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.SpringMongoProject.Entity.Affectation;
import com.example.SpringMongoProject.Entity.Certification;
import com.example.SpringMongoProject.Entity.Competence;
import com.example.SpringMongoProject.Entity.Employe;
import com.example.SpringMongoProject.Errors.ResourceNotFoundException;
import com.example.SpringMongoProject.Repository.AffectationRepository;
import com.example.SpringMongoProject.Repository.CompetenceRepository;
import com.example.SpringMongoProject.Repository.EmployeRepository;
import com.example.SpringMongoProject.Repository.EquipementRepository;

@Service
public class EmployeService implements UserDetailsService  {

    @Autowired
    private EmployeRepository employeRepository;
    
    @Autowired
    private EquipementRepository equipementRepository;
    
    @Autowired
    private CompetenceRepository competenceRepository;

    @Autowired
    private AffectationRepository affectationRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employe employe = employeRepository.findByNom(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Retourner un objet UserDetails (Spring Security)
        return new User(
            employe.getNom(),
            employe.getPassword(),
            List.of(new SimpleGrantedAuthority("ROLE_" + employe.getRole())) // Assure-toi que le rôle commence par "ROLE_"
        );
    }
    
    public Employe findByName(String username) {
        return employeRepository.findByNom(username).orElse(null);
    }
    
    public Employe createEmploye(Employe employe) {
        try {
            List<Competence> competencesComplete = new ArrayList<>();
            
            if (employe.getCompetences() != null) {
                for (Competence comp : employe.getCompetences()) {
                    Competence competenceFromDb = competenceRepository.findById(comp.getId())
                        .orElseThrow(() -> new RuntimeException("Compétence introuvable avec ID : " + comp.getId()));

                    // Créer une copie "propre" de la compétence
                    Competence newCompetence = new Competence();
                    newCompetence.setId(competenceFromDb.getId());
                    newCompetence.setNom(competenceFromDb.getNom());
                    newCompetence.setType(competenceFromDb.getType());

                    if (comp.getCertifications() != null && !comp.getCertifications().isEmpty()) {
                        List<Certification> certificationsFiltrees = competenceFromDb.getCertifications().stream()
                            .filter(certifDb -> comp.getCertifications().stream()
                                .anyMatch(certif -> certif.getId().equals(certifDb.getId())))
                            .collect(Collectors.toList());

                        newCompetence.setCertifications(certificationsFiltrees);
                    } else {
                        newCompetence.setCertifications(new ArrayList<>());
                    }

                    competencesComplete.add(newCompetence); // ajouter la copie propre
                }
            }

            employe.setCompetences(competencesComplete);
            employe.setPassword(new BCryptPasswordEncoder().encode("123456"));
            return employeRepository.save(employe);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de l'enregistrement de l'employé : " + e.getMessage());
        }
    }

    public List<Employe> getAllEmployes() {
    	try {
            return employeRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de l'affichage des employés : " + e.getMessage());
        }
    }
    
    public List<Employe> getEmployesSansAffectation() {
        try {
            // Récupérer tous les employés
            List<Employe> tousEmployes = employeRepository.findAll();

            // Filtrer les employés qui n'ont pas d'affectations
            return tousEmployes.stream()
                    .filter(emp -> affectationRepository.findByEmploye(emp) == null || affectationRepository.findByEmploye(emp).isEmpty())
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de l'affichage des employés sans affectation : " + e.getMessage());
        }
    }

    public Employe getEmployeById(String id) {
        try {
            return employeRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Aucun employé trouvé"));
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de l'affichage de l'employé : " + e.getMessage());
        }
    }


    public void deleteEmploye(String id) {
    	try {
    		
    		// Récupérer toutes les affectations liées à cet employé
    		    List<Affectation> affectations = affectationRepository.findByEmploye_Id(id);

    		    for (Affectation affectation : affectations) {
    		        // Pour chaque équipement de l'affectation, modifier l'état
    		        if (affectation.getEquipement() != null) {
    		        	affectation.getEquipement().setEtat("disponible"); 
    		                equipementRepository.save(affectation.getEquipement());
    		        }
    		    }
    		    
       		 affectationRepository.deleteByEmploye_Id(id);
    		 employeRepository.deleteById(id);    		
    		 
    	}
    	catch (Exception e) {
            throw new RuntimeException("Erreur lors de l'affichage de l'employé : " + e.getMessage());
        }
        
    }

    public Employe updateEmploye(String id, Employe employeDetails) {
        Employe employe = employeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Aucun employé trouvé"));

        employe.setNom(employeDetails.getNom());
        employe.setPrenom(employeDetails.getPrenom());
        employe.setEmail(employeDetails.getEmail());
        employe.setCin(employeDetails.getCin());
        employe.setPassword(employe.getPassword());
        employe.setRole(employe.getRole());
        
        List<Competence> competences = new ArrayList<>();

        for (Competence comp : employeDetails.getCompetences()) {
            Competence existingComp = competenceRepository.findById(comp.getId())
            		 .orElseThrow(() -> new ResourceNotFoundException("Aucun competence trouvé"));

            competences.add(existingComp);
        }

        employe.setCompetences(competences);
        return employeRepository.save(employe);
    }
    

}
