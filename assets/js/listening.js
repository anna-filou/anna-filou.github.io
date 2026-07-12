(function () {
  const cards = document.querySelectorAll('.listening-card--playable');
  const grid = document.querySelector('.listening-grid');
  let currentCard = null;

  const setPlaying = (card) => {
    cards.forEach((c) => c.classList.remove('is-playing'));
    if (card) {
      card.classList.add('is-playing');
      grid.classList.add('has-playing');
    } else {
      grid.classList.remove('has-playing');
    }
  };

  const pauseOthers = (activeAudio) => {
    cards.forEach((card) => {
      const audio = card.querySelector('audio');
      if (audio && audio !== activeAudio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  cards.forEach((card) => {
    const audio = card.querySelector('audio');
    if (!audio) return;

    const toggle = async () => {
      if (currentCard === card && !audio.paused) {
        audio.pause();
        currentCard = null;
        setPlaying(null);
        return;
      }

      pauseOthers(audio);
      audio.currentTime = 0;

      try {
        await audio.play();
        currentCard = card;
        setPlaying(card);
      } catch (error) {
        if (error.name === 'AbortError') return;
        currentCard = null;
        setPlaying(null);
      }
    };

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });

    audio.addEventListener('ended', () => {
      if (currentCard === card) {
        currentCard = null;
        setPlaying(null);
      }
    });
  });
})();
