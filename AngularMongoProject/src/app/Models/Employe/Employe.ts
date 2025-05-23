import { Competence } from "../Competence/Competence";

export class Employe {
  id?:any;
  nom!:string;
  prenom!:string;
  cin!:number;
  email!:string;
  password!:string;
  role!:string;
  competences!:Competence[]; 
}