import { getPokemons, getPokemonDetails } from "../api/pokeapi.js";

const list = document.getElementById("wallpaper-list");
const btn = document.getElementById("loadMoreWallpapers");

let offset = 0;
const limit = 12;

// Mapa de gradientes por tipo primário
const typeGradients = {
    grass: "linear-gradient(135deg, #11998e, #38ef7d)",
    fire: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    water: "linear-gradient(135deg, #2193b0, #6dd5ed)",
    bug: "linear-gradient(135deg, #9bb828, #556b2f)",
    normal: "linear-gradient(135deg, #8a9ba8, #606f7b)",
    poison: "linear-gradient(135deg, #8e2de2, #4a00e0)",
    electric: "linear-gradient(135deg, #f7971e, #ffd200)",
    ground: "linear-gradient(135deg, #ba8b02, #181818)",
    fairy: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    fighting: "linear-gradient(135deg, #e52d27, #b31217)",
    psychic: "linear-gradient(135deg, #ff0844, #ffb199)",
    rock: "linear-gradient(135deg, #3e5151, #decba4)",
    ghost: "linear-gradient(135deg, #302b63, #0f0c29)",
    dragon: "linear-gradient(135deg, #654ea3, #eaafc8)"
};

async function loadWallpapers() {
    btn.disabled = true;
    btn.textContent = "Carregando...";

    try {
        const data = await getPokemons(limit, offset);

        for (let p of data.results) {
            const poke = await getPokemonDetails(p.url);
            const primaryType = poke.types[0].type.name;

            // Prioriza imagem do Pokémon Home (3D HD) -> Official Artwork
            const imgUrl =
                poke.sprites.other?.home?.front_default ||
                poke.sprites.other?.["official-artwork"]?.front_default ||
                poke.sprites.front_default;

            if (!imgUrl) continue;

            const bgStyle = typeGradients[primaryType] || "linear-gradient(135deg, #3a6073, #16222a)";

            const card = document.createElement("div");
            card.className = "wallpaper-card";
            card.style.background = bgStyle;

            card.innerHTML = `
        <span class="wallpaper-title">${poke.name}</span>
        <img src="${imgUrl}" alt="${poke.name}" loading="lazy">
        <a href="${imgUrl}" target="_blank" download="${poke.name}-wallpaper.png" class="btn-download">
          <i class="fa-solid fa-download"></i> Baixar HD
        </a>
      `;

            list.appendChild(card);
        }

        offset += limit;
    } catch (err) {
        console.error("Erro ao carregar wallpapers:", err);
    } finally {
        btn.disabled = false;
        btn.textContent = "Carregar mais";
    }
}

btn.addEventListener("click", loadWallpapers);
loadWallpapers();