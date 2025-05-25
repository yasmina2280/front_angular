import { Dossier } from './dossier.model';
import { Nature } from './nature.model';
import { Stade } from './stade.model';


export interface Risque {
  id?: number;
  num: string;
  montantPrincipale: number;
  soldePrincipale: number;
  interetConventionnel: number;
  soldeInteretConventionnel: number;
  montantInteretRetard: number;
  soldeInteretRetard: number;
  nature: Nature;
  stade: Stade;
  dossier: Dossier;
}