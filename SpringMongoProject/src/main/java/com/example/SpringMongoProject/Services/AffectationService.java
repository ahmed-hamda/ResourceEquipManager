package com.example.SpringMongoProject.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringMongoProject.Entity.Affectation;
import com.example.SpringMongoProject.Entity.Certification;
import com.example.SpringMongoProject.Entity.Competence;
import com.example.SpringMongoProject.Entity.Employe;
import com.example.SpringMongoProject.Entity.Equipement;
import com.example.SpringMongoProject.Entity.Tache;
import com.example.SpringMongoProject.Errors.ResourceNotFoundException;
import com.example.SpringMongoProject.Repository.AffectationRepository;
import com.example.SpringMongoProject.Repository.EmployeRepository;
import com.example.SpringMongoProject.Repository.EquipementRepository;
import com.example.SpringMongoProject.Repository.TacheRepository;

@Service
public class AffectationService {
	
	 @Autowired
	    private AffectationRepository affectationRepository;
	 
	 @Autowired
	    private EmployeRepository employeRepository;
	 
	 @Autowired
	    private EquipementRepository equipementRepository;

	 @Autowired
	    private TacheRepository tacheRepository;

	 	public Affectation createAffectation(Affectation affectation) {
		    try {
		        // Récupérer l'employé complet
		        Employe employe = employeRepository.findById(affectation.getEmploye().getId())
		                .orElseThrow(() -> new RuntimeException("Employé introuvable"));

		        // Vérifier et récupérer tous les équipements
		         Equipement equipement = equipementRepository.findById(affectation.getEquipement().getId())
		              .orElseThrow(() -> new RuntimeException("Équipement introuvable pour l'id: " + affectation.getEquipement().getId()));
		         
		         equipement.setEtat("non disponible");
		         equipementRepository.save(equipement);

		        // Lier l'employé à l'affectation
		        affectation.setEmploye(employe);
		        
		        // Ajouter tous les équipements à la liste de l'affectation
		        affectation.setEquipement(equipement);

		        Tache tache = tacheRepository.findById(affectation.getTache().getId())
		                .orElseThrow(() -> new RuntimeException("Tache introuvable"));
		        
		        tache.setStatut("affectée");
		        tacheRepository.save(tache);
		        affectation.setTache(affectation.getTache());
		        
		        // Sauvegarder l'affectation
		        Affectation saved = affectationRepository.save(affectation);

		        return saved;
		    } catch (Exception e) {
		        throw new RuntimeException("Erreur lors de la création de l'affectation : " + e.getMessage());
		    }
		}

		public List<Affectation> getAllAffectations() {
	    	try {
	            return affectationRepository.findAll();
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'affichage des affectations : " + e.getMessage());
	        }
	    }
		
		public Affectation getAffectationById(String id) {
	        try {
	            return affectationRepository.findById(id)
	                    .orElseThrow(() -> new ResourceNotFoundException("Aucune Affectation trouvé"));
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'affichage de l'affectation : " + e.getMessage());
	        }
	    }
		
