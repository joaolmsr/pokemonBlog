document.addEventListener("DOMContentLoaded", async () => {
  const nameEl = document.getElementById("highlight-name");
  const descEl = document.getElementById("highlight-desc");
  const imgEl = document.getElementById("highlight-img");
  const typesEl = document.getElementById("highlight-types");

  // Se não estiver na index, não faz nada
  if (!nameEl) return;

  try {
    // Sorteia um ID aleatório entre a 1ª e 2ª geração (1 a 251)
    const randomId = Math.floor(Math.random() * 251) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemon = await res.json();

    nameEl.textContent = `${pokemon.name} #${String(pokemon.id).padStart(3, "0")}`;
    descEl.textContent = `Experiência base de ${pokemon.base_experience} XP, medindo ${pokemon.height / 10}m e pesando ${pokemon.weight / 10}kg.`;
    imgEl.src = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;

    typesEl.innerHTML = pokemon.types
      .map(t => `<span class="highlight-type-badge">${t.type.name}</span>`)
      .join("");
  } catch (err) {
    nameEl.textContent = "Charizard #006";
    imgEl.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png";
  }
});