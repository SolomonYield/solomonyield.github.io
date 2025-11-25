// Contact page functionality

// Select category and pre-fill form
function selectCategory(category) {
  // Remove selected class from all cards
  const cards = document.querySelectorAll('.category-card');
  cards.forEach(card => card.classList.remove('selected'));
  
  // Add selected class to clicked card
  event.currentTarget.classList.add('selected');
  
  // Scroll to form
  const form = document.getElementById('contact-form');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Pre-fill category in form
  const categorySelect = document.getElementById('category');
  if (categorySelect) {
    categorySelect.value = category;
  }
}

// Toggle FAQ items
function toggleFaq(button) {
  const faqItem = button.closest('.faq-item');
  const isActive = faqItem.classList.contains('active');
  
  // Close all FAQ items
  const allFaqs = document.querySelectorAll('.faq-item');
  allFaqs.forEach(item => item.classList.remove('active'));
  
  // Toggle current item
  if (!isActive) {
    faqItem.classList.add('active');
  }
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const submitButton = form.querySelector('.form-submit');
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    category: document.getElementById('category').value,
    message: document.getElementById('message').value,
    newsletter: document.getElementById('newsletter').checked
  };
  
  // Disable submit button
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  
  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Success
    formMessage.className = 'form-message success';
    formMessage.textContent = 'Thank you! Your message has been sent. We\'ll respond within 24 hours.';
    
    // Reset form
    form.reset();
    
    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
    
    // In production, replace the setTimeout above with actual API call:
    /*
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      formMessage.className = 'form-message success';
      formMessage.textContent = 'Thank you! Your message has been sent.';
      form.reset();
    })
    .catch(error => {
      formMessage.className = 'form-message error';
      formMessage.textContent = 'Sorry, something went wrong. Please try again or email us directly.';
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    });
    */
  }, 1500);
  
  return false;
}

// Pre-select category from URL parameter
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  
  if (category) {
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
      categorySelect.value = category;
    }
    
    // Highlight corresponding card
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
      const cardText = card.querySelector('h3').textContent.toLowerCase();
      if (cardText.includes(category)) {
        card.classList.add('selected');
      }
    });
    
    // Scroll to form
    setTimeout(() => {
      const form = document.getElementById('contact-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
  }
});