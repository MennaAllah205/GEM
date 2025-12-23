// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navItems = document.querySelector('.nav-items');
    
    if (hamburger && navItems) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navItems.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navItems.contains(event.target)) {
                hamburger.classList.remove('active');
                navItems.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navItems.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navItems.classList.remove('active');
            });
        });
    }
});