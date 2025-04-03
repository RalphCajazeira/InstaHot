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

function renderPostagens(perfilData) {
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
            <span onclick="openComments(${post.id}, perfilData)">💬 ${post.comentarios.length}</span>
          </div>
          `
              : ""
          }
        </div>
      `;
  });
}
