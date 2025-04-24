// contact.js - JavaScript functionality for the contact page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const closeSuccess = document.getElementById('closeSuccess');
    
    // Add input event listeners to all form fields for real-time validation
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            validateField(this);
        });
        
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Close success message when close button is clicked
    if (closeSuccess) {
        closeSuccess.addEventListener('click', function() {
            formSuccess.style.display = 'none';
        });
    }
});

// Validate a single field
function validateField(field) {
    // Skip validation for optional fields
    if (!field.hasAttribute('required') && field.value.trim() === '') {
        clearError(field);
        return true;
    }
    
    let isValid = true;
    const fieldType = field.type;
    const fieldValue = field.value.trim();
    
    // Check for empty required fields
    if (field.hasAttribute('required') && fieldValue === '') {
        showError(field, 'This field is required');
        isValid = false;
    }
    // Check email format
    else if (fieldType === 'email' && fieldValue !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(fieldValue)) {
            showError(field, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(field);
        }
    }
    // Check minimum length for message
    else if (field.id === 'message' && fieldValue.length < 10) {
        showError(field, 'Your message should be at least 10 characters');
        isValid = false;
    }
    else {
        clearError(field);
    }
    
    return isValid;
}

// Form validation function
function validateContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    let isValid = true;
    
    // Validate all required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // If form is valid, show success message and reset form
    if (isValid) {
        form.reset();
        formSuccess.style.display = 'flex';
        return false; // Prevent form submission for this demo
    }
    
    return false; // Prevent form submission
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