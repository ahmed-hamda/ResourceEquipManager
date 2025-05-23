package com.example.SpringMongoProject.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringMongoProject.Entity.Tache;
import com.example.SpringMongoProject.Errors.ResourceNotFoundException;
import com.example.SpringMongoProject.Repository.TacheRepository;

@Service
public class TacheService {

	@Autowired
    private TacheRepository TacheRepository;
    
	 public Tache createTache(Tache Tache) {
	        try {
	            return TacheRepository.save(Tache);
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'enregistrement de Tache : " + e.getMessage());
	        }
	    }

	    public List<Tache> getAllTaches() {
	    	try {
	            return TacheRepository.findAll();
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'affichage des Taches : " + e.getMessage());
	        }
	    }
	    
	    public Tache getTacheById(String id) {
	        try {
	            return TacheRepository.findById(id)
	                    .orElseThrow(() -> new ResourceNotFoundException("Aucun Tache trouvé"));
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'affichage de la Tache : " + e.getMessage());
	        }
	    }


	    public void deleteTache(String id) {
	    	try {
	    		
	    		TacheRepository.deleteById(id);    		
	    		 
	    	}
	    	catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'affichage de la Tache : " + e.getMessage());
	        }
	        
	    }

	    public Tache updateTache(String id, Tache TacheDetails) {
	        Tache Tache = TacheRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Aucune Tache trouvé"));

	        Tache.setNom(TacheDetails.getNom());
	        Tache.setDescription(TacheDetails.getDescription());
	        Tache.setStatut(TacheDetails.getStatut());
	        
	        return TacheRepository.save(Tache);
	    }
}
