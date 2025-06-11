import { Risque } from './risque.model';

export interface RecouvrementRisque {
  id: number;
  montantAffecte: number;
  risque: Risque;
}
