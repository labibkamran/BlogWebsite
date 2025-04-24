document.addEventListener("DOMContentLoaded", () => {
    alert("Welcome to Wanderlust Diaries!");
  
    const toggleButton = document.getElementById("toggleButton");
    const hiddenCards = document.querySelectorAll(".card.hidden");
  
    toggleButton.addEventListener("click", () => {
      hiddenCards.forEach(card => {
        card.style.display = (card.style.display === "none" || card.style.display === "") ? "block" : "none";
      });
  
      toggleButton.innerText = (hiddenCards[0].style.display === "block") ? "Show Less" : "Show More";
    });
  
    // Back to Top button
    const backToTopButton = document.createElement("button");
    backToTopButton.textContent = "↑ Back to Top";
    backToTopButton.id = "backToTop";
    document.body.appendChild(backToTopButton);
    Object.assign(backToTopButton.style, {
      position: "fixed", bottom: "40px", right: "40px", display: "none",
      padding: "10px 20px", borderRadius: "6px", border: "none",
      backgroundColor: "#0077cc", color: "white", cursor: "pointer", zIndex: "999"
    });
  
    window.addEventListener("scroll", () => {
      backToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
    });
  
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    const footer = document.querySelector("footer");
    const dateTime = document.createElement("p");
    setInterval(() => {
      dateTime.innerText = "Current Date & Time: " + new Date().toLocaleString();
    }, 1000);
    footer.appendChild(dateTime);
  });
  