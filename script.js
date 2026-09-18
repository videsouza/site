// =============================================================
// Conteúdo do site — edite as listas abaixo para adicionar,
// remover ou alterar seus livros e artigos.
// =============================================================

const livros = [
  {
    titulo: "Título do Livro",
    ano: "2024",
    meta: "Editora · 320 páginas",
    descricao:
      "Breve descrição da obra: tema central, abordagem e público. Duas ou três linhas são suficientes.",
    links: [
      { texto: "Saiba mais", url: "#" },
      { texto: "Onde comprar", url: "#" },
    ],
  },
  {
    titulo: "Segundo Livro",
    ano: "2021",
    meta: "Editora · 248 páginas",
    descricao:
      "Descrição resumida do segundo título, destacando o que ele tem de particular.",
    links: [{ texto: "Saiba mais", url: "#" }],
  },
  {
    titulo: "Terceiro Livro",
    ano: "2018",
    meta: "Editora · 190 páginas",
    descricao: "Um resúmo curto da terceira obra.",
    links: [{ texto: "Saiba mais", url: "#" }],
  },
];

const artigos = [
  {
    titulo: "Título do artigo ou ensaio",
    ano: "2025",
    meta: "Revista / Veículo, v. 12, n. 2",
    url: "#",
  },
  {
    titulo: "Outro texto publicado",
    ano: "2023",
    meta: "Anais do Congresso XYZ",
    url: "#",
  },
  {
    titulo: "Ensaio avulso",
    ano: "2022",
    meta: "Publicação independente",
    url: "#",
  },
];

// ------------------------------------------------------------
// Renderização (não é necessário editar daqui para baixo)
// ------------------------------------------------------------

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderLivros() {
  const grid = document.getElementById("books-grid");
  if (!grid) return;
  grid.innerHTML = livros
    .map((l) => {
      const links = (l.links || [])
        .map(
          (k) =>
            `<a href="${escapeHtml(k.url)}" target="_blank" rel="noopener">${escapeHtml(k.texto)}</a>`
        )
        .join("");
      return `
        <article class="book-card reveal">
          <span class="book-year">${escapeHtml(l.ano)}</span>
          <h3 class="book-title">${escapeHtml(l.titulo)}</h3>
          <p class="book-meta">${escapeHtml(l.meta)}</p>
          <p class="book-desc">${escapeHtml(l.descricao)}</p>
          <div class="book-links">${links}</div>
        </article>`;
    })
    .join("");
}

function renderArtigos() {
  const list = document.getElementById("articles-list");
  if (!list) return;
  list.innerHTML = artigos
    .map((a) => {
      const titulo = a.url
        ? `<a href="${escapeHtml(a.url)}" target="_blank" rel="noopener">${escapeHtml(a.titulo)}</a>`
        : escapeHtml(a.titulo);
      return `
        <li class="article-item reveal">
          <span class="article-year">${escapeHtml(a.ano)}</span>
          <div class="article-body">
            <h3 class="article-title">${titulo}</h3>
            <p class="article-meta">${escapeHtml(a.meta)}</p>
          </div>
        </li>`;
    })
    .join("");
}

// Menu móvel
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// Animação de entrada suave
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => obs.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  renderLivros();
  renderArtigos();
  initNav();
  initReveal();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
