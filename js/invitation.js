window.addEventListener('load', () => {
  const intro = document.getElementById('introBoda');
  const boton = document.getElementById('entrarSitio');

  if (!intro || !window.gsap) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.solapa-superior', { rotationX: 178, duration: 1.25, ease: 'power2.inOut', transformOrigin: 'top center' })
    .to('.sello', { scale: .55, opacity: 0, duration: .55 }, '-=.9')
    .to('.invitacion-carta', { y: -110, scale: 1, opacity: 1, duration: 1.45 }, '-=.45')
    .to('.mariposa', { opacity: 1, scale: 1, duration: .5 }, '-=.55')
    .to('.mariposa', {
      motionPath: false,
      x: 0,
      y: -260,
      scale: .72,
      rotation: 8,
      duration: 2.2,
      ease: 'sine.inOut'
    }, '-=.05')
    .from('.texto-invitado, .texto-boda, .separador, .invitacion-carta h1, .invitacion-carta h2, .fecha-carta, .boton-entrar', {
      y: 22,
      opacity: 0,
      stagger: .08,
      duration: .75
    }, '-=1.3');

  boton.addEventListener('click', () => {
    intro.classList.add('ocultar');
    document.body.classList.remove('bloqueado');
    setTimeout(() => intro.remove(), 900);
  });
});
