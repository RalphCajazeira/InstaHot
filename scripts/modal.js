function openModal(content) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    modal.classList.add("show");
    modalContent.innerHTML = content;
  }
  
  function closeModal() {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    modal.classList.remove("show");
    modalContent.innerHTML = "";
  
    const paymentModal = document.getElementById("paymentModal");
    if (paymentModal) paymentModal.classList.remove("show");
  
    const commentsModal = document.getElementById("commentsModal");
    if (commentsModal) commentsModal.remove();
  }
  
  function openPaymentModal() {
    const paymentModal = document.getElementById("paymentModal");
    paymentModal.classList.add("show");
  }
  
  function confirmPayment() {
    localStorage.setItem("isSubscribed", "true");
    isSubscribed = true;
    closeModal();
    renderPostagens(perfilData);
    renderMidias(perfilData);
  }
  
  function openComments(postId, data) {
    const post = data.postagens.find((p) => p.id === postId);
    const modal = document.createElement("div");
    modal.id = "commentsModal";
    modal.className = "modal show";
  
    const lista = post.comentarios.map(c => `<li><strong>${c.user}:</strong> ${c.texto}</li>`).join("");
  
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Comentários</h3>
        <ul>${lista || "<li>Nenhum comentário</li>"}</ul>
        <span class="close-btn" onclick="closeModal()">&times;</span>
      </div>
    `;
    document.body.appendChild(modal);
  }
  