-- 1) 恢复 profiles 表权限（RLS 策略负责行级控制）
grant select, insert, update on table public.profiles to authenticated;
grant select on table public.profiles to anon;

-- 2) 新用户注册自动生成随机默认名称
create or replace function public.handle_new_user()
returns trigger
security definer set search_path = public
language plpgsql
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'full_name',
      '用户' || floor(random() * 100000)::text
    )
  );
  return new;
end;
$$;
