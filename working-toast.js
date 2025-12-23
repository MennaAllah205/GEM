// Working Toast System - Debug Version
console.log('Toast script loaded');

// Create toast function
function createToast(message, type = 'success') {
    console.log('Creating toast:', message, type);
    
    // Remove any existing toasts
    const existing = document.querySelectorAll('.debug-toast');
    existing.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `debug-toast debug-toast-${type}`;
    toast.textContent = message;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#28a745' : '#dc3545',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: '99999',
        fontFamily: "'Cairo', Arial, sans-serif",
        fontSize: '14px',
        maxWidth: '300px',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        border: '2px solid white'
    });
    
    // Add to body
    document.body.appendChild(toast);
    console.log('Toast added to body');
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
        console.log('Toast animated in');
    }, 50);
    
    // Remove after 4 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
                console.log('Toast removed');
            }
        }, 300);
    }, 4000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - setting up form');
    
    // Set up date input
    const visitDateInput = document.getElementById('visitDate');
    if (visitDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        visitDateInput.min = tomorrowStr;
        visitDateInput.value = tomorrowStr;
        console.log('Date input set up');
    }
    
    // Find and set up form
    const form = document.getElementById('plan');
    console.log('Form found:', form);
    
    if (form) {
        // Remove any existing listeners
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        // Add submit listener to the new form
        newForm.addEventListener('submit', function(e) {
            console.log('Form submit triggered');
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Prevented default');
            
            // Get values
            const fullName = this.fullName?.value || '';
            const email = this.email?.value || '';
            const phone = this.phone?.value || '';
            const visitDate = this.visitDate?.value || '';
            const visitors = this.visitors?.value || '';
            const ticketType = this.ticketType?.value || '';
            
            console.log('Form values:', { fullName, email, phone, visitDate, visitors, ticketType });
            
            // Validation
            if (!fullName || !email || !phone || !visitDate || !visitors || !ticketType) {
                console.log('Validation failed - missing fields');
                createToast('يرجى ملء جميع الحقول المطلوبة', 'error');
                return false;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                console.log('Email validation failed');
                createToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return false;
            }
            
            // Phone validation
            const phonePattern = /^[0-9]{11}$/;
            if (!phonePattern.test(phone)) {
                console.log('Phone validation failed');
                createToast('يرجى إدخال رقم هاتف صحيح مكون من 11 رقم', 'error');
                return false;
            }
            
            console.log('Validation passed - showing success toast');
            createToast('تم الحجز بنجاح! ننتظر زيارتك في المتحف.   : ', 'success');
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
                if (visitDateInput) {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    visitDateInput.value = tomorrow.toISOString().split('T')[0];
                }
                console.log('Form reset');
            }, 100);
            
            return false;
        });
        
        console.log('Form listener attached');
    } else {
        console.error('Form not found!');
    }
});

// Also make it globally available
window.showToast = createToast;
