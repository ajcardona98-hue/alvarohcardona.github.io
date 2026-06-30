const fechaBoda = new Date(2027, 5, 26, 16, 0, 0).getTime();

function actualizarContador(){
  const ahora = new Date().getTime();
  const distancia = fechaBoda - ahora;

  const dias = Math.max(0, Math.floor(distancia/(1000*60*60*24)));
  const horas = Math.max(0, Math.floor((distancia%(1000*60*60*24))/(1000*60*60)));
  const minutos = Math.max(0, Math.floor((distancia%(1000*60*60))/(1000*60)));
  const segundos = Math.max(0, Math.floor((distancia%(1000*60))/1000));

  document.getElementById('dias').textContent = dias;
  document.getElementById('horas').textContent = horas;
  document.getElementById('minutos').textContent = minutos;
  document.getElementById('segundos').textContent = segundos;
}

actualizarContador();
setInterval(actualizarContador, 1000);
