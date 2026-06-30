document.body.classList.add('intro-active');

const intro = document.getElementById('intro');
const site = document.getElementById('site');
const enterSite = document.getElementById('enterSite');

function openSite(){
  intro.classList.add('hidden');
  site.classList.remove('locked');
  site.classList.add('revealed');
  document.body.classList.remove('intro-active');
}

enterSite.addEventListener('click', openSite);

// Seguridad: si algo falla en la animación, permite entrar después de 9 segundos.
setTimeout(() => {
  enterSite.style.opacity = '1';
  enterSite.style.transform = 'translateY(0)';
}, 9000);
