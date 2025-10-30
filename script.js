// Scroll animation trigger
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".scroll-animate");
  const trigger = window.innerHeight / 1.2;

  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add("active");
  });

  // Show back-to-top button after scroll 200px
  if (window.scrollY > 200) {
    backToTopBtn.hidden = false;
  } else {
    backToTopBtn.hidden = true;
  }
});

// Animate Why ABS cards on page load
window.addEventListener('load', () => {
  document.querySelectorAll('#why-abs-section .card-left').forEach(el => {
    el.style.animationPlayState = 'running';
  });
  document.querySelectorAll('#why-abs-section .card-right').forEach(el => {
    el.style.animationPlayState = 'running';
  });
});

// Modal functionality setup
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-desc');
const modalTitle = document.getElementById('modal-title');
const modalCloseBtn = document.getElementById('modal-close');
const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

let lastFocusedElement;

document.querySelectorAll('.btn-modal').forEach(button => {
  button.addEventListener('click', e => {
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = "Notice";
    modalContent.textContent = "This feature is coming soon. We are working on it and it will be available shortly.";
    modal.hidden = false;
    trapFocus(modal);
    modalCloseBtn.focus();
  });
});

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', e => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', e => {
  if (!modal.hidden) {
    if (e.key === 'Escape') {
      closeModal();
    }
    if (e.key === 'Tab') {
      trapTabKey(e, modal);
    }
  }
});

function closeModal() {
  modal.hidden = true;
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function trapFocus(element) {
  const focusableElements = element.querySelectorAll(focusableSelectors);
  if (focusableElements.length) {
    focusableElements[0].focus();
  }
}

function trapTabKey(e, element) {
  const focusableElements = Array.from(element.querySelectorAll(focusableSelectors));
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
  } else {
    if (document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');
backToTopBtn.hidden = true;

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
  setTimeout(() => {
    location.reload();
  }, 400);
});

// Card hover border & shadow from its background color
document.querySelectorAll('#abs-cards-section .card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.border = '3px solid white';
    card.style.boxShadow = '0 6px 15px rgba(255, 255, 255, 0.3)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.border = 'none';
    card.style.boxShadow = '0 0 15px rgba(0,0,0,0.1)';
  });
});
