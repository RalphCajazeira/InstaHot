let stories = [];
let storyIndex = 0;
let storyItemIndex = 0;
let storyInterval;

function iniciarStories(destaques) {
  stories = destaques;
  storyIndex = 0;
  storyItemIndex = 0;
  document.getElementById("storyModal").classList.add("show");
  mostrarStoryAtual();

  // Habilita botão voltar no Android
  history.pushState({ story: true }, "");
}

function mostrarStoryAtual() {
  const story = stories[storyIndex];
  const item = story.itens[storyItemIndex];

  const storyImg = document.getElementById("storyImg");
  if (storyImg) {
    storyImg.src = item;
    storyImg.alt = "Story atual";
  }

  renderizarProgressBar();

  clearInterval(storyInterval);
  storyInterval = setInterval(() => {
    storyItemIndex++;
    if (storyItemIndex >= story.itens.length) {
      storyIndex++;
      storyItemIndex = 0;
      if (storyIndex >= stories.length) {
        return fecharStory();
      }
    }
    mostrarStoryAtual();
  }, 2500); // tempo por imagem
}

function avancarStory() {
  clearInterval(storyInterval);
  storyItemIndex++;
  if (storyItemIndex >= stories[storyIndex].itens.length) {
    storyIndex++;
    storyItemIndex = 0;
    if (storyIndex >= stories.length) {
      return fecharStory();
    }
  }
  mostrarStoryAtual();
}

function voltarStory() {
  clearInterval(storyInterval);
  storyItemIndex--;
  if (storyItemIndex < 0) {
    storyIndex--;
    if (storyIndex < 0) {
      return fecharStory();
    }
    storyItemIndex = stories[storyIndex].itens.length - 1;
  }
  mostrarStoryAtual();
}

function fecharStory() {
  clearInterval(storyInterval);
  document.getElementById("storyModal").classList.remove("show");
  storyIndex = 0;
  storyItemIndex = 0;

  // Remove o estado da história do histórico
  if (history.state && history.state.story) {
    history.back();
  }
}

function renderizarProgressBar() {
  const barra = document.getElementById("storyProgress");
  if (!barra) return;

  barra.innerHTML = "";

  const atual = stories[storyIndex];

  atual.itens.forEach((_, i) => {
    barra.innerHTML += `
      <div class="story-bar">
        <div class="story-bar-inner" style="width: ${
          i < storyItemIndex ? 100 : i === storyItemIndex ? 0 : 0
        }%"></div>
      </div>
    `;
  });

  setTimeout(() => {
    const atualBar =
      document.querySelectorAll(".story-bar-inner")[storyItemIndex];
    if (atualBar) atualBar.style.width = "100%";
  }, 100);
}

// Suporte ao botão de voltar do Android
window.addEventListener("popstate", () => {
  if (document.getElementById("storyModal").classList.contains("show")) {
    fecharStory();
  }
});
