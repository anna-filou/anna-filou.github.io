(function () {
  const player = document.getElementById('listening-player');
  if (!player) return;

  const cards = document.querySelectorAll('.listening-card[data-snippet]');
  const grid = document.querySelector('.listening-grid');
  let currentCard = null;
  let playRequest = 0;

  const setPlaying = (card) => {
    cards.forEach((c) => c.classList.remove('is-playing'));
    if (card) {
      card.classList.add('is-playing');
      grid.classList.add('has-playing');
    } else {
      grid.classList.remove('has-playing');
    }
  };

  const waitForSource = (src) => new Promise((resolve, reject) => {
    const currentPath = player.src ? new URL(player.src, window.location.href).pathname : '';

    if (currentPath === src && player.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      resolve();
      return;
    }

    const onReady = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error('audio failed to load'));
    };

    const cleanup = () => {
      player.removeEventListener('canplay', onReady);
      player.removeEventListener('error', onError);
    };

    player.addEventListener('canplay', onReady);
    player.addEventListener('error', onError);
    player.src = src;
    player.load();
  });

  const playCard = async (card) => {
    const src = card.dataset.snippet;
    if (!src) return;

    if (currentCard === card && !player.paused) {
      player.pause();
      currentCard = null;
      setPlaying(null);
      return;
    }

    const request = ++playRequest;

    try {
      await waitForSource(src);
      if (request !== playRequest) return;

      await player.play();
      if (request !== playRequest) return;

      currentCard = card;
      setPlaying(card);
    } catch (error) {
      if (request !== playRequest || error.name === 'AbortError') return;

      currentCard = null;
      setPlaying(null);
    }
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => playCard(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        playCard(card);
      }
    });
  });

  player.addEventListener('ended', () => {
    currentCard = null;
    setPlaying(null);
  });
})();
