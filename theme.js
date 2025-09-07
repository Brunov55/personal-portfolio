/* =============================
   Theme Toggle Functionality
   ============================= */

class ThemeToggle {
  constructor() {
    this.themeToggleBtn = document.getElementById('themeToggle');
    this.toggleText = this.themeToggleBtn?.querySelector('.toggle_text');
    this.currentTheme = this.getStoredTheme() || 'dark';
    
    this.init();
  }

  init() {
    // Apply stored theme on load
    this.applyTheme(this.currentTheme);
    
    // Add event listener to toggle button
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    this.storeTheme(newTheme);
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.body.classList.toggle('light', theme === 'light');
    
    if (this.themeToggleBtn && this.toggleText) {
      if (theme === 'light') {
        this.themeToggleBtn.innerHTML = '🌞 <span class="toggle_text">Claro</span>';
        this.themeToggleBtn.setAttribute('aria-label', 'Cambiar a tema oscuro');
      } else {
        this.themeToggleBtn.innerHTML = '🌙 <span class="toggle_text">Oscuro</span>';
        this.themeToggleBtn.setAttribute('aria-label', 'Cambiar a tema claro');
      }
    }

    // Announce theme change to screen readers
    this.announceThemeChange(theme);
  }

  storeTheme(theme) {
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (e) {
      console.warn('Could not save theme preference:', e);
    }
  }

  getStoredTheme() {
    try {
      return localStorage.getItem('portfolio-theme');
    } catch (e) {
      console.warn('Could not read theme preference:', e);
      return null;
    }
  }

  announceThemeChange(theme) {
    const announcement = theme === 'light' ? 'Tema claro activado' : 'Tema oscuro activado';
    
    // Create or update announcement element
    let announcer = document.getElementById('theme-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'theme-announcer';
      announcer.className = 'visually-hidden';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
    }
    
    announcer.textContent = announcement;
  }
}

/* =============================
   Mobile Menu Functionality
   ============================= */

class MobileMenu {
  constructor() {
    this.menuToggle = document.getElementById('mobileMenuToggle');
    this.navMenu = document.getElementById('navMenu');
    this.isOpen = false;
    
    this.init();
  }

  init() {
    if (this.menuToggle && this.navMenu) {
      this.menuToggle.addEventListener('click', () => this.toggleMenu());
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.menuToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
          this.closeMenu();
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeMenu();
          this.menuToggle.focus();
        }
      });

      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 820 && this.isOpen) {
          this.closeMenu();
        }
      });
    }
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    this.navMenu.classList.add('is_open');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    this.menuToggle.setAttribute('aria-label', 'Cerrar menú');
    
    // Focus first menu item
    const firstLink = this.navMenu.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  closeMenu() {
    this.isOpen = false;
    this.navMenu.classList.remove('is_open');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.menuToggle.setAttribute('aria-label', 'Abrir menú');
  }
}

/* =============================
   Initialize on DOM Content Loaded
   ============================= */

document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggle();
  new MobileMenu();
});

/* =============================
   Export for potential module use
   ============================= */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ThemeToggle, MobileMenu };
}
