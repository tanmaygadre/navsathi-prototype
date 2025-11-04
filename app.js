// NAVSATHI - FIXED JAVASCRIPT
class NavSathiApp {
  constructor() {
    this.currentScreen = 'onboarding-welcome';
    this.previousScreen = null;
    this.contacts = [
      { name: 'Priya (Daughter)', phone: '+91-98765-43210', type: 'family' },
      { name: 'Dr. Patel', phone: '+91-97654-32109', type: 'doctor' },
      { name: 'Emergency Services', phone: '112', type: 'emergency' }
    ];
    this.settings = {
      textSize: 20,
      highContrast: false,
      darkMode: false
    };
    this.achievements = [
      { id: 'first_call', title: 'Made Your First Call!', description: 'You are now independent with voice calls', unlocked: false, icon: '📞' },
      { id: 'week_streak', title: 'One Week Streak', description: 'You used NavSathi every single day', unlocked: false, icon: '🔥' },
      { id: 'bill_payment', title: 'Money Master', description: 'Successfully made your first payment', unlocked: false, icon: '💰' },
      { id: 'health_appointment', title: 'Health Hero', description: 'Booked your first doctor appointment', unlocked: false, icon: '🏥' },
      { id: 'family_connect', title: 'Family First', description: 'Connected with family 10 times', unlocked: false, icon: '👨👩👧👦' }
    ];
    this.stats = {
      independenceDays: 7,
      streakDays: 5,
      tasksToday: 3,
      familyCallsCount: 0,
      daysUsed: 8
    };
    this.pendingAction = null;
    this.isPremium = false;
    this.init();
  }

  init() {
    this.setupTextSizeSliders();
    this.setupContrastToggle();
    this.setupDarkModeToggle();
    this.updateStats();
  }

  // FIXED: Separate setup for text size sliders ONLY
  setupTextSizeSliders() {
    const allSliders = document.querySelectorAll('input[type="range"]');
    allSliders.forEach(slider => {
      // Only attach listener if it's a text-size slider
      if (slider.id.includes('text-size') || slider.getAttribute('data-type') === 'text-size') {
        slider.addEventListener('input', (e) => {
          this.updateTextSize(e.target.value);
        });
        slider.value = this.settings.textSize;
      }
    });
  }

  // FIXED: Separate setup for contrast toggle ONLY
  setupContrastToggle() {
    const contrastCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    contrastCheckboxes.forEach(checkbox => {
      // Only attach listener if it's a contrast checkbox
      if (checkbox.id.includes('contrast') || checkbox.getAttribute('data-type') === 'contrast') {
        checkbox.addEventListener('change', (e) => {
          this.toggleContrast(e.target.checked);
        });
      }
    });
  }

  // FIXED: Separate setup for dark mode toggle ONLY
  setupDarkModeToggle() {
    const darkModeCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    darkModeCheckboxes.forEach(checkbox => {
      // Only attach listener if it's a dark-mode checkbox
      if (checkbox.id.includes('dark-mode') || checkbox.getAttribute('data-type') === 'dark-mode') {
        checkbox.addEventListener('change', (e) => {
          this.toggleDarkMode(e.target.checked);
        });
      }
    });
  }

  nextScreen(screenId) {
    if (this.currentScreen !== screenId) {
      this.previousScreen = this.currentScreen;
    }
    this.currentScreen = screenId;
    this.showScreen(screenId);
  }

  goBack() {
    if (this.previousScreen && this.previousScreen !== 'home-screen') {
      this.currentScreen = this.previousScreen;
      this.previousScreen = null;
      this.showScreen(this.currentScreen);
    } else {
      this.currentScreen = 'home-screen';
      this.previousScreen = null;
      this.showScreen('home-screen');
    }
  }

  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add('active');

