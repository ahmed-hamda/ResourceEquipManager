package com.example.SpringMongoProject.Entity;

import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Document(collection = "equipements")
public class Equipement {
    @Id
    private String id;
    
    @NotBlank(message = "Le champ nom est obligatoire")
    private String nom;
    
    @NotBlank(message = "Le champ type est obligatoire")
    private String type;
    
    @NotNull(message = "La date d'achat est obligatoire")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateAchat;
    
    @NotBlank(message = "Le champ etat est obligatoire")
    private String etat;
    
    @DBRef
    private Competence competence;
    
	public Equipement(String id, String nom, String type, LocalDate dateAchat, String etat, Competence competence) {
		super();
		this.id = id;
		this.nom = nom;
		this.type = type;
		this.dateAchat = dateAchat;
		this.etat = etat;
		this.competence=competence;
	}

	
	public Equipement() {
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public LocalDate getDateAchat() {
		return dateAchat;
	}

	public void setDateAchat(LocalDate dateAchat) {
		this.dateAchat = dateAchat;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}


	public Competence getCompetence() {
		return competence;
	}


	public void setCompetence(Competence competence) {
		this.competence = competence;
	}
	
	


}