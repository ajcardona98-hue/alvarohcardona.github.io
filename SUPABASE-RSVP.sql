-- Ejecutar en Supabase SQL Editor. Adaptado a las tablas rsvps y wedding_admins ya creadas.
-- No borra las respuestas existentes.
alter table public.rsvps add column if not exists first_name text;
alter table public.rsvps add column if not exists last_name text;
alter table public.rsvps add column if not exists with_partner boolean not null default false;
-- El formulario simplificado no pide datos de contacto.
alter table public.rsvps alter column guest_contact drop not null;
-- Garantizar RLS; las lecturas permanecen limitadas por la política de administrador existente.
alter table public.rsvps enable row level security;
alter table public.wedding_admins enable row level security;
-- No conceder SELECT a visitantes.
revoke all on public.rsvps from anon;
grant insert (guest_name, first_name, last_name, attendance, guest_count, with_partner) on public.rsvps to anon;
-- La columna id es GENERATED ALWAYS AS IDENTITY: se necesita uso de secuencia para insertar.
grant usage on sequence public.rsvps_id_seq to anon;
drop policy if exists "Guests can submit RSVP" on public.rsvps;
create policy "Guests can submit RSVP" on public.rsvps for insert to anon
with check (
  first_name is not null and length(btrim(first_name)) between 1 and 70
  and last_name is not null and length(btrim(last_name)) between 1 and 70
  and guest_name = btrim(first_name) || ' ' || btrim(last_name)
  and ((attendance='yes' and guest_count in (1,2) and with_partner=(guest_count=2))
       or (attendance='no' and guest_count=0 and with_partner=false))
);
-- La política existente "Admins can view RSVPs" continúa protegiendo SELECT.
