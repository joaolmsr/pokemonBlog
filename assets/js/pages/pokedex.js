import { getPokemons, getPokemonDetails } from "../api/pokeapi.js";

const list = document.getElementById("pokemon-list");
const btn = document.getElementById("loadMore");
const searchInput = document.getElementById("search");

let offset = 0;
const limit = 20;

async function loadPokemons() {
    btn.disabled = true;
    btn.textContent = "Carregando...";

    try {
        const data = await getPokemons(limit, offset);

        for (let p of data.results) {
            const poke = await getPokemonDetails(p.url);
            
            // Pega o tipo principal para pintar o card
            const primaryType = poke.types[0].type.name;
            const formattedId = `#${String(poke.id).padStart(3, '0')}`;
            const artwork = poke.sprites.other["official-artwork"].front_default || poke.sprites.front_default;

            const card = document.createElement("div");
            card.className = `pokemon-card type-${primaryType}`;
            card.setAttribute("data-name", poke.name.toLowerCase());

            const typesHtml = poke.types
                .map(t => `<span class="type-pill">${t.type.name}</span>`)
                .join("");

            card.innerHTML = `
                <span class="card-number">${formattedId}</span>
                <span class="card-name">${poke.name}</span>
                
                <div class="card-detail">
                    <div class="card-types">
                        ${typesHtml}
                    </div>
                    <img src="${artwork}" alt="${poke.name}">
                </div>
            `;

            list.appendChild(card);
        }

        offset += limit;
    } catch (error) {
        console.error("Erro ao carregar dados da Pokédex:", error);
    } finally {
        btn.disabled = false;
        btn.textContent = "Carregar mais";
    }
}

// Filtro de busca na lista carregada
searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".pokemon-card");

    cards.forEach(card => {
        const name = card.getAttribute("data-name");
        if (name.includes(term)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});

btn.addEventListener("click", loadPokemons);
loadPokemons();