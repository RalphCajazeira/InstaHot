const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const paymentModal = document.getElementById("paymentModal");

let perfilData = {};
let isSubscribed = false;

function openModal(content) {
  modal.classList.add("show");
  modalContent.innerHTML = content;
}

function closeModal() {
  modal.classList.remove("show");
  modalContent.innerHTML = "";
  paymentModal.classList.remove("show");
  const commentsModal = document.getElementById("commentsModal");
  if (commentsModal) commentsModal.remove();
}

function openPaymentModal() {
  paymentModal.classList.add("show");
}

function confirmPayment() {
  localStorage.setItem("isSubscribed", "true");
  isSubscribed = true;
  closeModal();
  renderPostagens();
  renderMidias();
}

function mostrarSecao(secao) {
  const secoes = ["postagens", "midia"];
  secoes.forEach((s) => {
    document.getElementById("secao-" + s).style.display =
      s === secao ? "block" : "none";
    document
      .querySelector(`.main-tab-btn[onclick="mostrarSecao('${s}')"]`)
      .classList.toggle("active", s === secao);
  });
}

function mostrarAba(aba) {
  const abas = ["imagens", "videos", "participacao"];
  abas.forEach((tab) => {
    document.getElementById("tab-" + tab).style.display =
      tab === aba ? "grid" : "none";
    document
      .querySelector(`.tab-btn[onclick="mostrarAba('${tab}')"]`)
      .classList.toggle("active", tab === aba);
  });
}

function tempoRelativo(dataISO) {
  const data = new Date(dataISO);
  const agora = new Date();
  const segundos = Math.floor((agora - data) / 1000);

  const unidades = [
    { nome: "ano", segundos: 31536000 },
    { nome: "mês", segundos: 2592000 },
    { nome: "semana", segundos: 604800 },
    { nome: "dia", segundos: 86400 },
    { nome: "hora", segundos: 3600 },
    { nome: "minuto", segundos: 60 },
    { nome: "segundo", segundos: 1 },
  ];

  for (let unidade of unidades) {
    const quantidade = Math.floor(segundos / unidade.segundos);
    if (quantidade >= 1) {
      return `há ${quantidade} ${unidade.nome}${quantidade > 1 ? "s" : ""}`;
    }
  }
  return "agora mesmo";
}

function openComments(postId) {
  const post = perfilData.postagens.find((p) => p.id === postId);
  const modal = document.createElement("div");
  modal.id = "commentsModal";
  modal.className = "modal show";

  const lista = post.comentarios
    .map((c) => `<li><strong>${c.user}:</strong> ${c.texto}</li>`)
    .join("");

  modal.innerHTML = `
    <div class="modal-content">
      <h3>Comentários</h3>
      <ul>${lista || "<li>Nenhum comentário</li>"}</ul>
      <span class="close-btn" onclick="closeModal()">&times;</span>
    </div>
  `;
  document.body.appendChild(modal);
}

function renderPerfil() {
  const perfil = perfilData.perfil;

  document.querySelector(".avatar").src = perfil.imagens.perfil;
  document.querySelector(".name").textContent = perfil.nome;
  document.querySelector(".handle").textContent = perfil.usuario;
  document.querySelector(".bio").textContent = perfil.bio;
  document.querySelector(
    ".banner"
  ).style.backgroundImage = `url('${perfil.imagens.capa}')`;
  document.querySelector(".external-link").href = perfil.link;

  document.querySelector(".tags").textContent = perfil.tags.join(" ");
  document.querySelector(".stats").innerHTML = `
    <div><strong>${perfil.stats.posts}</strong><br>posts</div>
    <div><strong>${perfil.stats.seguidores}</strong><br>seguidores</div>
    <div><strong>${perfil.stats.curtidas}</strong><br>curtidas</div>
  `;

  const actions = document.querySelector(".profile-actions");
  actions.innerHTML = "";
  perfil.acoes.forEach((texto) => {
    const btn = document.createElement("button");
    btn.className = "action-btn";
    btn.textContent = texto;
    actions.appendChild(btn);
  });

  const assinatura = document.querySelector(".subscribe-btn");
  assinatura.textContent = perfil.assinatura.botaoTexto;
}

function renderPostagens() {
  const container = document.getElementById("tab-postagens");
  container.innerHTML = "";

  perfilData.postagens.forEach((post) => {
    const bloqueado = !isSubscribed;
    container.innerHTML += `
      <div class="postagem">
        <div class="post-header">
          <img src="${perfilData.perfil.imagens.perfil}" alt="user" />
          <div>
            <div class="post-user">${perfilData.perfil.nome}</div>
            <div class="post-time">${tempoRelativo(post.data)}</div>
          </div>
        </div>
        <div class="post-body">
          <p>${post.texto}</p>
          <div class="media-wrapper ${bloqueado ? "locked" : ""}">
            <img src="${post.midia}" alt="post" />
            ${
              bloqueado
                ? '<div class="lock-overlay">🔒 Assine para ver</div>'
                : ""
            }
          </div>
        </div>
        ${
          !bloqueado
            ? `
        <div class="post-actions">
          <span>❤️ ${post.likes}</span>
          <span onclick="openComments(${post.id})">💬 ${post.comentarios.length}</span>
        </div>
        `
            : ""
        }
      </div>
    `;
  });
}

function renderMidias() {
  const imagens = document.getElementById("tab-imagens");
  const videos = document.getElementById("tab-videos");
  const participacao = document.getElementById("tab-participacao");

  imagens.innerHTML = "";
  videos.innerHTML = "";
  participacao.innerHTML = "";

  perfilData.postagens.forEach((post) => {
    const bloqueado = !isSubscribed;
    const tag =
      post.tipo === "video"
        ? "videos"
        : post.participacao
        ? "participacao"
        : "imagens";

    const badge =
      post.tipo === "video"
        ? `<div class="midia-info">${post.duracao || "0:00"}</div>`
        : post.quantidade > 1
        ? `<div class="midia-info">${post.quantidade} fotos</div>`
        : "";

    const item = `
      <div class="post">
        <div class="media-wrapper ${bloqueado ? "locked" : ""}">
          <img src="${post.midia}" alt="midia">
          ${bloqueado ? '<div class="lock-overlay">🔒</div>' : ""}
          ${!bloqueado ? badge : ""}
        </div>
      </div>
    `;

    if (tag === "imagens") imagens.innerHTML += item;
    else if (tag === "videos") videos.innerHTML += item;
    else if (tag === "participacao") participacao.innerHTML += item;
  });

  mostrarAba("imagens");
}

function renderPrevias() {
  const destaque = document.getElementById("preview-destaques");
  if (!destaque) return;

  destaque.innerHTML = "";
  perfilData.previas.forEach((prev) => {
    destaque.innerHTML += `
      <div class="preview-thumb" onclick="openModal('<img src=\'${prev.src}\' />')">
        <img src="${prev.src}" />
        <div class="preview-overlay">Preview</div>
      </div>
    `;
  });
}

window.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem("isSubscribed");
  isSubscribed = false;

  fetch("DB/miakalifa_db.json")
    .then((res) => res.json())
    .then((data) => {
      perfilData = data;
      renderPerfil();
      renderPostagens();
      renderMidias();
      renderPrevias();
      mostrarSecao("postagens");
    });
});
