(async () => {
 const c=window.WEDDING_CONFIG||{};const status=document.getElementById('status');
 if(!c.supabaseUrl?.startsWith('https://')||!c.supabaseAnonKey||c.supabaseAnonKey.includes('PEGA_AQUI')||!window.supabase){status.textContent='Falta configurar js/config.js';return;}
 const db=window.supabase.createClient(c.supabaseUrl,c.supabaseAnonKey);
 const login=document.getElementById('login'),dashboard=document.getElementById('dashboard');
 const escape=s=>String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
 async function load(){const {data:{user}}=await db.auth.getUser();if(!user){login.hidden=false;dashboard.hidden=true;return;}
 const {data:admin,error:adminError}=await db.from('wedding_admins').select('user_id').eq('user_id',user.id).maybeSingle();
 if(adminError||!admin){status.textContent='Esta cuenta no tiene acceso de administrador.';login.hidden=true;dashboard.hidden=true;return;}
 login.hidden=true;dashboard.hidden=false;status.textContent='';
 const {data,error}=await db.from('rsvps').select('first_name,last_name,attendance,guest_count,created_at').order('created_at',{ascending:false});
 if(error){status.textContent='No se pudieron leer las respuestas.';return;}
 const yes=data.filter(x=>x.attendance==='yes'),no=data.filter(x=>x.attendance==='no');
 document.getElementById('totals').textContent=`Respuestas: ${data.length} · Asisten: ${yes.length} · No asisten: ${no.length} · Personas confirmadas: ${yes.reduce((s,x)=>s+x.guest_count,0)}`;
 document.getElementById('records').innerHTML='<table><thead><tr><th>Nombre</th><th>Apellido</th><th>Respuesta</th><th>Modalidad</th><th>Fecha</th></tr></thead><tbody>'+data.map(x=>`<tr><td>${escape(x.first_name)}</td><td>${escape(x.last_name)}</td><td>${x.attendance==='yes'?'Asiste':'No asiste'}</td><td>${x.attendance==='no'?'—':x.guest_count===2?'Con pareja':'Solo/a'}</td><td>${escape(new Date(x.created_at).toLocaleString('es-CO'))}</td></tr>`).join('')+'</tbody></table>';
 }
 login.addEventListener('submit',async e=>{e.preventDefault();status.textContent='Ingresando…';const {error}=await db.auth.signInWithPassword({email:document.getElementById('email').value,password:document.getElementById('password').value});if(error){status.textContent='No se pudo iniciar sesión. Revisa tus credenciales.';return;}await load();});
 document.getElementById('logout').addEventListener('click',async()=>{await db.auth.signOut();await load();});await load();
})();
