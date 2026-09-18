# Site pessoal — Livros & Artigos

Site estático (HTML + CSS + JavaScript puro), sem dependências de build.
Design minimalista com ar acadêmico.

## Arquivos

- `index.html` — estrutura das seções (Sobre, Livros, Artigos, Contato)
- `styles.css` — todo o visual (cores, tipografia, responsividade)
- `script.js` — conteúdo dos livros/artigos + interações (menu, animações)

## Como personalizar

1. Abra `script.js` e edite as listas `livros` e `artigos` no topo do arquivo.
2. Em `index.html`, troque "Nome do Autor", o texto da seção **Sobre** e os dados de **Contato** (GitHub e e-mail).
3. Ajuste cores em `styles.css` na seção `:root` (variáveis `--bg`, `--accent`, etc.), se quiser.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (por ex. `seu-usuario.github.io` para o site principal,
   ou qualquer nome para um projeto).
2. Envie estes três arquivos para a raiz do repositório:
   ```bash
   git init
   git add index.html styles.css script.js
   git commit -m "Site pessoal"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/seu-repo.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings → Pages**, selecione a branch `main` e a pasta `/ (root)`, e salve.
4. Em alguns minutos o site estará no ar em `https://seu-usuario.github.io/seu-repo/`.

As fontes são carregadas via Google Fonts (necessita conexão). Para uso totalmente offline,
você pode baixar as fontes e hospedá-las junto ao site.
