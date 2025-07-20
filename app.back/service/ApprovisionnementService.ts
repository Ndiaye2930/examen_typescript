import db from '../db.json';

export interface Approvisionnement {
  id: number;
  date: string;
  reference: string;
  fournisseurId: number;
  article: number;
  quantite: number;
}

export class ApprovisionnementService {
  getAll(): Approvisionnement[] {
    return db.approvisionnements;
  }

  add(appro: Approvisionnement): void {
    db.approvisionnements.push(appro);
  }

  filterByReference(ref: string): Approvisionnement[] {
    return db.approvisionnements.filter(a =>
      a.reference.toLowerCase().includes(ref.toLowerCase())
    );
  }
}
