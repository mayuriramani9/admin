import BlogPostClient from "./BlogPostClient";
import { Metadata } from "next";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog-utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Added await here
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | ThreatLens Blog`,
    description: post.subtitle,
  };
}

export default async function SingleBlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Added await here
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Post not found
      </div>
    );
  }

  // @ts-ignore
  return <BlogPostClient post={post} />;
}

export async function generateStaticParams() {
  // Added await here
  const filenames = await getAllPostSlugs();

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}
