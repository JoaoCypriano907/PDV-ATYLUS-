/**
 * PDV ATYLUS — Main Interactive Script
 * Navigation, Tabs, FAQ Accordion, Modals & UI Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  localStorage.removeItem('pdv_theme');
  document.documentElement.removeAttribute('data-theme');
  initNavbar();
  initMobileMenu();
  initDemoTabs();
  initFaqAccordion();
  initModals();
  initBackToTop();
  initClipboard();
  initScrollAnimations();
  initModuleDrawers();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navDrawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const navLinks = document.querySelectorAll('.mobile-nav-drawer a');

  if (!toggleBtn || !navDrawer) return;

  const openDrawer = () => {
    navDrawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    navDrawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = navDrawer.classList.contains('active');
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. DEMONSTRATION TABS
   ========================================================================== */
function initDemoTabs() {
  const tabButtons = document.querySelectorAll('.demo-tab-btn');
  const tabPanels = document.querySelectorAll('.demo-panel');

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update button active state
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panels
      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   4. FAQ ACCORDION
   ========================================================================== */
function toggleFaqItem(btn, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const item = btn.closest('.faq-item-box') || btn.closest('.faq-item');
  if (!item) return;

  const isExpanded = item.classList.contains('active');

  // Close other open items for a clean accordion effect
  document.querySelectorAll('.faq-item-box, .faq-item').forEach(other => {
    if (other !== item && other.classList.contains('active')) {
      other.classList.remove('active');
      const otherBtn = other.querySelector('.faq-btn, .faq-question');
      if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
    }
  });

  if (isExpanded) {
    item.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
  } else {
    item.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
  }
}
window.toggleFaqItem = toggleFaqItem;

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item-box, .faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-btn, .faq-question');
    if (!trigger) return;

    if (!trigger.getAttribute('onclick')) {
      trigger.addEventListener('click', (e) => {
        toggleFaqItem(trigger, e);
      });
    }
  });
}

/* ==========================================================================
   5. MODALS (TERMS, PRIVACY, CHECKOUT, VIDEO)
   ========================================================================== */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modals = document.querySelectorAll('.modal-backdrop');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(targetModalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modals.forEach(modal => {
    const closeBtns = modal.querySelectorAll('.modal-close, [data-modal-close]');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close when clicking backdrop outside container
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Global ESC listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  });
}

/* ==========================================================================
   6. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   7. CLIPBOARD COPY UTILITY (FOR PIX KEY)
   ========================================================================== */
function initClipboard() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✓ Copiado com Sucesso!</span>';
        btn.classList.add('copied');

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('copied');
        }, 2500);
      } catch (err) {
        console.error('Falha ao copiar:', err);
      }
    });
  });
}

/* ==========================================================================
   8. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.fade-on-scroll');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: reveal immediately
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/* ==========================================================================
   9. RECURSOS OPCIONAIS / MODULES ACCORDION DRAWERS
   ========================================================================== */
function toggleModuleDrawer(btn, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const card = btn.closest('.module-card');
  if (!card) return;
  const drawer = card.querySelector('.module-info-drawer');
  if (!drawer) return;

  const isExpanded = drawer.classList.contains('active');
  if (isExpanded) {
    drawer.classList.remove('active');
    btn.innerHTML = 'Saiba mais <span>∨</span>';
  } else {
    drawer.classList.add('active');
    btn.innerHTML = 'Recolher <span>∧</span>';
  }
}
window.toggleModuleDrawer = toggleModuleDrawer;

function initModuleDrawers() {
  const btns = document.querySelectorAll('.module-saiba-mais-btn');
  btns.forEach(btn => {
    // Only bind if not already handled by inline onclick
    if (!btn.getAttribute('onclick')) {
      btn.addEventListener('click', (e) => {
        toggleModuleDrawer(btn, e);
      });
    }
  });
}
