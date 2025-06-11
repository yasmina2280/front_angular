export interface Personne {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance?: Date | string;
  cin: string;
  typePersonne: TypePersonne;
  raisonSociale?: string;
  isDebiteur: boolean;  
}

export enum TypePersonne {
  PHYSIQUE = 'PHYSIQUE',
  MORALE = 'MORALE'
}