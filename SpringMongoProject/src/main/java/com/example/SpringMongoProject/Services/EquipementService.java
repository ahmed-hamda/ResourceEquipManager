package com.example.SpringMongoProject.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringMongoProject.Entity.Affectation;
import com.example.SpringMongoProject.Entity.Competence;
import com.example.SpringMongoProject.Entity.Equipement;
import com.example.SpringMongoProject.Errors.ResourceNotFoundException;
import com.example.SpringMongoProject.Repository.AffectationRepository;
import com.example.SpringMongoProject.Repository.CompetenceRepository;
import com.example.SpringMongoProject.Repository.EquipementRepository;

@Service
public class EquipementService {
	 @Autowired
	    private EquipementRepository equipementRepository;

	 @Autowired
	 private AffectationRepository affectationRepository;

	 @Autowired
	    private CompetenceRepository competenceRepository;

	    public Equipement createEquipement(Equipement equipement) {
	        try {
	        	 Competence competenceFromDb = competenceRepository.findById(equipement.getCompetence().getId())
	                        .orElseThrow(() -> new RuntimeException("Compétence introuvable avec ID : " + equipement.getCompetence().getId()));
	             equipement.setCompetence(competenceFromDb);
	            return equipementRepository.save(equipement);
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'enregistrement de l'équipement : " + e.getMessage());
	        }
	    }

	    public List<Equipement> getAllEquipement() {
	    	try {
	            return equipementRepository.findAll();
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'affichage des equipements : " + e.getMessage());
	        }
	    }
	    
	    public Equipement getEquipementById(String id) {
	        try {
	            return equipementRepository.findById(id)
	                    .orElseThrow(() -> new ResourceNotFoundException("Aucun equipement trouvé"));
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'affichage de l'equipement : " + e.getMessage());
	        }
	    }


	    public void deleteEquipement(String equipementId) {
	    	 // Supprimer l’équipement des affectations
	        List<Affectation> affectations = affectationRepository.findByEquipement_Id(equipementId);
	        
	        for (Affectation affectation : affectations) {
	            affectation.getEquipement().getId().equals(equipementId);
	            affectationRepository.save(affectation);
	        }

	        // Supprimer l’équipement de la base
	        equipementRepository.deleteById(equipementId);
	    }

	    public Equipement updateEquipement(String id, Equipement equipementDetails) {
	        Equipement equipement = equipementRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Aucun equipement trouvé"));
	        
	        equipement.setNom(equipementDetails.getNom());
	        equipement.setType(equipementDetails.getType());
	        equipement.setEtat(equipementDetails.getEtat());
	        equipement.setDateAchat(equipementDetails.getDateAchat());
	        equipement.setCompetence(equipementDetails.getCompetence());

	        try {
	            return equipementRepository.save(equipement);
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de la mise à jour de l'equipement : " + e.getMessage());
	        }
	    }


}

