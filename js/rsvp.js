(() => {
  const form = document.getElementById('rsvpForm');
  const message = document.getElementById('rsvpMessage');
  const options = document.getElementById('companionOptions');
  const config = window.WEDDING_CONFIG || {};
  const ready = config.supabaseUrl?.startsWith('https://') && !config.supabaseUrl.includes('PEGA_AQUI') && config.supabaseAnonKey && !config.supabaseAnonKey.includes('PEGA_AQUI') && window.supabase;
  const client = ready ? window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey) : null;
  form.querySelectorAll('[name="attendance"]').forEach(el => el.addEventListener('change', () => {
    const yes = form.elements.attendance.value === 'yes';
    options.hidden = !yes;
    options.querySelectorAll('input').forEach(input => { input.required = yes; if (!yes) input.checked = false; });
  }));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    message.textContent = '';
    if (!client) { message.textContent = 'La conexión todavía no está configurada. Contacta a los novios.'; return; }
    const first = form.elements.first_name.value.trim();
    const last = form.elements.last_name.value.trim();
    const attendance = form.elements.attendance.value;
    const companion = form.elements.companion.value;
    if (!first || !last || !['yes','no'].includes(attendance) || (attendance === 'yes' && !['solo','couple'].includes(companion))) {
      message.textContent = 'Completa todos los campos.'; return;
    }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true; button.textContent = 'Enviando…';
    try {
      const { error } = await client.from('rsvps').insert({
        guest_name: `${first} ${last}`, first_name: first, last_name: last,
        attendance, guest_count: attendance === 'no' ? 0 : companion === 'couple' ? 2 : 1,
        with_partner: attendance === 'yes' && companion === 'couple'
      });
      if (error) throw error;
      form.reset(); options.hidden = true;
      message.textContent = '¡Gracias! Tu respuesta quedó registrada.';
    } catch (err) {
      console.error('RSVP error', err);
      message.textContent = 'No se pudo guardar tu respuesta. Intenta nuevamente.';
    } finally { button.disabled = false; button.textContent = 'Enviar respuesta'; }
  });
})();
