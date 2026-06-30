document.body.classList.add('intro-active');

const intro = document.getElementById('intro');
const site = document.getElementById('site');
const enterSite = document.getElementById('enterSite');

function openSite(){
  intro?.classList.add('hidden');
  site?.classList.remove('locked');
  site?.classList.add('revealed');
  document.body.classList.remove('intro-active');
}

enterSite?.addEventListener('click', openSite);

// Seguridad: si el navegador detiene alguna animación, el botón aparece igual.
setTimeout(() => {
  if (!enterSite) return;
  enterSite.style.opacity = '1';
  enterSite.style.transform = 'translateY(0)';
}, 8500);
