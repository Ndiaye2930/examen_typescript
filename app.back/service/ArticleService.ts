import db from '../db.json';

export interface Article {
  id: number;
  nom: string;
}

export class ArticleService {
  getAll(): Article[] {
    return db.articles;
  }

  getById(id: number): Article | undefined {
    return db.articles.find(a => a.id === id);
  }
}
