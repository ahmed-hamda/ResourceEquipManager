package com.example.SpringMongoProject.Entity;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class Certification {
	
	 @Id
	  private String id;
	    
	 @NotBlank(message = "Le champ nom est obligatoire")
	  private String nom;
	 
	 @NotNull(message = "La date d'ajout est obligatoire")
	 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	  private LocalDate dateAjout;

	public Certification(String id, String nom, LocalDate dateAjout) {
		super();
		this.id = id;
		this.nom = nom;
		this.dateAjout = dateAjout;
	}

	public Certification() {
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
	
	public LocalDate getDateAjout() {
		return dateAjout;
	}

	public void setDateAjout(LocalDate dateAjout) {
		this.dateAjout = dateAjout;
	}

	
	 
}
