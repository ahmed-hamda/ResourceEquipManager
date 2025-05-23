package com.example.SpringMongoProject.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringMongoProject.Entity.Certification;
import com.example.SpringMongoProject.Entity.Competence;
import com.example.SpringMongoProject.Errors.ResourceNotFoundException;
import com.example.SpringMongoProject.Repository.CertificationRepository;
import com.example.SpringMongoProject.Repository.CompetenceRepository;

@Service
public class CertificationService {

	@Autowired
    private CertificationRepository certificationRepository;
    
	@Autowired
    private CompetenceRepository competenceRepository;
    
	 public Certification createCertification(Certification Certification) {
	        try {
	            return certificationRepository.save(Certification);
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'enregistrement de Certification : " + e.getMessage());
	        }
	    }

	    public List<Certification> getAllCertifications() {
	    	try {
	            return certificationRepository.findAll();
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'affichage des Certifications : " + e.getMessage());
	        }
	    }
	    
	    public Certification getCertificationById(String id) {
	        try {
	            return certificationRepository.findById(id)
	                    .orElseThrow(() -> new ResourceNotFoundException("Aucun Certification trouvé"));
	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de l'affichage de la Certification : " + e.getMessage());
	        }
	    }


	    public void deleteCertification(String certificationId) {
	        try {
	            // Récupérer la certification à supprimer
	            Certification certification = certificationRepository.findById(certificationId)
	                    .orElseThrow(() -> new RuntimeException("Certification introuvable"));

	            // 1. Supprimer la certification dans toutes les compétences
	            List<Competence> competences = competenceRepository.findAll();
	            for (Competence competence : competences) {
	                if (competence.getCertifications() != null && !competence.getCertifications().isEmpty()) {
	                    boolean removed = competence.getCertifications().removeIf(cert -> cert.getId().equals(certificationId));

	                    if (removed) {
	                        // Vérifier après suppression si la liste est vide
	                        if (competence.getCertifications().isEmpty()) {
	                            competence.setCertifications(new ArrayList<>()); // Remettre une liste vide propre
	                        }
	                        competenceRepository.save(competence); // Mettre à jour la compétence
	                    }
	                }
	            }

	            // 2. Ensuite, supprimer la certification elle-même
	            certificationRepository.delete(certification);

	        } catch (Exception e) {
	            throw new RuntimeException("Erreur lors de la suppression de la certification : " + e.getMessage());
	        }
	    }


	    public Certification updateCertification(String id, Certification CertificationDetails) {
	        Certification Certification = certificationRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Aucune Certification trouvé"));

	        Certification.setNom(CertificationDetails.getNom());
	        Certification.setDateAjout(CertificationDetails.getDateAjout());
	        return certificationRepository.save(Certification);
	    }
}
