// common.js - Shared JavaScript functionality for WanderWorld travel blog

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Display welcome message (for index.html)
    if (document.body.classList.contains('home-page')) {
        setTimeout(() => {
            alert('Welcome to WanderWorld - Explore the World with Us!');
        }, 500);
    }
    
    // Initialize current date and time in footer
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Initialize Back to Top button
    initBackToTop();
    
    // Show/Hide Content Toggle
    initToggleContent();
});

// Update Date and Time in Footer
function updateDateTime() {
    const dateTimeElement = document.getElementById('current-datetime');
    if (dateTimeElement) {
        const now = new Date();
        dateTimeElement.textContent = now.toLocaleString();
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Toggle Content (Show More / Show Less)
function initToggleContent() {
    const toggleButtons = document.querySelectorAll('.toggle-button');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                if (targetContent.classList.contains('collapsed')) {
                    targetContent.classList.remove('collapsed');
                    this.textContent = 'Show Less';
                } else {
                    targetContent.classList.add('collapsed');
                    this.textContent = 'Show More';
                }
            }
        });
    });
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    
    if (!form) return false;
    
    let isValid = true;
    
    // Check required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        } else {
            clearError(field);
        }
    });
    
    // Check email format
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
            showError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    return isValid;
}

// Show error message
function showError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
}

// Clear error message
function clearError(field) {
    field.classList.remove('error');
    field.classList.add('success');
    
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.style.display = 'none';
    }
}