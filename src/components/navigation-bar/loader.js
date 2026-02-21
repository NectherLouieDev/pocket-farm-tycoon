export async function loadNav() {
  // Load HTML
  const html = await fetch('/src/components/navigation-bar/index.html').then(r => r.text());
  document.body.insertAdjacentHTML('afterbegin', html);
  
  // Load CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/components/navigation-bar/style.css';
  document.head.appendChild(link);
  
  // Import and init JS
  const { initNavigation } = await import('./script.js');
  initNavigation();
}