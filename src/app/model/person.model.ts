export enum TypePersonne {
  PHYSIQUE = 'PHYSIQUE',
  MORALE = 'MORALE'
}

export interface Personne {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance?: Date | string;  // Permet de gérer les strings venant du backend
  cin: string;                    // Maintenant obligatoire comme dans le modèle Java
  typePersonne: TypePersonne;
  raisonSociale?: string;
}