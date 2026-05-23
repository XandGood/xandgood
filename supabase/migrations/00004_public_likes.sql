-- 允许公开读取点赞数以显示点赞数量
create policy "Likes count is publicly readable"
  on likes for select using (true);
