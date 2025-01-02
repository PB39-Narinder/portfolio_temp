// Enhanced dark mode functionality
const darkMode = {
    init() {
        this.toggle = document.querySelector('.theme-toggle');
        this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.setupThemeToggle();
        this.loadSavedTheme();
    },

    setupThemeToggle() {
        this.toggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            this.saveTheme(document.documentElement.classList.contains('dark-mode'));
            this.updateToggleIcon();
            this.playToggleAnimation();
        });
    },

    loadSavedTheme() {
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark || (localStorage.getItem('darkMode') === null && this.prefersDark.matches)) {
            document.documentElement.classList.add('dark-mode');
        }
        this.updateToggleIcon();
    },

    saveTheme(isDark) {
        localStorage.setItem('darkMode', isDark);
    },

    updateToggleIcon() {
        const isDark = document.documentElement.classList.contains('dark-mode');
        this.toggle.innerHTML = isDark ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
    },

    playToggleAnimation() {
        document.body.style.transition = 'background-color 0.3s ease';
        this.toggle.classList.add('rotate');
        setTimeout(() => this.toggle.classList.remove('rotate'), 300);
    }
};

// Initialize dark mode
darkMode.init(); 