import { Personne } from "./person.model";


export interface DebiteurDto {
  numContentieux: number;
  dateTransfert: Date;
  soldeRecouvrement: number;
  rapporteur: string;
  numeroDossier: number;
  personne: Personne;
}