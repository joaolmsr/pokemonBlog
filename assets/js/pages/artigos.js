document.addEventListener("DOMContentLoaded", () => {
  const readButtons = document.querySelectorAll(".btn-read");
  const closeButtons = document.querySelectorAll(".modal-close");
  const modals = document.querySelectorAll(".modal-overlay");

  // Abre o modal correspondente ao botão clicado
  readButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Fecha no botão X
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-overlay");
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });

  // Fecha ao clicar no fundo escuro
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Fecha com a tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach(m => (m.style.display = "none"));
      document.body.style.overflow = "auto";
    }
  });
});