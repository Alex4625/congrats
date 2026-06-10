const envelopeView = document.getElementById("envelopeView");
const messageView = document.getElementById("messageView");
const envelope = document.getElementById("envelope");
const openEnvelopeBtn = document.getElementById("openEnvelopeBtn");
const backBtn = document.getElementById("backBtn");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const greetingAudio = document.getElementById("greetingAudio");
const mainPhoto = document.getElementById("mainPhoto");
const photoFallback = document.getElementById("photoFallback");

const OPEN_ANIMATION_TIME = 850;

function showView(viewToShow) {
  envelopeView.classList.toggle("is-active", viewToShow === "envelope");
  messageView.classList.toggle("is-active", viewToShow === "message");
}

function updateMusicButton(isPlaying) {
  musicToggleBtn.textContent = isPlaying ? "Pause Lagu ⏸" : "Putar Lagu 🎵";
}

function stopAndResetAudio() {
  greetingAudio.pause();
  greetingAudio.currentTime = 0;
  updateMusicButton(false);
}

// Audio dimulai hanya setelah user klik tombol amplop.
function playSongFromStart() {
  greetingAudio.pause();
  greetingAudio.currentTime = 0;

  try {
    const playPromise = greetingAudio.play();

    updateMusicButton(true);

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        updateMusicButton(false);
      });
    }
  } catch (error) {
    updateMusicButton(false);
  }
}

openEnvelopeBtn.addEventListener("click", () => {
  openEnvelopeBtn.disabled = true;
  envelope.classList.add("is-opening");

  window.setTimeout(() => {
    showView("message");
    playSongFromStart();
    openEnvelopeBtn.disabled = false;
  }, OPEN_ANIMATION_TIME);
});

backBtn.addEventListener("click", () => {
  stopAndResetAudio();
  showView("envelope");
  envelope.classList.remove("is-opening");
});

musicToggleBtn.addEventListener("click", () => {
  if (greetingAudio.paused) {
    try {
      const playPromise = greetingAudio.play();
      updateMusicButton(true);

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          updateMusicButton(false);
        });
      }
    } catch (error) {
      updateMusicButton(false);
    }
  } else {
    greetingAudio.pause();
    updateMusicButton(false);
  }
});

greetingAudio.addEventListener("ended", () => {
  updateMusicButton(false);
});

greetingAudio.addEventListener("play", () => {
  updateMusicButton(true);
});

greetingAudio.addEventListener("pause", () => {
  if (messageView.classList.contains("is-active")) {
    updateMusicButton(false);
  }
});

// Fallback ringan jika foto belum dimasukkan ke folder assets.
mainPhoto.addEventListener("error", () => {
  mainPhoto.hidden = true;
  photoFallback.hidden = false;
});
