// // "use client";

// // import React, { useEffect, useState } from "react";
// // import PostEditor from "@/components/PostEditor";
// // import { Loader2 } from "lucide-react";

// // export const runtime = "edge";

// // export default function EditPostPage({ params }: { params: { slug: string } }) {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Fetch existing post data
// //     fetch(`/api/posts/${params.slug}`)
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Post not found");
// //         return res.json();
// //       })
// //       .then((data) => {
// //         setData(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error(err);
// //         setLoading(false);
// //       });
// //   }, [params.slug]);

// //   if (loading) {
// //     return (
// //       <div className="h-screen w-full flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-primary/5 to-accent/5">
// //         <Loader2 className="h-10 w-10 animate-spin text-primary" />
// //         <p className="text-muted-foreground font-medium">
// //           Loading post data...
// //         </p>
// //       </div>
// //     );
// //   }

// //   if (!data) {
// //     return (
// //       <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-primary/5 to-accent/5">
// //         <div className="text-center space-y-4">
// //           <h1 className="text-2xl font-bold">Post not found</h1>
// //           <p className="text-muted-foreground">
// //             The post you are trying to edit does not exist.
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return <PostEditor initialData={data} isEditing={true} />;
// // }

// "use client";

// import React, { useEffect, useState } from "react";
// import PostEditor from "@/components/PostEditor";
// import { Loader2 } from "lucide-react";
// import { useParams } from "next/navigation";

// export const runtime = "edge";

// export default function EditPostPage() {
//   const params = useParams();
//   const slug = params?.slug;

//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (typeof slug !== "string") return;
//     if (!slug || slug === "undefined" || slug === "null") return;

//     setLoading(true);

//     fetch(`/api/posts/${encodeURIComponent(slug)}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Post not found");
//         return res.json();
//       })
//       .then((json) => {
//         setData(json);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setData(null);
//         setLoading(false);
//       });
//   }, [slug]);

//   if (typeof slug !== "string" || loading) {
//     return (
//       <div className="h-screen w-full flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-primary/5 to-accent/5">
//         <Loader2 className="h-10 w-10 animate-spin text-primary" />
//         <p className="text-muted-foreground font-medium">
//           Loading post data...
//         </p>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-primary/5 to-accent/5">
//         <div className="text-center space-y-4">
//           <h1 className="text-2xl font-bold">Post not found</h1>
//           <p className="text-muted-foreground">
//             The post you are trying to edit does not exist.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return <PostEditor initialData={data} isEditing={true} />;
// }
import { getPostBySlug } from "@/lib/blog-utils";
import EditPostClient from "./EditPostClient";

export const runtime = "edge";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params; // ✅ unwrap Promise params

  if (!slug || slug === "undefined" || slug === "null") {
    return <EditPostClient initialData={null} />;
  }

  const post = await getPostBySlug(slug);

  const initialData = post
    ? {
        slug: post.id,
        title: post.title,
        subtitle: post.subtitle,
        excerpt: post.excerpt,
        date: post.date,
        readTime: post.readTime,
        author: post.author,
        authorRole: post.authorRole,
        category: post.category,
        featured: post.featured,
        iconName: post.iconName,
        rawContent: (post as any).rawContent, // add rawContent in blog-utils
      }
    : null;

  return <EditPostClient initialData={initialData} />;
}
