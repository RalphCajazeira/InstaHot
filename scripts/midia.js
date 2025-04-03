function mostrarAba(aba) {
    const abas = ["imagens", "videos", "participacao"];
    abas.forEach((tab) => {
      document.getElementById("tab-" + tab).style.display = tab === aba ? "grid" : "none";
      document.querySelector(`.tab-btn[onclick="mostrarAba('${tab}')"]`).classList.toggle("active", tab === aba);
    });
  }
  
  function mostrarSecao(secao) {
    const secoes = ["postagens", "midia"];
    secoes.forEach((s) => {
      document.getElementById("secao-" + s).style.display = s === secao ? "block" : "none";
      document.querySelector(`.main-tab-btn[onclick="mostrarSecao('${s}')"]`).classList.toggle("active", s === secao);
    });
  }
  
  function renderMidias(perfilData) {
    const imagens = document.getElementById("tab-imagens");
    const videos = document.getElementById("tab-videos");
    const participacao = document.getElementById("tab-participacao");
  
    imagens.innerHTML = "";
    videos.innerHTML = "";
    participacao.innerHTML = "";
  
    perfilData.postagens.forEach(post => {
      const bloqueado = !isSubscribed;
      const tag = post.tipo === "video"
        ? "videos"
        : post.participacao ? "participacao" : "imagens";
  
      const badge = post.tipo === "video"
        ? `<div class="midia-info">${post.duracao || '0:00'}</div>`
        : post.quantidade > 1
          ? `<div class="midia-info">${post.quantidade} fotos</div>`
          : "";
  
      const item = `
        <div class="post">
          <div class="media-wrapper ${bloqueado ? 'locked' : ''}">
            <img src="${post.midia}" alt="midia">
            ${bloqueado ? '<div class="lock-overlay">🔒</div>' : ''}
            ${!bloqueado ? badge : ''}
          </div>
        </div>
      `;
  
      if (tag === "imagens") imagens.innerHTML += item;
      else if (tag === "videos") videos.innerHTML += item;
      else if (tag === "participacao") participacao.innerHTML += item;
    });
  
    mostrarAba("imagens");
  }
  