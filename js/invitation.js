
window.addEventListener('load', () => {
  const intro = document.getElementById('introBoda');
  const boton = document.getElementById('entrarSitio');
  const saltar = document.getElementById('saltarIntro');

  if (!intro) {
    document.body.classList.remove('bloqueado');
    return;
  }

  const cerrarIntro = () => {
    intro.classList.add('ocultar');
    document.body.classList.remove('bloqueado');
    setTimeout(() => intro.remove(), 900);
  };

  boton?.addEventListener('click', cerrarIntro);
  saltar?.addEventListener('click', cerrarIntro);

  if (!window.gsap) {
    // Si GSAP no carga por internet, se permite continuar.
    document.querySelector('.invitacion-carta')?.style.setProperty('opacity', '1');
    document.querySelector('.invitacion-carta')?.style.setProperty('transform', 'translateY(-230px) scale(1)');
    return;
  }

  const altoBajo = window.innerHeight < 760;
  const subidaCarta = altoBajo ? -260 : -235;
  const vueloMariposa = altoBajo ? -300 : -335;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.solapa-superior', {
      rotationX: 178,
      duration: 1.25,
      ease: 'power2.inOut',
      transformOrigin: 'top center'
    })
    .to('.sello', {
      scale: .55,
      opacity: 0,
      duration: .55
    }, '-=.9')
    .to('.invitacion-carta', {
      y: subidaCarta,
      scale: 1,
      opacity: 1,
      duration: 1.45
    }, '-=.45')
    .to('.mariposa', {
      opacity: 1,
      scale: 1,
      duration: .45
    }, '-=.55')
    .to('.mariposa', {
      x: 0,
      y: vueloMariposa,
      scale: .72,
      rotation: 8,
      duration: 2.1,
      ease: 'sine.inOut'
    }, '-=.05')
    .from('.texto-invitado, .texto-boda, .separador, .invitacion-carta h1, .invitacion-carta h2, .fecha-carta, .boton-entrar', {
      y: 22,
      opacity: 0,
      stagger: .08,
      duration: .75
    }, '-=1.25');
});
