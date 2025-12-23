// Toast Notification System for Booking Form
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

// Set minimum date to tomorrow for visit date input
document.addEventListener('DOMContentLoaded', function() {
    const visitDateInput = document.getElementById('visitDate');
    if (visitDateInput) {
        // Get tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Format date as YYYY-MM-DD for input value
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        
        // Set minimum date to tomorrow
        visitDateInput.min = tomorrowStr;
        
        // Set default value to tomorrow
        visitDateInput.value = tomorrowStr;
    }
    
    // Booking form handler
    const bookingForm = document.getElementById('plan');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const fullName = formData.get('fullName');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const visitDate = formData.get('visitDate');
            const visitors = formData.get('visitors');
            const ticketType = formData.get('ticketType');
            
            // Validate form data
            if (!fullName || !email || !phone || !visitDate || !visitors || !ticketType) {
                toast.show('يرجى ملء جميع الحقول المطلوبة', 'error', 3000);
                return;
            }
            
            // Validate email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                toast.show('يرجى إدخال بريد إلكتروني صحيح', 'error', 3000);
                return;
            }
            
            // Validate phone format (11 digits)
            const phonePattern = /^[0-9]{11}$/;
            if (!phonePattern.test(phone)) {
                toast.show('يرجى إدخال رقم هاتف صحيح مكون من 11 رقم', 'error', 3000);
                return;
            }
            
            // Show success toast
            toast.show('تم الحجز بنجاح! ننتظر زيارتك في المتحف.   : ', 'success', 5000);
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
                
                // Reset date to tomorrow
                if (visitDateInput) {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    visitDateInput.value = tomorrow.toISOString().split('T')[0];
                }
            }, 100);
        });
    }
});
