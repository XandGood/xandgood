export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  category_id: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category?: Category;
  tags?: Tag[];
  likes_count?: number;
  user_liked?: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  count?: number;
};

export type PostTag = {
  post_id: string;
  tag_id: string;
};

export type Like = {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
};

export type Comment = {
  id: string;
  user_id: string;
  post_id: string;
  parent_id: string | null;
  content: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  profile?: Profile;
  replies?: Comment[];
};

export type Message = {
  id: string;
  user_id: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
  profile?: Profile;
};

export type Profile = {
  id: string;
  display_name: string | null;
  is_admin: boolean;
  is_banned: boolean;
  created_at: string;
};

export type SiteSettings = {
  id: 1;
  blog_name: string;
  description: string;
  footer: string;
  posts_per_page: number;
};
