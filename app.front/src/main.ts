import { NewAppro } from "./pages/NewAppro";
import { ListeAppro } from "./pages/ListeAppro";

const app = document.getElementById("app")!;
const linkNouveau = document.getElementById("link-nouveau")!;
const linkAppro = document.getElementById("link-appro")!;

function renderPage(page: { render: () => void }) {
  app.innerHTML = "";
  page.render();
}

linkNouveau.addEventListener("click", e => {
  e.preventDefault();
  renderPage(NewAppro);
});

linkAppro.addEventListener("click", e => {
  e.preventDefault();
  renderPage(ListeAppro);
});

// Chargement initial
renderPage(ListeAppro);
