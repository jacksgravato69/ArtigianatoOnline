document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".search-toggle");
    const container = document.querySelector(".search-container");
      
    toggle.addEventListener("click", () => {
        container.classList.toggle("active");
    });
});

