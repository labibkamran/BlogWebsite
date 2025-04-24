function toggleDescription(button) {
    const desc = button.previousElementSibling;
    const isVisible = desc.style.display === "block";

    desc.style.display = isVisible ? "none" : "block";
    button.textContent = isVisible ? "Show More" : "Show Less";
}