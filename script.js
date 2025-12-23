
window.addEventListener("load", function () {
    const splash = document.getElementById("splash");
    const content = document.querySelector(".container");

    setTimeout(() => {
        if (splash) {
            splash.style.display = "none";
        }
        if (content) {
            content.style.display = "block";
        }
    }, 2000); 
});

