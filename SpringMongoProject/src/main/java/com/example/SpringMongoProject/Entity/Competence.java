package com.example.SpringMongoProject.Entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import jakarta.validation.constraints.NotBlank;

public class Competence {

	@Id
    private String id;
    
	@NotBlank(message = "Le champ nom est obligatoire")
    private String nom;
    
	@NotBlank(message = "Le champ type est obligatoire")
    private String type;
    
	@DBRef
    private List<Certification> certifications;

	public Competence(String id,String nom, String type, List<Certification> certifications) {
		super();
		this.id = id;
		this.nom = nom;
		this.certifications = certifications;
		this.type=type;
	}

	public Competence() {
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
	
	public List<Certification> getCertifications() {
		return certifications;
	}

	public void setCertifications(List<Certification> certifications) {
		this.certifications = certifications;
	}
    
	
    
}
