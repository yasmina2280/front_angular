import { Personne } from './person.model';
import { Dossier } from './dossier.model';

export interface Debiteur {
  numContentieux: number;
  dateTransfert: Date;
  soldeRecouvrement: number;
  rapporteur: string;
  dossier: Dossier;
  personne: Personne;
}