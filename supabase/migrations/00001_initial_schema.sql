-- 分类表
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz default now()
);

-- 标签表
create table tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz default now()
);

-- 文章表
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null default '',
  summary text default '',
  category_id uuid references categories(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 文章-标签关联表
create table post_tags (
  post_id uuid references posts(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- 点赞表
create table likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  post_id uuid references posts(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, post_id)
);

-- 评论表
create table comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  post_id uuid references posts(id) on delete cascade not null,
  parent_id uuid references comments(id) on delete cascade,
  content text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

-- 留言表
create table messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  is_pinned boolean default false,
  created_at timestamptz default now()
);

-- 用户资料扩展表
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  is_admin boolean default false,
  is_banned boolean default false,
  created_at timestamptz default now()
);

-- 站点设置表（单例行）
create table site_settings (
  id integer primary key default 1 check (id = 1),
  blog_name text default 'XandGood',
  description text default '记录思考，分享技术',
  footer text default '© 2026 XandGood. All rights reserved.',
  posts_per_page integer default 10
);

insert into site_settings (id) values (1);

-- ============ RLS ============

alter table posts enable row level security;
alter table categories enable row level security;
alter table tags enable row level security;
alter table post_tags enable row level security;
alter table likes enable row level security;
alter table comments enable row level security;
alter table messages enable row level security;
alter table profiles enable row level security;
alter table site_settings enable row level security;

-- posts
create policy "Published posts are publicly readable"
  on posts for select using (status = 'published');
create policy "Admins can manage posts"
  on posts for all using ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean);

-- categories
create policy "Categories are publicly readable"
  on categories for select using (true);
create policy "Admins can manage categories"
  on categories for all using ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean);

-- tags
create policy "Tags are publicly readable"
  on tags for select using (true);
create policy "Admins can manage tags"
  on tags for all using ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean);

-- post_tags
create policy "Post tags are publicly readable"
  on post_tags for select using (true);
create policy "Admins can manage post tags"
  on post_tags for all using ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean);

-- likes
create policy "Likes are readable by owner"
  on likes for select using (auth.uid() = user_id);
create policy "Users can insert own likes"
  on likes for insert with check (auth.uid() = user_id);
create policy "Users can delete own likes"
  on likes for delete using (auth.uid() = user_id);

-- comments
create policy "Approved comments are publicly readable"
  on comments for select using (status = 'approved');
create policy "Users can read own pending comments"
  on comments for select using (auth.uid() = user_id);
create policy "Authenticated users can create comments"
  on comments for insert with check (auth.uid() = user_id);
create policy "Admins can manage comments"
  on comments for all using ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean);

-- messages
create policy "Messages are publicly readable"
  on messages for select using (true);
create policy "Authenticated users can create messages"
  on messages for insert with check (auth.uid() = user_id);
create policy "Admins can manage messages"
  on messages for all using ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean);

-- profiles
create policy "Users can read own profile"
  on profiles for select using (auth.uid() = id);
create policy "Profiles are readable by admins"
  on profiles for select using ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean);
create policy "Users can update own display name"
  on profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Admins can manage profiles"
  on profiles for all using ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean);

-- site_settings
create policy "Site settings are publicly readable"
  on site_settings for select using (true);
create policy "Admins can manage site settings"
  on site_settings for all using ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean);

-- ============ Custom Access Token Hook ============

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
as $$
declare
  claims jsonb;
  is_admin boolean;
begin
  select is_admin into is_admin from public.profiles where id = (event->>'user_id')::uuid;

  if is_admin then
    claims := event->'claims';

    if jsonb_typeof(claims->'app_metadata') is null then
      claims := jsonb_set(claims, '{app_metadata}', '{}');
    end if;

    claims := jsonb_set(claims, '{app_metadata,is_admin}', 'true');
    event := jsonb_set(event, '{claims}', claims);
  end if;

  return event;
end;
$$;

grant execute
  on function public.custom_access_token_hook
  to supabase_auth_admin;

grant usage on schema public to supabase_auth_admin;

revoke execute
  on function public.custom_access_token_hook
  from authenticated, anon, public;

grant all
  on table public.profiles
  to supabase_auth_admin;

revoke all
  on table public.profiles
  from authenticated, anon, public;

-- ============ 触发器 ============

-- 新用户注册自动创建 profile
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
      split_part(new.email, '@', 1)
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 文章更新时间自动维护
create or replace function public.handle_post_update()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  if new.status = 'published' and old.status != 'published' then
    new.published_at = now();
  end if;
  return new;
end;
$$;

create trigger on_post_update
  before update on posts
  for each row execute function public.handle_post_update();
