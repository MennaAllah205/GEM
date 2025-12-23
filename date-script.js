// Set minimum date to today for visit date input
document.addEventListener('DOMContentLoaded', function() {
    const visitDateInput = document.getElementById('visitDate');
    if (visitDateInput) {
        // Get today's date
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Format date as YYYY-MM-DD for input value
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        
        // Set minimum date to tomorrow
        visitDateInput.min = tomorrowStr;
        
        // Set default value to tomorrow
        visitDateInput.value = tomorrowStr;
    }
});