		public void deleteAffectation(String id) {
			
	    	try {
	    		Affectation affectation = affectationRepository.findById(id)
		                .orElseThrow(() -> new RuntimeException("affectation introuvable"));
	    		
		            Equipement equipement = equipementRepository.findById(affectation.getEquipement().getId())
		                    .orElseThrow(() -> new RuntimeException("Équipement introuvable pour l'id: " + affectation.getEquipement().getId()));
		            
		            Tache tache = tacheRepository.findById(affectation.getTache().getId())
			                .orElseThrow(() -> new RuntimeException("Tache introuvable"));
		            
		            tache.setStatut("non affectée");
		            tacheRepository.save(tache);
		            equipement.setEtat("disponible");
		            equipementRepository.save(equipement);
	    			affectationRepository.deleteById(affectation.getId());
	    		}
	    	
	    	catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'affichage de l'affectation : " + e.getMessage());
	        }
	        
	    }
		
		private boolean isCompatible(Equipement equipement, Competence competence) {
		    if (equipement.getCompetence() != null && competence != null) {
		        // Vérification du type de compétence et de l'état de l'équipement
		        if (equipement.getCompetence().getType().toLowerCase().contains(competence.getType().toLowerCase()) &&
		            equipement.getEtat().equalsIgnoreCase("disponible")) {
		            return true;
		        }
		    }
		    return false;
		}

		public List<Employe> getEmployesCompatiblesPourEquipement(String equipementId) {
		    try {
		        Equipement equipement = equipementRepository.findById(equipementId)
		            .orElseThrow(() -> new RuntimeException("Equipement non trouvé"));

		        Competence competenceEquipement = equipement.getCompetence();
		        List<Employe> tousEmployes = employeRepository.findAll();

		     // Si l'équipement n'a pas de compétences associées, on ne peut pas le comparer
		        if (equipement.getCompetence() == null) {
		            return tousEmployes = new ArrayList<>();
		        }
		        
		        // Filtrer les employés qui ont des compétences compatibles avec l'équipement
		        return tousEmployes.stream()
		            .filter(emp -> emp.getCompetences() != null && !emp.getCompetences().isEmpty()) // Exclure les employés sans compétences
		            .filter(emp -> emp.getCompetences().stream()
		                .anyMatch(comp -> isCompatible(equipement, comp))) // Vérifier la compatibilité des compétences de chaque employé
		            .collect(Collectors.toList());
		    } catch (Exception e) {
		        throw new RuntimeException("Erreur lors de l'affichage des employés compatibles : " + e.getMessage());
		    }
		}
		
		public List<Equipement> getEquipementsCompatiblesPourEmploye(String employeId) {
		    try {
		        Employe employe = employeRepository.findById(employeId)
		                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));

		        List<Equipement> tousEquipements = equipementRepository.findAll();

		        // Vérifier si l'employé a des compétences
		        if (employe.getCompetences() == null || employe.getCompetences().isEmpty()) {
		        	tousEquipements= new ArrayList<>();
		        	return tousEquipements ;
		        }
		        
		        // Filtrer les équipements compatibles avec au moins une compétence de l'employé
		        return tousEquipements.stream()
		                .filter(eq -> eq.getEtat() != null && eq.getEtat().equalsIgnoreCase("disponible")) // On veut uniquement les équipements disponibles
		                .filter(eq -> employe.getCompetences().stream()
		                        .anyMatch(comp -> isCompatible(eq, comp))) // Vérifie si une compétence de l'employé est compatible avec l'équipement
		                .collect(Collectors.toList());
		    } catch (Exception e) {
		        throw new RuntimeException("Erreur lors de l'affichage des équipements compatibles : " + e.getMessage());
		    }
		}

		
		public Affectation updateAffectation(String id, Affectation updatedAffectation) {
		    try {
		        Affectation existingAffectation = affectationRepository.findById(id)
		            .orElseThrow(() -> new RuntimeException("Affectation introuvable"));

		        // 1. Mettre à jour l’équipement
		        Equipement newEquipement = equipementRepository.findById(updatedAffectation.getEquipement().getId())
		            .orElseThrow(() -> new RuntimeException("Équipement introuvable"));

		        
		        if(updatedAffectation.getStatut().equalsIgnoreCase("terminé")) {
		        	existingAffectation.getEquipement().setEtat("disponible");
			            equipementRepository.save(existingAffectation.getEquipement());
			         
		        }
		        // Si l'équipement a changé, libérer l’ancien
		        
		     // Mettre à jour l’équipement si l’ID a changé
		        if (!existingAffectation.getEquipement().getId().equals(updatedAffectation.getEquipement().getId())) {
		            Equipement oldEquipement = existingAffectation.getEquipement();
		            oldEquipement.setEtat("disponible");
		            equipementRepository.save(oldEquipement);

		            newEquipement.setEtat("non disponible");
		            equipementRepository.save(newEquipement);

		            existingAffectation.setEquipement(newEquipement);
		        }

		        // Mettre à jour l’employé si l’ID a changé
		        if (!existingAffectation.getEmploye().getId().equals(updatedAffectation.getEmploye().getId())) {
		            Employe newEmploye = employeRepository.findById(updatedAffectation.getEmploye().getId())
		                .orElseThrow(() -> new RuntimeException("Employé introuvable"));
		            existingAffectation.setEmploye(newEmploye);
		        }

		        // 3. Mettre à jour la tâche
		        Tache tache = tacheRepository.findById(updatedAffectation.getTache().getId())
		            .orElseThrow(() -> new RuntimeException("Tâche introuvable"));
		        existingAffectation.setTache(tache);

		        // 4. Mettre à jour dates et statut
		        existingAffectation.setDateDebut(updatedAffectation.getDateDebut());
		        existingAffectation.setDateFin(updatedAffectation.getDateFin());
		        existingAffectation.setDateFinReel(updatedAffectation.getDateFinReel());
		        existingAffectation.setStatut(updatedAffectation.getStatut());
		        
		        return affectationRepository.save(existingAffectation);

		    } catch (Exception e) {
		        throw new RuntimeException("Erreur lors de la mise à jour de l'affectation : " + e.getMessage());
		    }
		}
		
		public List<Affectation> getAffectationsByEmployeId(String employeId) {
		    try {
		        return affectationRepository.findByEmploye_Id(employeId);
		    } catch (Exception e) {
		        throw new RuntimeException("Erreur lors de la récupération des affectations de l'employé : " + e.getMessage());
		    }
		}



}
