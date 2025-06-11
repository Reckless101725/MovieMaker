document.addEventListener('DOMContentLoaded', function() {
    const leftBar = document.querySelector('.left-bar');
    const rightBar = document.querySelector('.right-bar');
    
    function flashRed(bar) {
        const barFill = bar.querySelector('.bar-fill');
        
        // Add red flash class
        barFill.classList.add('flash-red');
        
        // Remove red flash class after 300ms to fade back to cyan
        setTimeout(() => {
            barFill.classList.remove('flash-red');
        }, 300);
    }
    
    leftBar.addEventListener('click', function() {
        flashRed(leftBar);
    });
    
    rightBar.addEventListener('click', function() {
        flashRed(rightBar);
    });
});