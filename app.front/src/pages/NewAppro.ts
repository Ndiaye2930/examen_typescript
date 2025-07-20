// src/pages/ListeAppro.ts

import { ApprovisionnementService } from "../service/ApprovisionnementService";
import { FournisseurService } from "../service/FournisseurService";
import { ArticleService } from "../service/ArticleService";

export const ListeAppro = {
  fournisseursMap: new Map<number, string>(),
  articlesMap: new Map<number, string>(),

  render: () => {
    const app = document.getElementById("app")!;
    app.innerHTML = `
      <h2>Liste des Approvisionnements</h2>
      <label>Filtrer par référence : <input type="text" id="filter-ref" placeholder="Tapez une référence..."></label>
      <table border="1" id="table-appro" style="width:100%; margin-top: 10px;">
        <thead>
          <tr>
            <th>Date</th>
            <th>Référence</th>
            <th>Fournisseur</th>
            <th>Article</th>
            <th>Quantité</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;

    const filterInput = document.getElementById("filter-ref") as HTMLInputElement;

    // Charger fournisseurs et articles en Map pour accès rapide
    Promise.all([
      FournisseurService.getAll(),
      ArticleService.getAll()
    ]).then(([fournisseurs, articles]) => {
      // Remplir les maps
      ListeAppro.fournisseursMap.clear();
      ListeAppro.articlesMap.clear();

      fournisseurs.forEach(f => ListeAppro.fournisseursMap.set(f.id, f.nom));
      articles.forEach(a => ListeAppro.articlesMap.set(a.id, a.nom));

      // Afficher la table avec tous les approvisionnements au départ
      ListeAppro.loadTable();

      // Filtrer au changement dans l’input
      filterInput.addEventListener("input", () => {
        ListeAppro.loadTable(filterInput.value);
      });
    });
  },

  loadTable: (filter: string = "") => {
    ApprovisionnementService.filterByReference(filter).then(appros => {
      const tbody = document.querySelector("#table-appro tbody")!;
      tbody.innerHTML = "";

      if (appros.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="5" style="text-align:center;">Aucun approvisionnement trouvé.</td>`;
        tbody.appendChild(tr);
        return;
      }

      appros.forEach(a => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${a.date}</td>
          <td>${a.reference}</td>
          <td>${ListeAppro.fournisseursMap.get(a.fournisseurId) ?? "Inconnu"}</td>
          <td>${ListeAppro.articlesMap.get(a.article) ?? "Inconnu"}</td>
          <td>${a.quantite}</td>
        `;
        tbody.appendChild(tr);
      });
    });
  }
};
