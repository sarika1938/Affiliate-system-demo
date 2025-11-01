/* Consolidated JS: scroll observers, back-to-top, modal focus trap, card hover
	 Fixes: - ensure backToTopBtn is defined before use
					 - use IntersectionObserver for scroll-animate and why-abs
					 - avoid animations running on load
*/

/* Back to top button (declare early) */
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
	backToTopBtn.hidden = true;
	backToTopBtn.addEventListener('click', () => {
		// Scroll to absolute page top (works with sticky/fixed headers)
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	});
}

/* Show/hide back-to-top on scroll */
window.addEventListener('scroll', () => {
	if (!backToTopBtn) return;
	backToTopBtn.hidden = window.scrollY <= 200;
});

/* Generic scroll-animate observer: add .in-view when element becomes visible */
const scrollAnimateObserver = new IntersectionObserver((entries, obs) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('in-view');
			obs.unobserve(entry.target);
		}
	});
}, { threshold: 0.15 });

document.querySelectorAll('.scroll-animate').forEach(el => {
	scrollAnimateObserver.observe(el);
});

/* Why-ABS section: trigger animations when cards visible and set direction
	 1st & 3rd -> slide from left, 2nd & 4th -> slide from right
*/
const whyAbsSection = document.getElementById('why-abs-section');
if (whyAbsSection) {
	const cards = Array.from(whyAbsSection.querySelectorAll('.card-box'));
	const whyObserver = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// add in-view plus direction depending on index
				const idx = cards.indexOf(entry.target);
				if (idx >= 0) {
					entry.target.classList.add('in-view');
					if ((idx + 1) % 2 === 1) {
						// 1st, 3rd (odd) -> from left
						entry.target.classList.add('slide-in-left');
					} else {
						// 2nd, 4th (even) -> from right
						entry.target.classList.add('slide-in-right');
					}
					obs.unobserve(entry.target);
				}
			}
		});
	}, { threshold: 0.2 });

	cards.forEach(c => whyObserver.observe(c));
}

/* Modal functionality setup (focus trap) */
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-desc');
const modalTitle = document.getElementById('modal-title');
const modalCloseBtn = document.getElementById('modal-close');
const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
let lastFocusedElement;

document.querySelectorAll('.btn-modal').forEach(button => {
	button.addEventListener('click', e => {
		lastFocusedElement = document.activeElement;
		if (modalTitle) modalTitle.textContent = 'Notice';
		if (modalContent) modalContent.textContent = button.dataset.modalMessage || 'This feature is coming soon. We are working on it and it will be available shortly.';
		if (modal) modal.hidden = false;
		if (modal) trapFocus(modal);
		if (modalCloseBtn) modalCloseBtn.focus();
	});
});

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (modal) {
	modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

document.addEventListener('keydown', e => {
	if (!modal || modal.hidden) return;
	if (e.key === 'Escape') closeModal();
	if (e.key === 'Tab') trapTabKey(e, modal);
});

function closeModal() {
	if (!modal) return;
	modal.hidden = true;
	if (lastFocusedElement) lastFocusedElement.focus();
}

function trapFocus(element) {
	const focusableElements = element.querySelectorAll(focusableSelectors);
	if (focusableElements.length) focusableElements[0].focus();
}

function trapTabKey(e, element) {
	const focusableElements = Array.from(element.querySelectorAll(focusableSelectors));
	if (!focusableElements.length) return;
	const firstElement = focusableElements[0];
	const lastElement = focusableElements[focusableElements.length - 1];
	if (e.shiftKey) {
		if (document.activeElement === firstElement) {
			e.preventDefault(); lastElement.focus();
		}
	} else {
		if (document.activeElement === lastElement) {
			e.preventDefault(); firstElement.focus();
		}
	}
}

/* Card hover border & shadow from its background color */
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
