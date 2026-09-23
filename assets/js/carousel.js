(function () {
  function parseDuration(value) {
    const raw = (value || '').trim();
    if (!raw) return 0;
    if (raw.endsWith('ms')) return parseFloat(raw) / 1000;
    return parseFloat(raw);
  }

  function init(carousel) {
    const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
    const count = parseFloat(getComputedStyle(carousel).getPropertyValue('--no-of-slides'));
    const duration = parseDuration(getComputedStyle(carousel).getPropertyValue('--iteration-time'));
    if (!slides.length || !count || slides.length <= count || !duration) return;

    let distance = 0;
    let offset = 0;
    let paused = false;
    let dragging = false;
    let moved = false;
    let suppressClick = false;
    let startX = 0;
    let origin = 0;
    let pointerId = null;
    let last = 0;

    function measure() {
      const first = slides[0].getBoundingClientRect().left;
      const next = slides[count].getBoundingClientRect().left;
      const width = next - first;
      if (width > 0) distance = width;
    }

    function readOffset() {
      const transform = getComputedStyle(slides[0]).transform;
      if (!transform || transform === 'none') return 0;
      return new DOMMatrix(transform).m41;
    }

    function wrap(x) {
      if (!distance) return 0;
      x %= distance;
      if (x > 0) x -= distance;
      return x;
    }

    function render() {
      const value = 'translate3d(' + offset + 'px,0,0)';
      slides.forEach(function (slide) {
        slide.style.transform = value;
      });
    }

    offset = readOffset();
    carousel.classList.add('is-ready');
    measure();
    offset = wrap(offset);
    render();

    carousel.querySelectorAll('img').forEach(function (img) {
      img.draggable = false;
    });

    function frame(now) {
      if (document.hidden) {
        last = 0;
        requestAnimationFrame(frame);
        return;
      }
      if (!last) last = now;
      const dt = (now - last) / 1000;
      last = now;
      if (!paused && !dragging && distance) {
        offset = wrap(offset - (distance / duration) * dt);
        render();
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    carousel.addEventListener('pointerenter', function () {
      paused = true;
    });

    carousel.addEventListener('pointerleave', function () {
      if (dragging) return;
      paused = false;
    });

    carousel.addEventListener('pointerdown', function (event) {
      if (event.button !== 0) return;
      dragging = true;
      moved = false;
      pointerId = event.pointerId;
      startX = event.clientX;
      origin = offset;
      paused = true;
      carousel.classList.add('is-dragging');
      document.documentElement.classList.add('is-carousel-dragging');
      carousel.setPointerCapture(event.pointerId);
    });

    carousel.addEventListener('pointermove', function (event) {
      if (!dragging || event.pointerId !== pointerId) return;
      const dx = event.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      offset = wrap(origin + dx);
      render();
    });

    function endDrag(event) {
      if (!dragging || event.pointerId !== pointerId) return;
      dragging = false;
      carousel.classList.remove('is-dragging');
      document.documentElement.classList.remove('is-carousel-dragging');
      if (moved) suppressClick = true;
      const releasedOutside = event.pointerType === 'touch' || !carousel.matches(':hover');
      if (releasedOutside) paused = false;
    }

    carousel.addEventListener('pointerup', endDrag);
    carousel.addEventListener('pointercancel', endDrag);

    carousel.addEventListener('dragstart', function (event) {
      event.preventDefault();
    });

    carousel.addEventListener('click', function (event) {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    }, true);

    window.addEventListener('resize', function () {
      measure();
      offset = wrap(offset);
      render();
    });
  }

  document.querySelectorAll('.carousel--draggable').forEach(init);
})();
