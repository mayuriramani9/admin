// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import AdminGuard from "@/components/AdminGuard";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   LogOut,
//   FileText,
//   Loader2,
//   Search,
//   LayoutDashboard,
//   Calendar,
//   Sparkles,
//   ArrowRight,
//   MoreVertical,
// } from "lucide-react";

// interface Post {
//   slug: string;
//   title: string;
//   date: string;
//   category: string;
// }

// export default function AdminDashboard() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const res = await fetch("/api/posts");
//       const data = await res.json();
//       // Ensure data is an array before setting
//       setPosts(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Failed to load posts", error);
//       setPosts([]); // Set empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (slug: string) => {
//     if (!confirm("Delete this post?")) return;
//     setPosts(posts.filter((p) => p.slug !== slug));
//     try {
//       await fetch(`/api/posts/${slug}`, { method: "DELETE" });
//     } catch (error) {
//       fetchPosts();
//     }
//   };

//   const handleLogout = async () => {
//     await fetch("/api/auth/logout", { method: "POST" });
//     router.push("/dashboard/login");
//   };

//   const filteredPosts = posts.filter(
//     (post) =>
//       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.category.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPosts = posts.length;

//   if (loading)
//     return (
//       <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 via-background to-accent/5">
//         <Loader2 className="h-10 w-10 animate-spin text-primary" />
//         <p className="text-muted-foreground font-medium mt-4 animate-pulse">
//           Loading Dashboard...
//         </p>
//       </div>
//     );

//   return (
//     <AdminGuard>
//       <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-accent/5 pb-20">
//         {/* --- Navbar --- */}
//         <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
//           <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//             <div className="flex items-center gap-2.5">
//               <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
//                 <LayoutDashboard className="h-4 w-4" />
//               </div>
//               <span className="font-bold text-lg tracking-tight">
//                 Admin<span className="text-primary">Panel</span>
//               </span>
//             </div>

//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleLogout}
//                 className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all rounded-md px-4 h-9 font-medium"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </header>

//         <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
//           {/* --- Hero Section --- */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//             <div className="space-y-2">
//               <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
//                 Dashboard
//               </h1>
//             </div>

//             <Link href="/dashboard/new">
//               <Button className="h-11 px-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all bg-gradient-to-r from-primary to-accent hover:scale-[1.02]">
//                 <Plus className="w-5 h-5 mr-2" />
//                 Create New Post
//               </Button>
//             </Link>
//           </div>

//           {/* --- Stats Overview --- */}
//           {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div className="group bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/60 transition-all shadow-sm hover:shadow-md">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">
//                     Total Published
//                   </p>
//                   <h3 className="text-3xl font-bold mt-2 text-foreground">
//                     {totalPosts}
//                   </h3>
//                 </div>
//                 <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
//                   <FileText className="h-5 w-5" />
//                 </div>
//               </div>
//             </div>

//             <div className="group bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card/60 transition-all shadow-sm hover:shadow-md">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">
//                     Active Categories
//                   </p>
//                   <h3 className="text-3xl font-bold mt-2 text-foreground">
//                     {new Set(posts.map((p) => p.category)).size}
//                   </h3>
//                 </div>
//                 <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
//                   <Sparkles className="h-5 w-5" />
//                 </div>
//               </div>
//             </div>
//           </div> */}

//           {/* --- Content Area --- */}
//           <div className="space-y-4">
//             {/* Filters & Search */}
//             <div className="flex items-center gap-4">
//               <div className="relative flex-1 max-w-sm">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search posts..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-9 bg-background border-border/60"
//                 />
//               </div>
//             </div>

//             {/* Table Container */}
//             <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm overflow-hidden">
//               <div className="w-full overflow-x-auto">
//                 <table className="w-full text-left text-sm">
//                   <thead>
//                     <tr className="border-b border-border/50 bg-muted/20">
//                       <th className="py-4 px-6 font-semibold text-muted-foreground w-[45%]">
//                         Title
//                       </th>
//                       <th className="py-4 px-6 font-semibold text-muted-foreground">
//                         Category
//                       </th>
//                       <th className="py-4 px-6 font-semibold text-muted-foreground">
//                         Date
//                       </th>
//                       <th className="py-4 px-6 font-semibold text-muted-foreground text-right">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-border/40">
//                     {filteredPosts.length > 0 ? (
//                       filteredPosts.map((post) => (
//                         <tr
//                           key={post.slug}
//                           className="group hover:bg-primary/5 transition-colors duration-200"
//                         >
//                           <td className="py-4 px-6">
//                             <div className="flex items-center gap-4">
//                               <div className="min-w-0">
//                                 <Link
//                                   href={`/dashboard/edit/${post.slug}`}
//                                   className="font-semibold text-foreground hover:text-primary transition-colors truncate block"
//                                 >
//                                   {post.title}
//                                 </Link>
//                                 <span className="text-xs text-muted-foreground font-mono opacity-70 group-hover:opacity-100 transition-opacity">
//                                   /{post.slug}
//                                 </span>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-6">
//                             <span className="inline-flex items-center rounded-md border border-border/60 bg-background/50 px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm">
//                               {post.category}
//                             </span>
//                           </td>
//                           <td className="py-4 px-6">
//                             <div className="flex items-center gap-2 text-muted-foreground">
//                               <Calendar className="h-3.5 w-3.5" />
//                               <span className="text-xs font-medium">
//                                 {post.date}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="py-4 px-6 text-right">
//                             <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
//                               <Link href={`/dashboard/edit/${post.slug}`}>
//                                 <Button
//                                   size="icon"
//                                   variant="ghost"
//                                   className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
//                                   title="Edit Post"
//                                 >
//                                   <Edit className="h-4 w-4" />
//                                 </Button>
//                               </Link>
//                               <Button
//                                 size="icon"
//                                 variant="ghost"
//                                 className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
//                                 onClick={() => handleDelete(post.slug)}
//                                 title="Delete Post"
//                               >
//                                 <Trash2 className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan={4} className="h-64 text-center">
//                           <div className="flex flex-col items-center justify-center space-y-3">
//                             <div className="h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center">
//                               <Search className="h-6 w-6 text-muted-foreground" />
//                             </div>
//                             <p className="text-muted-foreground font-medium">
//                               No posts found.
//                             </p>
//                             {searchQuery && (
//                               <Button
//                                 variant="link"
//                                 onClick={() => setSearchQuery("")}
//                                 className="text-primary"
//                               >
//                                 Clear search
//                               </Button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Footer of Table */}
//               <div className="bg-muted/20 border-t border-border/50 px-6 py-3 flex items-center justify-between text-xs text-muted-foreground">
//                 <span></span>
//                 <span className="flex items-center gap-1">
//                   <span>Total: {filteredPosts.length} posts</span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </AdminGuard>
//   );
// }

import AdminDashboardClient from "./AdminDashboardClient";
import { getAllPosts } from "@/lib/blog-utils";

export default async function AdminPage() {
  const posts = await getAllPosts();

  // Map to the exact shape your UI expects
  const uiPosts = posts.map((p) => ({
    slug: p.id, // id -> slug
    title: p.title,
    date: p.date,
    category: p.category,
  }));

  return <AdminDashboardClient initialPosts={uiPosts} />;
}
