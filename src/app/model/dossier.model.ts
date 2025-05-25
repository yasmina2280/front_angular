import { Risque } from "./risque.model";

export interface Dossier {
  numero?: number;
  etat: string;
  risques?: Risque[];
}

