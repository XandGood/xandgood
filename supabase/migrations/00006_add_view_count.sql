alter table posts add column if not exists view_count integer default 0;

create or replace function increment_view_count(target_post_id uuid)
returns void language sql as $$
  update posts set view_count = view_count + 1 where id = target_post_id;
$$;
