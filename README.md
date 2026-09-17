# ⚡ Pokémon Hub & Blog Técnico

Uma aplicação web moderna, responsiva e interativa desenvolvida com foco no universo Pokémon, integrando consumo assíncrono de APIs públicas, animações com física 3D e persistência de estado no navegador.

---

## 🚀 Funcionalidades Principais

* **🏠 Home Dinâmica:** Banner de apresentação, atalhos rápidos e seção *"Pokémon em Destaque"* que sorteia aleatoriamente uma criatura via API a cada carregamento.
* **📖 Pokédex Completa:** Listagem paginada com identificadores, tipagens elementais com estilização por cores temáticas e filtro de busca em tempo real.
* **🃏 Coleção de Cartas TCG:** Visualizador de cartas físicas integrado à Pokémon TCG API com efeito **Tilt 3D & Holo Shine** (reflexo de luz dinâmico e inclinação com a física do mouse).
* **📚 Central de Artigos:** Leitor interativo em formato modal abordando história da franquia, metagame de TCG e arquitetura técnica de consumo de APIs.
* **🖼️ Galeria de Avatares:** Seletor de imagens de perfil customizadas com persistência de dados local via `localStorage`.
* **🌐 Tradução Integrada:** Seletor de idiomas no cabeçalho com suporte a múltiplos idiomas utilizando a API do Google Translate.
* **📱 Layout 100% Responsivo:** Grid adaptável a smartphones, tablets e desktops, com background técnico minimalista em CSS puro.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica de páginas e modais acessíveis.
* **CSS3:** Flexbox, CSS Grid, variáveis customizadas, efeitos holográficos com `mix-blend-mode` e perspectiva 3D (`transform-style: preserve-3d`).
* **JavaScript (ES6+):** Manipulação de DOM, requisições assíncronas com `fetch` e `async/await`, lógica de debounce na busca e `localStorage`.
* **Font Awesome:** Iconografia moderna aplicada em botões, ações e rodapé social.
* **APIs Integradas:**
  * [PokeAPI](https://pokeapi.co/) — Dados estatísticos, tipagens e artworks oficiais em alta resolução.
  * [Pokémon TCG API](https://pokemontcg.io/) — Catálogo de cartas colecionáveis físicas.
  * [Google Translate API](https://translate.google.com/) — Internacionalização dinâmica da interface.

---

## 📁 Estrutura de Arquivos

```text
├── index.html                  # Página inicial com Hero e destaque dinâmico
├── pokedex.html                # Consulta e filtro de Pokémon
├── cartas.html                 # Galeria TCG com efeitos 3D
├── artigos.html                # Central de leitura com modais
├── wallpapers.html             # Galeria de avatares para download
└── assets/
    ├── css/
    │   ├── global.css          # Estilos globais, grid background e footer
    │   ├── navbar.css          # Header modular, pop-up de avatar e tradutor
    │   ├── pokedex.css         # Grade de cards temáticos por tipagem
    │   └── pages/              # Folhas de estilo dedicadas (home, cartas, artigos)
    ├── js/
    │   ├── api/pokeapi.js      # Funções de requisição HTTP à PokeAPI
    │   ├── components/
    │   │   └── navbar.js       # Injeção dinâmica de cabeçalho, avatar e tradução
    │   ├── pages/              # Scripts específicos de cada view (pokedex, cartas, etc.)
    │   └── main.js             # Lógica do Pokémon em destaque da Home
    └── imgs/                   # Logotipos e recursos visuais locais
💻 Como Executar o Projeto
Clone este repositório:

Bash
git clone [https://github.com/joaolmsr/NOME-DO-REPOSITORIO.git](https://github.com/joaolmsr/NOME-DO-REPOSITORIO.git)
Acesse a pasta do projeto:

Bash
cd NOME-DO-REPOSITORIO
Como o projeto consome módulos ES6 e APIs assíncronas, execute utilizando um servidor local para evitar bloqueios de CORS:

Pelo VS Code: Instale a extensão Live Server, clique com o botão direito no index.html e selecione "Open with Live Server".

Ou utilizando o Node.js / Python:

Bash
# Usando Python
python -m http.server 3000
