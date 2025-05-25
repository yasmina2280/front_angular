import { Risque } from "./risque.model";
import { Type } from "./type.model";
export interface Operation {
  id: number;
  date: string;  // Changé de dateOperation à date
  matricule: string;
  etatOperation: string;
  montant: number;
  type: {
    id: number;
    libelle: string;
  };
  risque: Risque;
}
