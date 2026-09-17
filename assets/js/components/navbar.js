// Função global exigida pelo script do Google Translate
window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement(
    {
      pageLanguage: "pt",
      includedLanguages: "pt,en,es,ja",
      autoDisplay: false
    },
    "google_translate_element"
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("navbar");
  if (!navContainer) return;

  // 1. Carrega dinamicamente a API do Google Translate
  if (!document.getElementById("google-translate-script")) {
    const translateScript = document.createElement("script");
    translateScript.id = "google-translate-script";
    translateScript.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(translateScript);
  }

  // 2. Injeta a Navbar com o botão de idioma e o elemento oculto do Google
  navContainer.innerHTML = `
    <!-- Elemento padrão do Google oculto -->
    <div id="google_translate_element" style="display: none;"></div>

    <header class="navbar">
      <div class="nav-logo">
        <a href="index.html">
          <img src="./assets/imgs/logo.png" alt="Pokémon">
        </a>
      </div>

      <nav class="nav-menu">
        <a href="pokedex.html">POKÉDEX</a>
        <a href="artigos.html">ARTIGOS</a>
        <a href="wallpapers.html">AVATARES</a>
        <a href="cartas.html">CARTAS</a>
      </nav>

      <div class="nav-actions">
        <!-- Seletor de Idioma Personalizado -->
        <div class="lang-dropdown">
          <button class="lang-btn" id="lang-toggle-btn" title="Alterar Idioma">
            <i class="fa-solid fa-globe"></i>
            <span id="current-lang-text">PT</span>
          </button>
          <div class="lang-menu" id="lang-menu">
            <button class="lang-option" data-lang="pt">🇧🇷 Português</button>
            <button class="lang-option" data-lang="en">🇺🇸 English</button>
            <button class="lang-option" data-lang="es">🇪🇸 Español</button>
            <button class="lang-option" data-lang="ja">🇯🇵 日本語</button>
          </div>
        </div>

        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input type="text" class="search-input" placeholder="Buscar...">
        
        <div class="avatar" id="avatar-trigger" title="Alterar foto de perfil">
          <i class="fa-solid fa-user default-avatar-icon"></i>
        </div>
      </div>
    </header>

    <div id="avatar-popup" class="avatar-popup">
      <div class="avatar-grid">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu" class="avatar-option">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="Charmander" class="avatar-option">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="Bulbasaur" class="avatar-option">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" alt="Squirtle" class="avatar-option">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png" alt="Eevee" class="avatar-option">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" alt="Mewtwo" class="avatar-option">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="Gengar" class="avatar-option">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" alt="Snorlax" class="avatar-option">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png" alt="Jigglypuff" class="avatar-option">
      </div>
    </div>
  `;

  // --- Lógica do Botão de Idioma ---
  const langBtn = document.getElementById("lang-toggle-btn");
  const langMenu = document.getElementById("lang-menu");
  const langOptions = document.querySelectorAll(".lang-option");
  const currentLangText = document.getElementById("current-lang-text");

  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langMenu.classList.toggle("show");
  });

  langOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedLang = option.getAttribute("data-lang");
      currentLangText.textContent = selectedLang.toUpperCase();
      langMenu.classList.remove("show");

      // Dispara a troca no combo nativo do Google Translate
      const googleSelect = document.querySelector(".goog-te-combo");
      if (googleSelect) {
        googleSelect.value = selectedLang;
        googleSelect.dispatchEvent(new Event("change"));
      }
    });
  });

  // --- Lógica do Avatar e Fechamento de Menus ---
  const avatarTrigger = document.getElementById("avatar-trigger");
  const avatarPopup = document.getElementById("avatar-popup");
  const avatarOptions = document.querySelectorAll(".avatar-option");

  const savedAvatar = localStorage.getItem("user_avatar");
  if (savedAvatar) {
    avatarTrigger.innerHTML = `<img src="${savedAvatar}" alt="Perfil">`;
  }

  avatarTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    avatarPopup.style.display =
      avatarPopup.style.display === "block" ? "none" : "block";
  });

  // Fecha menus ao clicar fora
  document.addEventListener("click", (e) => {
    if (!avatarPopup.contains(e.target) && !avatarTrigger.contains(e.target)) {
      avatarPopup.style.display = "none";
    }
    if (!langMenu.contains(e.target) && !langBtn.contains(e.target)) {
      langMenu.classList.remove("show");
    }
  });

  avatarOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedSrc = option.src;
      avatarTrigger.innerHTML = `<img src="${selectedSrc}" alt="Perfil">`;
      localStorage.setItem("user_avatar", selectedSrc);
      avatarPopup.style.display = "none";
    });
  });
});