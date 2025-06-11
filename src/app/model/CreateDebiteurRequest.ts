// create-debiteur-request.model.ts
export interface CreateDebiteurRequest {
  personneId: number;
  numeroDossier: string;
  numContentieux: string;
  dateTransfert: Date;
  soldeRecouvrement: number;
  rapporteur: string;
}