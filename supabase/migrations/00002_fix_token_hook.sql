-- 修复 Custom Access Token Hook
-- 根因：PL/pgSQL 变量 is_admin 与表列 profiles.is_admin 重名，
-- select is_admin into is_admin 在 PostgreSQL 中歧义，导致 hook 崩溃。
-- 修复：用表别名区分变量名和列名（profiles p → select p.is_admin）。

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
as $$
declare
  claims jsonb;
  is_admin boolean;
  is_banned boolean;
begin
  select p.is_admin, p.is_banned into is_admin, is_banned
  from public.profiles p where p.id = (event->>'user_id')::uuid;

  if is_admin or is_banned then
    claims := event->'claims';
    if jsonb_typeof(claims->'app_metadata') is null then
      claims := jsonb_set(claims, '{app_metadata}', '{}');
    end if;
  end if;

  if is_admin then
    claims := jsonb_set(claims, '{app_metadata,is_admin}', 'true');
  end if;

  if is_banned then
    claims := jsonb_set(claims, '{app_metadata,is_banned}', 'true');
  end if;

  if is_admin or is_banned then
    event := jsonb_set(event, '{claims}', claims);
  end if;

  return event;
end;
$$;

grant execute on function public.custom_access_token_hook to supabase_auth_admin;
grant usage on schema public to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook from authenticated, anon, public;
