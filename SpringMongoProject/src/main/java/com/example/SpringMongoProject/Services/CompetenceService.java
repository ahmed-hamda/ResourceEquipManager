package com.example.SpringMongoProject.Services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.SpringMongoProject.Entity.Competence;
import com.example.SpringMongoProject.Entity.Employe;
import com.example.SpringMongoProject.Entity.Equipement;
import com.example.SpringMongoProject.Errors.ResourceNotFoundException;
import com.example.SpringMongoProject.Repository.CompetenceRepository;
import com.example.SpringMongoProject.Repository.EmployeRepository;
import com.example.SpringMongoProject.Repository.EquipementRepository;

@Service
public class CompetenceService {

	@Autowired
    private CompetenceRepository competenceRepository;
    
	@Autowired
    private EmployeRepository employeRepository;
    
	@Autowired
    private EquipementRepository equipementRepository;
    
	 public Competence createCompetence(Competence competence) {
	        try {
	            return competenceRepository.save(competence);
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'enregistrement de competence : " + e.getMessage());
	        }
	    }

	    public List<Competence> getAllCompetences() {
	    	try {
	            return competenceRepository.findAll();
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'affichage des competences : " + e.getMessage());
	        }
	    }
	    
	    public Competence getCompetenceById(String id) {
	        try {
	            return competenceRepository.findById(id)
	                    .orElseThrow(() -> new ResourceNotFoundException("Aucun competence trouvé"));
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'affichage de la competence : " + e.getMessage());
	        }
	    }


	    public void deleteCompetence(String competenceId) {
	        try {
	            // Récupérer la compétence à supprimer
	            Competence competence = competenceRepository.findById(competenceId)
	                    .orElseThrow(() -> new RuntimeException("Compétence introuvable"));

	            // 1. Supprimer la compétence dans les employés
	            List<Employe> employes = employeRepository.findAll();
	            for (Employe employe : employes) {
	                if (employe.getCompetences() != null && !employe.getCompetences().isEmpty()) {
	                	boolean removed = employe.getCompetences().removeIf(comp -> comp.getId().equals(competenceId));
	                	if (removed) {
	                		if ( employe.getCompetences().isEmpty() ) {
	                			employe.setCompetences(new ArrayList<>());
	                		}
	                	}
	                    employeRepository.save(employe); // Mettre à jour l'employé
	                }
	            }

	            // 2. Supprimer la compétence dans les équipements
	            List<Equipement> equipements = equipementRepository.findAll();
	            for (Equipement equipement : equipements) {
	                if (equipement.getCompetence() != null && equipement.getCompetence().getId().equals(competenceId)) {
	                    equipement.setCompetence(null);
	                    equipementRepository.save(equipement); // Mettre à jour l'équipement
	                }
	            }

	            // 3. Enfin, supprimer la compétence elle-même
	            competenceRepository.delete(competence);

	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de la suppression de la compétence : " + e.getMessage());
	        }
	    }


	    public Competence updateCompetence(String id, Competence competenceDetails) {
	        Competence competence = competenceRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Aucune competence trouvé"));

	        competence.setNom(competenceDetails.getNom());
	        competence.setType(competenceDetails.getType());
	        competence.setCertifications(competenceDetails.getCertifications());
	        return competenceRepository.save(competence);
	    }
	    
}
