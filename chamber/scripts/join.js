// Join page JavaScript functionality

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        // Focus management for accessibility
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.focus();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }
}

// Initialize modal event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Close modal when clicking the close button or backdrop
    document.querySelectorAll('.modal').forEach(modal => {
        // Close button click
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                closeModal(modal.id);
            });
        }

        // Backdrop click (clicking outside the modal content)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Find any open modal and close it
            const openModal = document.querySelector('.modal.active');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });

    // Populate timestamp field when form loads
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Form validation feedback
    const form = document.querySelector('form');
    if (form) {
        // Add real-time validation feedback
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                if (this.checkValidity()) {
                    this.style.borderColor = '#28a745';
                } else {
                    this.style.borderColor = '#dc3545';
                }
            });

            input.addEventListener('input', function () {
                if (this.checkValidity()) {
                    this.style.borderColor = '';
                }
            });
        });
    }
});