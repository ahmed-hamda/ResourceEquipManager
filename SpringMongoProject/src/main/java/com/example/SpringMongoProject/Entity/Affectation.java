package com.example.SpringMongoProject.Entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

@Document(collection = "affectations")
public class Affectation {
    @Id
    private String id;
    
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateDebut;
    
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateFin;
    
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateFinReel;
    
    private String statut;
    
    @DBRef
    private Equipement equipement ;
    
    @DBRef
    private Employe employe;
    
    @DBRef
    private Tache tache;

    
	public Affectation(String id, LocalDate dateDebut, LocalDate dateFin , LocalDate dateFinReel, String statut, Equipement equipement, Employe employe, Tache tache) {
		this.id = id;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.dateFin=dateFin;
		this.statut=statut;
		this.equipement = equipement;
		this.employe = employe;
		this.tache=tache;
	}
	
	public Affectation() {
		super();
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public LocalDate getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(LocalDate dateDebut) {
		this.dateDebut = dateDebut;
	}

	public LocalDate getDateFin() {
		return dateFin;
	}

	public void setDateFin(LocalDate dateFin) {
		this.dateFin = dateFin;
	}

	
	
	public LocalDate getDateFinReel() {
		return dateFinReel;
	}

	public void setDateFinReel(LocalDate dateFinReel) {
		this.dateFinReel = dateFinReel;
	}

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	public Equipement getEquipement() {
		return equipement;
	}

	public void setEquipement(Equipement equipement) {
		this.equipement = equipement;
	}

	public Employe getEmploye() {
		return employe;
	}

	public void setEmploye(Employe employe) {
		this.employe = employe;
	}

	public Tache getTache() {
		return tache;
	}

	public void setTache(Tache tache) {
		this.tache = tache;
	}

	

}
