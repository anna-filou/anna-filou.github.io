(function() {
    'use strict';
    
    // Add class to enable custom scrollbar styling when JS is available
    document.documentElement.classList.add('js-enabled');
    
    function initCustomScrollbar(carousel) {
        // Wrap carousel in a container for scrollbar positioning
        const wrapper = document.createElement('div');
        wrapper.className = 'book-carousel-container';
        carousel.parentNode.insertBefore(wrapper, carousel);
        wrapper.appendChild(carousel);
        
        // Create scrollbar container
        const scrollbarWrapper = document.createElement('div');
        scrollbarWrapper.className = 'book-carousel-scrollbar-wrapper';
        
        const scrollbarTrack = document.createElement('div');
        scrollbarTrack.className = 'book-carousel-scrollbar-track';
        
        const scrollbarThumb = document.createElement('div');
        scrollbarThumb.className = 'book-carousel-scrollbar-thumb';
        
        scrollbarTrack.appendChild(scrollbarThumb);
        scrollbarWrapper.appendChild(scrollbarTrack);
        
        // Insert scrollbar into the wrapper container
        wrapper.appendChild(scrollbarWrapper);
        
        // Update scrollbar position
        function updateScrollbar() {
            // Don't update during dragging to avoid conflicts
            if (isDragging) return;
            
            const scrollLeft = carousel.scrollLeft;
            const scrollWidth = carousel.scrollWidth;
            const clientWidth = carousel.clientWidth;
            const maxScroll = scrollWidth - clientWidth;
            
            if (maxScroll <= 0) {
                scrollbarWrapper.style.display = 'none';
                return;
            }
            
            scrollbarWrapper.style.display = 'block';
            const trackWidth = scrollbarTrack.offsetWidth;
            
            // Calculate thumb width as percentage of track
            const thumbWidth = (clientWidth / scrollWidth) * trackWidth;
            const thumbWidthPercent = (thumbWidth / trackWidth) * 100;
            
            // Calculate thumb position - when at max scroll, thumb should be at (trackWidth - thumbWidth)
            const availableSpace = trackWidth - thumbWidth;
            const thumbPosition = maxScroll > 0 ? (scrollLeft / maxScroll) * availableSpace : 0;
            
            scrollbarThumb.style.width = thumbWidth + 'px';
            scrollbarThumb.style.transform = 'translateX(' + thumbPosition + 'px)';
        }
        
        // Handle scrollbar dragging
        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;
        
        scrollbarThumb.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
            startScrollLeft = carousel.scrollLeft;
            // Disable scroll-snap during dragging for smooth movement
            carousel.style.scrollSnapType = 'none';
            e.preventDefault();
            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', stopDrag);
        });
        
        function handleDrag(e) {
            if (!isDragging) return;
            e.preventDefault();
            const deltaX = e.clientX - startX;
            const trackWidth = scrollbarTrack.offsetWidth;
            const scrollWidth = carousel.scrollWidth;
            const clientWidth = carousel.clientWidth;
            const maxScroll = scrollWidth - clientWidth;
            const thumbWidth = (clientWidth / scrollWidth) * trackWidth;
            const availableSpace = trackWidth - thumbWidth;
            const scrollDelta = (deltaX / availableSpace) * maxScroll;
            const newScrollLeft = Math.max(0, Math.min(maxScroll, startScrollLeft + scrollDelta));
            
            // Update scroll directly for immediate response
            carousel.scrollLeft = newScrollLeft;
            
            // Update scrollbar thumb position manually during drag
            const thumbPosition = maxScroll > 0 ? (newScrollLeft / maxScroll) * availableSpace : 0;
            scrollbarThumb.style.width = thumbWidth + 'px';
            scrollbarThumb.style.transform = 'translateX(' + thumbPosition + 'px)';
        }
        
        function stopDrag() {
            isDragging = false;
            // Re-enable scroll-snap after dragging
            carousel.style.scrollSnapType = '';
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', stopDrag);
        }
        
        // Handle clicking on track
        scrollbarTrack.addEventListener('click', function(e) {
            if (e.target === scrollbarTrack) {
                const rect = scrollbarTrack.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const trackWidth = scrollbarTrack.offsetWidth;
                const scrollWidth = carousel.scrollWidth;
                const clientWidth = carousel.clientWidth;
                const maxScroll = scrollWidth - clientWidth;
                const thumbWidth = (clientWidth / scrollWidth) * trackWidth;
                const availableSpace = trackWidth - thumbWidth;
                const clickPercent = availableSpace > 0 ? clickX / availableSpace : 0;
                carousel.scrollLeft = Math.min(maxScroll, clickPercent * maxScroll);
            }
        });
        
        // Update on carousel scroll
        carousel.addEventListener('scroll', updateScrollbar);
        // Update on resize
        window.addEventListener('resize', updateScrollbar);
        // Initial update
        updateScrollbar();
    }
    
    // Initialize all carousels
    function initAllCarousels() {
        const carousels = document.querySelectorAll('.book-carousel');
        carousels.forEach(initCustomScrollbar);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllCarousels);
    } else {
        initAllCarousels();
    }
})();

