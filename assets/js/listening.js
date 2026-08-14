(function () {
  const cards = document.querySelectorAll('.listening-card--playable');
  const grid = document.querySelector('.listening-grid');
  const floatPause = document.querySelector('.listening-float-pause');
  let player = null;
  let currentCard = null;
  let playingVisible = true;
  let lastFailedSrc = '';

  const snippetSrc = (card) => {
    const src = card.getAttribute('data-snippet');
    if (!src) return '';
    return new URL(src, window.location.href).href;
  };

  const cacheBust = (src) => {
    const url = new URL(src);
    url.searchParams.set('retry', String(Date.now()));
    return url.href;
  };

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

  const destroyPlayer = () => {
    if (!player) return;
    const dying = player;
    player = null;
    dying.pause();
    dying.removeAttribute('src');
    if (dying.parentNode) dying.parentNode.removeChild(dying);
  };

  const pauseCurrent = () => {
    destroyPlayer();
    setPlaying(null);
  };

  const toggle = (card) => {
    if (currentCard === card && player && !player.paused) {
      pauseCurrent();
      return;
    }

    const src = snippetSrc(card);
    if (!src) return;

    destroyPlayer();

    const url = lastFailedSrc === src ? cacheBust(src) : src;
    lastFailedSrc = '';

    // One new Audio() per play; destroy the previous one. Do not put <audio>
    // on every card (preload stampede, especially on jekyll serve / WEBrick)
    // and do not reuse one element and swap src (play() aborts; first click
    // or mid-play switch looks like it starts then dies until a hard refresh).
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.setAttribute('playsinline', '');
    audio.hidden = true;
    document.body.appendChild(audio);
    player = audio;

    audio.addEventListener('ended', () => {
      if (player !== audio) return;
      player = null;
      setPlaying(null);
    });

    audio.addEventListener('error', () => {
      if (player !== audio) return;
      lastFailedSrc = src;
      destroyPlayer();
      setPlaying(null);
    });

    const playPromise = audio.play();
    setPlaying(card);

    playPromise.catch((error) => {
      if (player !== audio) return;
      if (error.name === 'AbortError') return;
      lastFailedSrc = src;
      destroyPlayer();
      setPlaying(null);
    });
  };

  if (floatPause) {
    floatPause.addEventListener('click', (event) => {
      event.stopPropagation();
      pauseCurrent();
    });
  }

  cards.forEach((card) => {
    const trigger = card.querySelector('.listening-cover-wrap');
    if (!trigger || !card.dataset.snippet) return;

    card.addEventListener('click', (event) => {
      if (!trigger.contains(event.target)) return;
      toggle(card);
    });

    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle(card);
      }
    });
  });
})();
