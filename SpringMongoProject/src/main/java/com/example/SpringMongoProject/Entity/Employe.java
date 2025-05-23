package com.example.SpringMongoProject.Entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Document(collection = "employes")
public class Employe {
    @Id
    private String id;
    @NotBlank(message = "Le champ nom est obligatoire")
    private String nom;
    @NotBlank(message = "Le champ prénom est obligatoire")
    private String prenom;
    @NotBlank(message = "Le champ email est obligatoire")    
    private String email;
    @NotNull(message = "Le champ CIN est obligatoire")    
    private int cin;
    
    private String password;
    
    private String role;
    
    private List<Competence> competences;
        

	public Employe(String id, String nom, String prenom, String email, int cin, List<Competence> competences) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.email=email;
		this.cin=cin;
		this.competences = competences;
	}

	public Employe() {
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

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getCin() {
		return cin;
	}

	public void setCin(int cin) {
		this.cin = cin;
	}
	

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public  List<Competence> getCompetences() {
		return competences;
	}

	public void setCompetences( List<Competence> competences) {
		this.competences = competences;
	}


}
