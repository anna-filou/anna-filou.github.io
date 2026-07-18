(function () {
  const cards = document.querySelectorAll('.listening-card--playable');
  const grid = document.querySelector('.listening-grid');
  const floatPause = document.querySelector('.listening-float-pause');
  let currentCard = null;
  let playingVisible = true;

  const updateFloatPause = () => {
    if (!floatPause) return;
    const shouldShow = Boolean(currentCard) && !playingVisible;
    floatPause.hidden = !shouldShow;
  };

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      playingVisible = entry.isIntersecting;
      updateFloatPause();
    },
    { threshold: 0.15 }
  );

  const setPlaying = (card) => {
    cards.forEach((c) => c.classList.remove('is-playing'));
    if (currentCard) {
      visibilityObserver.unobserve(currentCard);
    }

    if (card) {
      card.classList.add('is-playing');
      grid.classList.add('has-playing');
      currentCard = card;
      playingVisible = true;
      visibilityObserver.observe(card);
    } else {
      grid.classList.remove('has-playing');
      currentCard = null;
      playingVisible = true;
    }

    updateFloatPause();
  };

  const pauseCurrent = () => {
    if (!currentCard) return;
    const audio = currentCard.querySelector('audio');
    if (audio) {
      audio.pause();
    }
    setPlaying(null);
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

  if (floatPause) {
    floatPause.addEventListener('click', (event) => {
      event.stopPropagation();
      pauseCurrent();
    });
  }

  cards.forEach((card) => {
    const audio = card.querySelector('audio');
    if (!audio) return;

    const toggle = async () => {
      if (currentCard === card && !audio.paused) {
        pauseCurrent();
        return;
      }

      pauseOthers(audio);
      audio.currentTime = 0;

      try {
        await audio.play();
        setPlaying(card);
      } catch (error) {
        if (error.name === 'AbortError') return;
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
        setPlaying(null);
      }
    });
  });
})();
