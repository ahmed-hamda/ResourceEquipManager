import { Certification } from "../Certification/Certification";

export class Competence {
    id?:any;
    nom!:string;
    type!:string;
    certifications!:Certification[];
}
