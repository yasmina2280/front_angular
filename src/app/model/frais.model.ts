import { Risque } from './risque.model';
import { Type } from './type.model';
import { EtatFrais } from './etat-frais.enum';

export interface Frais {
  id: number;
  risque: Risque;
  montant: number;
  matricule: string;
  type: Type;
  etat: EtatFrais;
}
