import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/data/posts";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.xandgood.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await getPublishedPosts(1, 1000);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.created_at as string),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guestbook`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...postEntries,
  ];
}
