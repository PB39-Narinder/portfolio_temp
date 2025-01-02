// Projects section functionality
const projectFilters = {
    init() {
        this.cards = document.querySelectorAll('.cyber-card');
        this.setupFilters();
        this.setupSearch();
    },

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tech = btn.dataset.tech;
                this.filterProjects(tech);
            });
        });
    },

    setupSearch() {
        const searchInput = document.querySelector('.project-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                this.searchProjects(searchTerm);
            });
        }
    },

    filterProjects(tech) {
        this.cards.forEach(card => {
            const cardTechs = card.querySelectorAll('.tech-tags span');
            const hasMatch = Array.from(cardTechs).some(tag => 
                tag.textContent.toLowerCase().includes(tech.toLowerCase())
            );
            card.style.display = tech === 'all' || hasMatch ? 'block' : 'none';
        });
    },

    searchProjects(term) {
        this.cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const techs = Array.from(card.querySelectorAll('.tech-tags span'))
                .map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(term) || 
                techs.some(tech => tech.includes(term));
            
            card.style.display = matches ? 'block' : 'none';
        });
    }
}; 