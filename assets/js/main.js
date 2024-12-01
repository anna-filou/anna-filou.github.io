// Get the elements
const openMenu = document.getElementById('open-menu');
const moreButton = document.getElementById('more-button');

// Add a click event listener to the more-button
moreButton.addEventListener('click', (event) => {
  // Prevent the default link behavior
  event.preventDefault();

  // Toggle the visibility and animation of the open-menu div
  openMenu.classList.toggle('open');

  // Set aria-hidden attribute based on visibility
  openMenu.setAttribute('aria-hidden', !openMenu.classList.contains('open'));

    // Toggle the icon

    if (openMenu.classList.contains('open')) {
        moreButton.innerHTML = '✕';
    } else {
        moreButton.innerHTML = '•••';
    }
    
});