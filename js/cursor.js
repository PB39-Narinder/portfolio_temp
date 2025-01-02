// Cursor trail effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-trail');
    
    // Create trail effect
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    
    document.body.appendChild(trail);
    
    // Remove trail after animation
    setTimeout(() => {
        trail.remove();
    }, 1000);
}); 