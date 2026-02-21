export function loadNavigation() {
  // Fetch and inject navigation HTML
  fetch('/src/components/navigation-bar/index.html')
    .then(response => response.text())
    .then(html => {
      // Inject at the beginning of body
      document.body.insertAdjacentHTML('afterbegin', html);
      
      // Load navigation CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/src/components/navigation-bar/style.css';
      document.head.appendChild(link);
      
      // Initialize navigation logic
      initNavigation();
    });
}

function initNavigation() {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
  
  // Highlight current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

// Auto-load if included directly
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', loadNavigation);
// } else {
//   loadNavigation();
// }