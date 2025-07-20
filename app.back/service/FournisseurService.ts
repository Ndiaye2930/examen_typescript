import db from '../db.json';

export interface Fournisseur {
  id: number;
  nom: string;
}

export class FournisseurService {
  getAll(): Fournisseur[] {
    return db.fournisseurs;
  }

  getById(id: number): Fournisseur | undefined {
    return db.fournisseurs.find(f => f.id === id);
  }
}
