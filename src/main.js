// Debounce function for performance optimization
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initCallbackButton();
  initContactForm();
  initScrollAnimations();
  initSmoothScroll();
  initHeaderScroll();
  addFooterPadding();
});

// Callback button functionality
function initCallbackButton() {
  const callbackBtn = document.getElementById('callback-btn');
  if (!callbackBtn) return;

  callbackBtn.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const nameInput = document.getElementById('name');
        if (nameInput) {
          nameInput.focus();
        }
      }, 800);
    }
  });
}

// Contact form handling with validation
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !phone) {
      showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }

    // Phone validation (French format)
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!phoneRegex.test(phone)) {
      showMessage('Veuillez entrer un numéro de téléphone valide.', 'error');
      return;
    }

    const formData = {
      name,
      phone,
      message,
      timestamp: new Date().toISOString()
    };

    console.log('Form submitted:', formData);

    // Show success message
    showMessage('Merci pour votre demande ! Nous vous rappellerons dans les plus brefs délais.', 'success');

    // Reset form
    contactForm.reset();
  });
}

// Show message to user
function showMessage(message, type = 'info') {
  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = `form-message form-message-${type}`;
  messageEl.textContent = message;
  messageEl.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(messageEl);

  // Remove after 5 seconds
  setTimeout(() => {
    messageEl.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => messageEl.remove(), 300);
  }, 5000);
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.service-card, .price-card, .review-card');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (targetId === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without triggering scroll
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}

// Header hide/show on scroll
function initHeaderScroll() {
  let lastScroll = 0;
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = throttle(() => {
    const currentScroll = window.pageYOffset;

    // Hide header on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// Add padding to body to prevent content from being hidden by sticky call bar
function addFooterPadding() {
  const stickyBar = document.querySelector('.sticky-call-bar');
  if (!stickyBar) return;

  // Add padding to body equal to sticky bar height
  const updatePadding = () => {
    const barHeight = stickyBar.offsetHeight;
    document.body.style.paddingBottom = `${barHeight}px`;
  };

  // Update on load and resize
  updatePadding();
  window.addEventListener('resize', updatePadding);
}