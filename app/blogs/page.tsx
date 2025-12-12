import { getAllPosts } from "@/lib/blog-utils";
import BlogIndexClient from "./BlogIndexClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | ThreatLens - Cybersecurity Insights",
  description:
    "Latest insights on threat intelligence, AI security, and SOC automation.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogIndexClient posts={posts} />;
}
