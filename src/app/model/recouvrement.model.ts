import { Debiteur } from './debiteur.model';
import { Dossier } from './dossier.model';
import { RecouvrementRisque } from './recouvrement-risque.model';

export interface Recouvrement {
  id: number;
  montant: number;
  dateVersement: string;
  etat: 'EN_ATTENTE' | 'VALIDE' | 'REFUSE';
  dossier: Dossier;
  repartitions: RecouvrementRisque[];
    debiteur?: Debiteur;  // ajout optionnel

}
