let perfilData = {};
let isSubscribed = false;
let previewsLiberadas = false;

window.addEventListener("DOMContentLoaded", () => {
  // Reset de estado local
  localStorage.removeItem("isSubscribed");
  localStorage.removeItem("isFreeFollower");
  isSubscribed = false;
  previewsLiberadas = false;

  // Carregar dados do perfil (simulando banco de dados)
  fetch("DB/miakalifa_db.json")
    .then((res) => res.json())
    .then((data) => {
      perfilData = data;

      renderPerfil(perfilData);
      renderPostagens(perfilData);
      renderMidias(perfilData);
      renderPrevias(perfilData);

      mostrarSecao("postagens");
    });
});
