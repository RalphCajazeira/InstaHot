function renderPerfil(perfilData) {
    const perfil = perfilData.perfil;
    const avatar = perfil?.imagens?.perfil || "assets/images/default-avatar.png";
  
    document.querySelector(".avatar").src = avatar;
    document.querySelector(".name").textContent = perfil.nome;
    document.querySelector(".handle").textContent = perfil.usuario;
    document.querySelector(".bio").textContent = perfil.bio;
    document.querySelector(".banner").style.backgroundImage = `url('${perfil.imagens.capa}')`;
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
  
    document.querySelector(".subscribe-btn").textContent = perfil.assinatura.botaoTexto;
  }
  