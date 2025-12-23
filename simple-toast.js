// Simple Toast System
function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.simple-toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `simple-toast simple-toast-${type}`;
    toast.textContent = message;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: 'Cairo', Arial, sans-serif;
        font-size: 14px;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Form handler
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to tomorrow
    const visitDateInput = document.getElementById('visitDate');
    if (visitDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        visitDateInput.min = tomorrowStr;
        visitDateInput.value = tomorrowStr;
    }
    
    // Booking form handler
    const bookingForm = document.getElementById('plan');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const fullName = this.fullName.value;
            const email = this.email.value;
            const phone = this.phone.value;
            const visitDate = this.visitDate.value;
            const visitors = this.visitors.value;
            const ticketType = this.ticketType.value;
            
            // Validate
            if (!fullName || !email || !phone || !visitDate || !visitors || !ticketType) {
                showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // Phone validation
            const phonePattern = /^[0-9]{11}$/;
            if (!phonePattern.test(phone)) {
                showToast('يرجى إدخال رقم هاتف صحيح مكون من 11 رقم', 'error');
                return;
            }
            
            // Success
            showToast('تم الحجز بنجاح! ننتظر زيارتك في المتحف.   : ', 'success');
            
            // Reset form
            setTimeout(() => {
                this.reset();
                if (visitDateInput) {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    visitDateInput.value = tomorrow.toISOString().split('T')[0];
                }
            }, 100);
        });
    }
});
