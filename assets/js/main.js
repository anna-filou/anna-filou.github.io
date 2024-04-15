// Get the elements
const openMenu = document.getElementById('open-menu');
const moreButton = document.getElementById('more-button');
const moreButtonSvg = moreButton.querySelector('svg');

// Add a click event listener to the more-button
moreButton.addEventListener('click', (event) => {
  // Prevent the default link behavior
  event.preventDefault();

  // Toggle the visibility and animation of the open-menu div
  openMenu.classList.toggle('open');

  // Set aria-hidden attribute based on visibility
  openMenu.setAttribute('aria-hidden', !openMenu.classList.contains('open'));

    // Toggle the SVG icon
    if (openMenu.classList.contains('open')) {
    moreButtonSvg.innerHTML = `
        <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"/>

    `;
    } else {
    moreButtonSvg.innerHTML = `
        <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"/>
    `;
    }
});