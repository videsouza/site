/* =========================================================
   DADOS — edite aqui para adicionar seu conteúdo
   ========================================================= */

const DATA = {
  books: [
    {
      title: "Título do Primeiro Livro",
      year: 2024,
      publisher: "Editora X",
      cover: "",
      description: "Breve sinopse do livro. Uma ou duas frases descrevendo a obra.",
      link: "https://github.com/seu-usuario"
    },
    {
      title: "Título do Segundo Livro",
      year: 2022,
      publisher: "Editora Y",
      cover: "",
      description: "Outra sinopse curta. Mantenha o tom sóbrio e descritivo.",
      link: "#"
    }
  ],

  articles: [
    {
      title: "Título do artigo acadêmico",
      year: 2025,
      venue: "Revista Brasileira de Alguma Coisa, v. 12, n. 3",
      type: "Periódico",
      link: "#"
    },
    {
      title: "Outro artigo importante",
      year: 2023,
      venue: "Anais do Congresso Z",
      type: "Anais",
      link: "#"
    },
    {
      title: "Capítulo de livro coletivo",
      year: 2021,
      venue: "In: SOBRENOME, Org. Título do livro. Cidade: Editora",
      type: "Capítulo",
      link: "#"
    }
  ],

  poems: [
    {
      title: "Ofício de Outono",
      year: 2025,
      body: `As folhas caem como palavras não ditas,
e o vento as leva sem pedir licença.
Fico à janela, observando o tempo
desfazer o que a primavera compôs.

Há um silêncio novo nesta tarde —
não o silêncio vazio, mas o pleno,
aquele que se faz quando a casa inteira
respira devagar, como quem reza.`
    },
    {
      title: "Carta a um leitor ausente",
      year: 2024,
      body: `Você que me lê sem me conhecer,
herdeiro de um gesto que não fiz,
saiba que estas linhas foram escritas
numa mesa comum, sob luz comum.

Não há mistério no que ofereço:
apenas o trabalho paciente
de quem tenta, em vão, nomear
aquilo que já nasce sem nome.`
    },
    {
      title: "Breve tratado sobre o café",
      year: 2023,
      body: `A xícara esfria enquanto penso
em coisas que não merecem pensamento.
O dia começa assim — morno,
como tudo o que vale a pena.

Bebo devagar. Não por cerimônia,
mas porque o tempo, finalmente,
decidiu me conceder uma trégua
de alguns minutos apenas.`
    }
  ]
};

/* =========================================================
   Utilidades
   ========================================================= */

// Gera um slug a partir do título (para URLs de poema)
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function elementExists(id) {
  return document.getElementById(id) !== null;
}

/* =========================================================
   Renderização — Livros
   ========================================================= */
function renderBooks() {
  if (!elementExists('books-grid')) return;
  const grid = document.getElementById('books-grid');
  grid.innerHTML = DATA.books.map(book => `
    <article class="book-card">
      <div class="book-cover">
        ${book.cover
          ? `<img src="${book.cover}" alt="Capa de ${book.title}" />`
          : `<span class="book-cover-fallback">${book.title}</span>`}
      </div>
      <h3 class="book-title">${book.title}</h3>
      <p class="book-meta">${book.publisher} · ${book.year}</p>
      <p class="book-desc">${book.description}</p>
      <a class="book-link" href="${book.link}" target="_blank" rel="noopener">Saiba mais →</a>
    </article>
  `).join('');
}

/* =========================================================
   Renderização — Artigos
   ========================================================= */
function renderArticles() {
  if (!elementExists('articles-list')) return;
  const list = document.getElementById('articles-list');
  // Ordena por ano, mais recente primeiro
  const sorted = [...DATA.articles].sort((a, b) => b.year - a.year);
  list.innerHTML = sorted.map(a => `
    <li class="article-item">
      <span class="article-year">${a.year}</span>
      <div>
        <div class="article-title">
          <a href="${a.link}" target="_blank" rel="noopener">${a.title}</a>
        </div>
        <div class="article-venue">${a.venue}</div>
      </div>
      <span class="article-tag">${a.type}</span>
    </li>
  `).join('');
}

/* =========================================================
   Renderização — Poemas
   ========================================================= */
function renderPoems() {
  if (!elementExists('poems-list')) return;

  const poemsList = document.getElementById('poems-list');
  poemsList.innerHTML = DATA.poems.map((p, i) => {
    const slug = slugify(p.title);
    return `
      <li class="poem-item" data-index="${i}" data-slug="${slug}">
        <span class="poem-item-title">${p.title}</span>
        <span class="poem-item-year">${p.year}</span>
      </li>
    `;
  }).join('');

  // Event listeners
  document.querySelectorAll('.poem-item').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index, 10);
      const slug = item.dataset.slug;
      history.replaceState(null, '', `#${slug}`);
      activatePoem(index);
    });
  });

  // Lê hash da URL para abrir o poema certo (permite link direto)
  const hash = window.location.hash.replace('#', '');
  const initialIndex = hash
    ? DATA.poems.findIndex(p => slugify(p.title) === hash)
    : 0;
  activatePoem(initialIndex >= 0 ? initialIndex : 0);
}

function activatePoem(index) {
  const poem = DATA.poems[index];
  if (!poem) return;

  // Atualiza lista
  document.querySelectorAll('.poem-item').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });

  // Atualiza viewer
  const viewer = document.getElementById('poem-viewer');
  viewer.innerHTML = `
    <h3 class="poem-viewer-title">${poem.title}</h3>
    <p class="poem-viewer-year">${poem.year}</p>
    <div class="poem-viewer-body">${poem.body}</div>
  `;
}

/* =========================================================
   Inicialização
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderBooks();
  renderArticles();
  renderPoems();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
