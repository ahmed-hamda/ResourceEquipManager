import { Employe } from "../Employe/Employe";
import { Equipement } from "../Equipement/Equipement";
import { Tache } from "../Tache/Tache";

export class Affectation {
  id?:any;
  dateDebut!:Date;
  dateFin!:Date;
  dateFinReel!:Date;
  statut!: string;
  employe!:Employe;
  equipement!:Equipement;
  tache!:Tache;
}
