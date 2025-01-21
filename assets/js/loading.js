// Show the loading animation when the script runs
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loading').style.display = 'block';
});

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

// Hide the loading animation once the page has fully loaded
window.addEventListener('load', function() {
    const loadingElement = document.getElementById('loading');
    const minLoadingTime = 300; // Minimum loading time in milliseconds

    // Ensure the loading screen is visible for at least minLoadingTime
    const startTime = performance.now();
    const hideLoadingScreen = () => {
        const elapsedTime = performance.now() - startTime;
        
        // Add event listener before starting the fade-out transition
        loadingElement.addEventListener('transitionend', (e) => {
            // Only proceed if this is the opacity transition
            if (e.propertyName === 'opacity') {
                // Remove event listeners to re-enable scrolling
                window.removeEventListener('scroll', preventScroll);
                window.removeEventListener('touchmove', preventScroll);
                window.removeEventListener('wheel', preventScroll);

                // Remove the loading element from the DOM completely
                loadingElement.remove();
            }
        });

        loadingElement.classList.add('fade-out');
    };

    // Always wait for minLoadingTime before starting fade-out
    setTimeout(hideLoadingScreen, Math.max(0, minLoadingTime - (performance.now() - startTime)));
});