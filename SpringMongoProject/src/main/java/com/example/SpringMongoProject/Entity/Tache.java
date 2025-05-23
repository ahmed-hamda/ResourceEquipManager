package com.example.SpringMongoProject.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;

@Document(collection = "taches")
public class Tache {

	 	@Id
	    private String id;
	    
	    @NotBlank(message="le champ nom du tache est obligatoire .")
	    private String nom;
	    
	    @NotBlank(message="le champ description est obligatoire .")
	    private String description;
	    
	    @NotBlank(message="le champ nom du tache est obligatoire .")
	    private String statut;
	    

		public Tache(String id,String nom, String description, String statut) {
			this.id = id;
			this.nom = nom;
			this.description = description;
			this.statut = statut;

		}

		public Tache() {
			super();
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getNom() {
			return nom;
		}

		public void setNom(String nom) {
			this.nom = nom;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getStatut() {
			return statut;
		}

		public void setStatut(String statut) {
			this.statut = statut;
		}
		
	    
}
