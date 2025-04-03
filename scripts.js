const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const paymentModal = document.getElementById("paymentModal");
const lockedContent = document.getElementById("lockedContent");

function openModal(previewId) {
  modal.classList.add("show");
  if (previewId === "preview1") {
    modalContent.innerHTML = `<img src="https://images.unsplash.com/photo-1656457981333-a9e055bd783f?q=80&w=3052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">`;
  } else if (previewId === "preview2") {
    modalContent.innerHTML = `<video controls autoplay muted src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></video>`;
  }
}

function closeModal() {
  modal.classList.remove("show");
  modalContent.innerHTML = "";
  paymentModal.classList.remove("show");
}

function openPaymentModal() {
  paymentModal.classList.add("show");
}

function confirmPayment() {
  closeModal();
  lockedContent.innerHTML = `
    <div class="post">
      <img src="https://images.unsplash.com/photo-1544963151-fb47c1a06478?q=80&w=3333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <div class="info">
        <span>❤️ 24</span>
        <span>👎 3</span>
        <span>💬 5</span>
      </div>
    </div>
    <div class="post">
      <img src="https://images.unsplash.com/photo-1593836788196-9fd68e904906?q=80&w=3946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <div class="info">
        <span>❤️ 35</span>
        <span>👎 1</span>
        <span>💬 8</span>
      </div>
    </div>
    <div class="post">
      <img src="https://plus.unsplash.com/premium_photo-1661297485356-2497102824d0?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <div class="info">
        <span>❤️ 42</span>
        <span>👎 2</span>
        <span>💬 10</span>
      </div>
    </div>
  `;
}
