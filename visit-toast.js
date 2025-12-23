// Toast Notification System for Visit Page
class ToastNotification {
    constructor() {
        this.toastContainer = null;
        this.init();
    }

    init() {
        // Create toast container
        this.toastContainer = document.createElement('div');
        this.toastContainer.className = 'toast-container';
        document.body.appendChild(this.toastContainer);
    }

    show(message, type = 'success', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Create toast content
        const toastContent = document.createElement('div');
        toastContent.className = 'toast-content';
        
        const icon = document.createElement('i');
        icon.className = 'toast-icon';
        
        // Set icon based on type
        switch(type) {
            case 'success':
                icon.className += ' fas fa-check-circle';
                break;
            case 'error':
                icon.className += ' fas fa-exclamation-circle';
                break;
            case 'warning':
                icon.className += 'fas fa-exclamation-triangle';
                break;
            case 'info':
                icon.className += 'fas fa-info-circle';
                break;
        }
        
        const messageElement = document.createElement('span');
        messageElement.className = 'toast-message';
        messageElement.textContent = message;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = () => this.remove(toast);
        
        toastContent.appendChild(icon);
        toastContent.appendChild(messageElement);
        toast.appendChild(toastContent);
        toast.appendChild(closeBtn);
        
        this.toastContainer.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('toast-show');
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            this.remove(toast);
        }, duration);
    }
    
    remove(toast) {
        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// Initialize toast system
const toast = new ToastNotification();

// Booking form handler for visit page
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success toast
            toast.show('تم الحجز بنجاح! ننتظر زيارتك في المتحف.   : ', 'success', 5000);
            
            // Reset form after a short delay to allow toast to show
            setTimeout(() => {
                this.reset();
                
                // Reset date to tomorrow
                const visitDateInput = document.getElementById('visitDate');
                if (visitDateInput) {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    visitDateInput.value = tomorrow.toISOString().split('T')[0];
                }
            }, 100);
        });
    }
});
