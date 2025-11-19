// Animations and interactive features

// Animated counter for statistics
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    
    if (current < target) {
      element.textContent = Math.floor(current) + '%';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '%';
    }
  };
  
  updateCounter();
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      
      // Animate counters when they come into view
      if (entry.target.classList.contains('stat-value') && entry.target.hasAttribute('data-target')) {
        animateCounter(entry.target);
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements on page load
document.addEventListener('DOMContentLoaded', function() {
  // Observe all cards
  const cards = document.querySelectorAll('.card, .solution-card, .visual-card');
  cards.forEach(card => {
    observer.observe(card);
  });
  
  // Observe sections
  const sections = document.querySelectorAll('.mission-content, .tech-content, .section-header');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Observe stat values
  const statValues = document.querySelectorAll('.stat-value[data-target]');
  statValues.forEach(stat => {
    observer.observe(stat);
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Parallax effect for hero background (subtle)
window.addEventListener('scroll', function() {
  const heroBg = document.querySelector('.hero-bg');
  
  if (heroBg) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    heroBg.style.transform = `translateY(${rate}px)`;
  }
});

// Add hover effect enhancement for cards
document.querySelectorAll('.card, .solution-card').forEach(card => {
  card.addEventListener('mouseenter', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});