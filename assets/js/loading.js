function Ticker(elem) {
    this.elem = elem;
    this.done = false;
    this.cycleCount = 5;
    this.cycleCurrent = 0;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split('');
    this.charsCount = this.chars.length;
    this.letters = Array.from(elem.querySelectorAll('span'));
    this.letterCount = this.letters.length;
    this.letterCurrent = 0;

    this.letters.forEach(letter => {
        letter.setAttribute('data-orig', letter.textContent);
        letter.textContent = '-';
    });
}

Ticker.prototype.getChar = function () {
    return this.chars[Math.floor(Math.random() * this.charsCount)];
};

Ticker.prototype.reset = function () {
    this.done = false;
    this.cycleCurrent = 0;
    this.letterCurrent = 0;

    this.letters.forEach(letter => {
        letter.textContent = letter.getAttribute('data-orig');
        letter.classList.remove('done');
    });

    this.loop();
};

Ticker.prototype.loop = function () {
    const self = this;

    this.letters.forEach((letter, index) => {
        if (index >= self.letterCurrent) {
            if (letter.textContent !== ' ') {
                letter.textContent = self.getChar();
                letter.style.opacity = Math.random();
            }
        }
    });

    if (this.cycleCurrent < this.cycleCount) {
        this.cycleCurrent++;
    } else if (this.letterCurrent < this.letterCount) {
        const currLetter = this.letters[this.letterCurrent];
        this.cycleCurrent = 0;
        currLetter.textContent = currLetter.getAttribute('data-orig');
        currLetter.style.opacity = 1;
        currLetter.classList.add('done');
        this.letterCurrent++;
    } else {
        this.done = true;
    }

    if (!this.done) {
        requestAnimationFrame(function () {
            self.loop();
        });
    } else {
        setTimeout(function () {
            self.reset();
        }, 750);
    }
};

// Initialize the Ticker
const words = document.querySelectorAll('.word');

words.forEach(word => {
    const ticker = new Ticker(word);
    word.dataset.ticker = ticker;
    ticker.reset();
});

// Prevent scrolling
function preventScroll(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

// Add event listeners to prevent scrolling
window.addEventListener('scroll', preventScroll, { passive: false });
window.addEventListener('touchmove', preventScroll, { passive: false });
window.addEventListener('wheel', preventScroll, { passive: false });

// Hide the loading animation and re-enable scrolling once the page has fully loaded
window.addEventListener('load', function() {
  document.getElementById('loading').style.display = 'none';

  // Remove event listeners to re-enable scrolling
  window.removeEventListener('scroll', preventScroll);
  window.removeEventListener('touchmove', preventScroll);
  window.removeEventListener('wheel', preventScroll);
});