      if (screenId === 'contacts-screen') {
        this.renderContacts();
      } else if (screenId === 'achievements-screen') {
        this.renderAchievements();
      } else if (screenId === 'family-portal') {
        this.renderFamilyPortal();
      } else if (screenId === 'onboarding-accessibility') {
        // Re-setup all listeners when accessibility screen loads
        this.setupTextSizeSliders();
        this.setupContrastToggle();
        this.setupDarkModeToggle();
      }
    }
  }

  saveContacts() {
    this.contacts = [
      { name: document.getElementById('contact1-name').value || 'Priya (Daughter)', phone: document.getElementById('contact1-phone').value || '+91-98765-43210', type: 'family' },
      { name: document.getElementById('contact2-name').value || 'Dr. Patel', phone: document.getElementById('contact2-phone').value || '+91-97654-32109', type: 'doctor' },
      { name: document.getElementById('contact3-name').value || 'Emergency Services', phone: document.getElementById('contact3-phone').value || '112', type: 'emergency' }
    ];
    this.nextScreen('onboarding-settings');
  }

  updateTextSize(value) {
    value = parseInt(value);
    this.settings.textSize = value;

    document.documentElement.style.fontSize = value + 'px';
    document.body.style.fontSize = value + 'px';

    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, label, button, .text, .label, .heading, .title, .content, .body-text');
    elements.forEach(el => {
      el.style.fontSize = (value * 1.1) + 'px';
    });

    const displays = document.querySelectorAll('[id$="text-size-value"]');
    displays.forEach(display => {
      display.textContent = value + 'px';
    });

    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
      if (slider.id.includes('text-size') || slider.getAttribute('data-type') === 'text-size') {
        slider.value = value;
      }
    });

    console.log('Text size updated to:', value + 'px');
  }

  toggleContrast(enabled) {
    this.settings.highContrast = enabled;
    console.log('High Contrast toggled to:', enabled);

    if (enabled) {
      document.body.setAttribute('data-contrast', 'high');
    } else {
      document.body.removeAttribute('data-contrast');
    }

    // Update all contrast checkboxes to match state
    const contrastToggles = document.querySelectorAll('input[type="checkbox"]');
    contrastToggles.forEach(toggle => {
      if (toggle.id.includes('contrast') || toggle.getAttribute('data-type') === 'contrast') {
        toggle.checked = enabled;
      }
    });
  }

  toggleDarkMode(enabled) {
    this.settings.darkMode = enabled;
    console.log('Dark Mode toggled to:', enabled);

    if (enabled) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }

    // Update all dark mode checkboxes to match state
    const darkModeToggles = document.querySelectorAll('input[type="checkbox"]');
    darkModeToggles.forEach(toggle => {
      if (toggle.id.includes('dark-mode') || toggle.getAttribute('data-type') === 'dark-mode') {
        toggle.checked = enabled;
      }
    });
  }

  openMenu() {
    this.nextScreen('settings-screen');
  }

  completeOnboarding() {
    this.showScreen('home-screen');
    this.currentScreen = 'home-screen';
    this.previousScreen = null;
    this.showToast('Welcome to NavSathi! 🎉');
  }

  showConfirmation(actionType) {
    this.pendingAction = actionType;
    const icon = document.getElementById('confirmation-icon');
    const question = document.getElementById('confirmation-question');
    const detail = document.getElementById('confirmation-detail');

    switch(actionType) {
      case 'health':
        icon.textContent = '🏥';
        question.textContent = 'Open Health Services?';
        detail.textContent = 'View doctors, medicines, and appointments';
        break;
      case 'family':
        icon.textContent = '👨👩👧👦';
        question.textContent = 'Connect with Family?';
        detail.textContent = 'Call or message your loved ones';
        break;
      case 'services':
        icon.textContent = '🛒';
        question.textContent = 'Open Services?';
        detail.textContent = 'Shop for groceries and more';
        break;
      case 'emergency':
        icon.textContent = '🚨';
        question.textContent = 'Call Emergency Services?';
        detail.textContent = 'This will call 112 immediately';
        break;
      case 'entertainment':
        icon.textContent = '🎵';
        question.textContent = 'Open Entertainment?';
        detail.textContent = 'News, videos, and music';
        break;
    }

    this.previousScreen = 'home-screen';
    this.currentScreen = 'confirmation-screen';
    this.showScreen('confirmation-screen');
  }

  executeAction() {
    const action = this.pendingAction;
    if (action === 'emergency') {
      this.showSuccessMessage('Emergency services contacted! 🚨', 'Help is on the way');
      this.stats.tasksToday++;

      setTimeout(() => {
        this.currentScreen = 'home-screen';
        this.previousScreen = null;
        this.showScreen('home-screen');
      }, 2000);
    } else {
      this.previousScreen = 'home-screen';
      this.currentScreen = action + '-screen';
      this.showScreen(action + '-screen');
    }
    this.stats.tasksToday++;
    this.updateStats();
  }

  cancelAction() {
    this.pendingAction = null;
    this.currentScreen = 'home-screen';
    this.previousScreen = null;
    this.showScreen('home-screen');
  }

  callContact(type) {
    const contact = this.contacts.find(c => c.type === type);
    if (contact) {
      this.showSuccessMessage('Calling ' + contact.name + '... 📞', 'Opening phone app for ' + contact.phone);
      this.stats.tasksToday++;

      if (type === 'family') {
        this.stats.familyCallsCount++;
        if (!this.achievements[0].unlocked) {
          this.achievements[0].unlocked = true;
          this.showToast('Achievement Unlocked: Made Your First Call! 🎉');
        }
      }
      this.updateStats();
    }
  }

  showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }

  showSuccessMessage(title, message) {
    const modal = document.getElementById('success-modal');
    if (modal) {
      document.getElementById('success-title').textContent = title;
      document.getElementById('success-message').textContent = message;
      modal.classList.add('active');
    }
  }

  closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
      modal.classList.remove('active');
    }
    this.goBack();
  }

  showPremiumModal() {
    const modal = document.getElementById('premium-modal');
    if (modal) {
      modal.classList.add('active');
    }
  }

  closePremiumModal() {
    const modal = document.getElementById('premium-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  upgradePremium() {
    this.isPremium = true;
    this.closePremiumModal();
    this.showSuccessMessage('Welcome to Premium! ⭐', 'You now have access to all premium features');
  }

  updateStats() {
    const independenceDaysEl = document.getElementById('independence-days');
    const streakCountEl = document.getElementById('streak-count');
    const tasksTodayEl = document.getElementById('tasks-today');

    if (independenceDaysEl) independenceDaysEl.textContent = this.stats.independenceDays;
    if (streakCountEl) streakCountEl.textContent = this.stats.streakDays;
    if (tasksTodayEl) tasksTodayEl.textContent = this.stats.tasksToday;
  }

  showAchievements() {
    this.nextScreen('achievements-screen');
  }

  renderContacts() {
    const container = document.getElementById('contact-list');
    if (!container) return;

    container.innerHTML = '';
    this.contacts.forEach(contact => {
      const item = document.createElement('div');
      item.className = 'contact-item';
      const avatar = contact.type === 'family' ? '👨👩👧👦' : contact.type === 'doctor' ? '🏥' : '🚨';
      item.innerHTML = '<div class="contact-avatar">' + avatar + '</div><div class="contact-info"><h3>' + contact.name + '</h3><p>' + contact.phone + '</p></div>';
      container.appendChild(item);
    });
  }

  renderAchievements() {
    const container = document.getElementById('achievements-grid');
    if (!container) return;

    container.innerHTML = '';
    this.achievements.forEach(achievement => {
      const badge = document.createElement('div');
      badge.className = 'achievement-badge ' + (achievement.unlocked ? 'unlocked' : 'locked');
      badge.innerHTML = '<div class="achievement-icon">' + achievement.icon + '</div><div class="achievement-title">' + achievement.title + '</div><div class="achievement-desc">' + achievement.description + '</div>';
      container.appendChild(badge);
    });
  }

  renderFamilyPortal() {
    const container = document.getElementById('family-portal-content');
    if (!container) return;

    container.innerHTML = '<div class="portal-section"><h2>Your Mom NavSathi</h2><p>Last active: 2 hours ago</p><div class="usage-stats"><p>Tasks completed today: ' + this.stats.tasksToday + '</p><p>Family calls this week: ' + this.stats.familyCallsCount + '</p></div></div>';
  }
}

let app;
document.addEventListener('DOMContentLoaded', function() {
  app = new NavSathiApp();
});
