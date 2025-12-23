 document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("bookingForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // يمنع الفورم من الإرسال الفعلي
        alert("Done Successfully!"); // رسالة تأكيد
        form.reset(); // يمسح الحقول بعد الضغط
    });
});