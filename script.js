const envelopeView = document.getElementById("envelopeView");
const messageView = document.getElementById("messageView");
const envelope = document.getElementById("envelope");
const openEnvelopeBtn = document.getElementById("openEnvelopeBtn");
const backBtn = document.getElementById("backBtn");

const OPEN_ANIMATION_TIME = 850;

function showView(viewToShow) {
  envelopeView.classList.toggle("is-active", viewToShow === "envelope");
  messageView.classList.toggle("is-active", viewToShow === "message");
}

openEnvelopeBtn.addEventListener("click", () => {
  openEnvelopeBtn.disabled = true;
  envelope.classList.add("is-opening");

  window.setTimeout(() => {
    showView("message");
    openEnvelopeBtn.disabled = false;
  }, OPEN_ANIMATION_TIME);
});

backBtn.addEventListener("click", () => {
  showView("envelope");
  envelope.classList.remove("is-opening");
});
