import { Competence } from "../Competence/Competence";

export class Equipement {
  id?:any;
  nom!:string;
  type!:string;
  dateAchat!: Date;
  etat!:string;
  competence!:Competence;
}
