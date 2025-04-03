let previewSelecionado = null;

function renderPrevias(perfilData) {
  const destaque = document.getElementById("preview-destaques");
  if (!destaque) return;

  destaque.innerHTML = "";
  perfilData.previas.forEach((prev) => {
    destaque.innerHTML += `
      <div class="preview-thumb" onclick="aoClicarNaPrevia('${prev.id}')">
        <img src="${prev.itens[0]}" />
        <div class="preview-overlay">${prev.titulo}</div>
      </div>
    `;
  });
}

function aoClicarNaPrevia(id) {
  const isSubscribed = localStorage.getItem("isSubscribed") === "true";
  const isFreeFollower = localStorage.getItem("isFreeFollower") === "true";

  if (isSubscribed || isFreeFollower) {
    abrirPreviasStories(id);
  } else {
    previewSelecionado = id;
    abrirModalGratuito();
  }
}

function abrirModalGratuito() {
  openModal(`
    <h2>Deseja seguir este perfil para acessar o conteúdo gratuito?</h2>
    <button class="pay-btn" onclick="confirmarGratuito()">Seguir e Acessar</button>
    <button class="pay-btn" onclick="closeModal()">Cancelar</button>
  `);
}

function confirmarGratuito() {
  localStorage.setItem("isFreeFollower", "true");
  previewsLiberadas = true;
  closeModal();
  renderPrevias(perfilData);

  if (previewSelecionado) {
    abrirPreviasStories(previewSelecionado);
    previewSelecionado = null;
  }
}

function abrirPreviasStories(previewId) {
  const isSubscribed = localStorage.getItem("isSubscribed") === "true";
  const isFreeFollower = localStorage.getItem("isFreeFollower") === "true";

  if (!isSubscribed && !isFreeFollower) {
    return abrirModalGratuito();
  }

  const previa = perfilData.previas.find((p) => p.id === previewId);
  if (previa) iniciarStories([previa]);
}
