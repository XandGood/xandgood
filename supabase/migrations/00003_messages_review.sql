-- 留言增加审核机制

-- 1) 添加 status 列，已有留言默认 approved
alter table messages
  add column status text not null default 'approved' check (status in ('pending', 'approved', 'rejected'));

-- 新留言默认 pending
alter table messages alter column status set default 'pending';

-- 2) 更新 RLS：公开只查已批准的留言
drop policy if exists "Messages are publicly readable" on messages;
create policy "Approved messages are publicly readable"
  on messages for select using (status = 'approved');

-- 用户可以看自己待审核的留言
create policy "Users can read own pending messages"
  on messages for select using (auth.uid() = user_id);
