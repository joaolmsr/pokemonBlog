const list = document.getElementById("cards-list");
const btn = document.getElementById("loadMoreCards");
const searchInput = document.getElementById("cardSearch");

let page = 1;
const pageSize = 16;
let currentQuery = "";
let debounceTimer;

async function loadCards(reset = false) {
  btn.disabled = true;
  btn.textContent = "Carregando...";

  if (reset) {
    page = 1;
    list.innerHTML = "";
  }

  const queryParam = currentQuery ? `&q=name:${encodeURIComponent(currentQuery)}*` : "";
  const endpoint = `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}${queryParam}`;

  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      if (reset) {
        list.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666;">Nenhuma carta encontrada.</p>`;
      }
      btn.style.display = "none";
      return;
    }

    btn.style.display = "inline-block";

    data.data.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.className = "tcg-card";
      cardEl.setAttribute("data-name", card.name.toLowerCase());

      cardEl.innerHTML = `
        <div class="tcg-shine"></div>
        <img src="${card.images.small}" alt="${card.name}" loading="lazy">
      `;

      attachHoloEffect(cardEl);
      list.appendChild(cardEl);
    });

    page++;
  } catch (error) {
    console.error("Erro ao carregar cartas TCG:", error);
    list.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #d61a1a;">Erro ao carregar cartas da API.</p>`;
  } finally {
    btn.disabled = false;
    btn.textContent = "Carregar mais cartas";
  }
}

function attachHoloEffect(card) {
  const shine = card.querySelector(".tcg-shine");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    card.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * 1.5}px 30px rgba(0, 0, 0, 0.35)`;

    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
    shine.style.opacity = "1";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transition = "transform 0.4s ease, box-shadow 0.4s ease";
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
    shine.style.opacity = "0";

    setTimeout(() => {
      card.style.transition = "transform 0.1s ease-out, box-shadow 0.1s ease-out";
    }, 400);
  });
}

searchInput.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  currentQuery = e.target.value.trim();

  debounceTimer = setTimeout(() => {
    loadCards(true);
  }, 450);
});

btn.addEventListener("click", () => loadCards(false));
loadCards();