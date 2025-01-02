// Contact form functionality
const contactForm = {
    init() {
        this.form = document.querySelector('.cyber-form');
        this.setupFormValidation();
        this.setupFormSubmission();
    },

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('.cyber-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
        });
    },

    validateInput(input) {
        const isValid = input.checkValidity();
        input.classList.toggle('invalid', !isValid);
        
        // Add cyberpunk-style validation messages
        const errorMsg = input.nextElementSibling;
        if (!isValid && input.value) {
            if (!errorMsg || !errorMsg.classList.contains('error-msg')) {
                const msg = document.createElement('div');
                msg.className = 'error-msg';
                msg.innerHTML = `ERROR: ${input.validationMessage}`;
                input.parentNode.insertBefore(msg, input.nextSibling);
            }
        } else if (errorMsg && errorMsg.classList.contains('error-msg')) {
            errorMsg.remove();
        }
    },

    setupFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(this.form);
            const submitBtn = this.form.querySelector('button[type="submit"]');
            
            try {
                submitBtn.classList.add('loading');
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                this.showMessage('Message transmitted successfully!', 'success');
                this.form.reset();
            } catch (error) {
                this.showMessage('Transmission failed. Please retry.', 'error');
            } finally {
                submitBtn.classList.remove('loading');
            }
        });
    },

    showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `cyber-message ${type}`;
        message.innerHTML = `
            <div class="message-content">
                <span class="message-icon">${type === 'success' ? '✓' : '!'}</span>
                <span class="message-text">${text}</span>
            </div>
        `;
        
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }
}; 