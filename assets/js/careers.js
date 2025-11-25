// Careers page functionality

// Toggle job description
function toggleJob(jobId) {
  const jobContent = document.getElementById(jobId);
  const toggleButton = event.currentTarget;
  const toggleText = toggleButton.querySelector('.toggle-text');
  const isExpanded = jobContent.classList.contains('expanded');
  
  if (isExpanded) {
    jobContent.classList.remove('expanded');
    toggleButton.classList.remove('active');
    toggleText.textContent = 'View Details';
  } else {
    jobContent.classList.add('expanded');
    toggleButton.classList.add('active');
    toggleText.textContent = 'Hide Details';
  }
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const scrollLinks = document.querySelectorAll('.scroll-link');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Auto-expand job if coming from direct link
  const hash = window.location.hash;
  if (hash && hash.startsWith('#job')) {
    const jobId = hash.substring(1);
    const jobContent = document.getElementById(jobId);
    
    if (jobContent) {
      setTimeout(() => {
        jobContent.classList.add('expanded');
        const toggleButton = jobContent.previousElementSibling.querySelector('.job-toggle');
        if (toggleButton) {
          toggleButton.classList.add('active');
          const toggleText = toggleButton.querySelector('.toggle-text');
          if (toggleText) {
            toggleText.textContent = 'Hide Details';
          }
        }
        
        // Scroll to job
        jobContent.closest('.job-card').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  }
});