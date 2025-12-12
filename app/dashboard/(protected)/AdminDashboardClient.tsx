"use client";

import React, { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Edit,
  Trash2,
  Calendar,
  Plus,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { deletePostAction } from "./actions";

type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
};

export default function AdminDashboardClient({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (slug: string) => {
    if (!confirm("Delete this post?")) return;

    // optimistic UI
    setPosts((prev) => prev.filter((p) => p.slug !== slug));

    startTransition(async () => {
      const res = await deletePostAction(slug);
      if (!res?.success) {
        alert(res?.error || "Delete failed");
        router.refresh(); // re-fetch server data
      }
    });
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }); // keep if you want; or also convert to server action
    router.push("/dashboard/login");
  };

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-accent/5 pb-20">
        <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                Admin<span className="text-primary">Panel</span>
              </span>
            </div>

            <Button
              variant="ghost"
              className="hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Dashboard
            </h1>

            <Link href="/dashboard/new">
              <Button className="h-11 px-6 rounded-full">
                <Plus className="w-5 h-5 mr-2" />
                Create New Post
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {isPending && (
              <span className="text-sm text-muted-foreground">Working…</span>
            )}
          </div>

          <div className="bg-card/40 border border-border/50 rounded-2xl shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/20">
                    <th className="py-4 px-6 font-semibold text-muted-foreground w-[45%]">
                      Title
                    </th>
                    <th className="py-4 px-6 font-semibold text-muted-foreground">
                      Category
                    </th>
                    <th className="py-4 px-6 font-semibold text-muted-foreground">
                      Date
                    </th>
                    <th className="py-4 px-6 font-semibold text-muted-foreground text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border/40">
                  {filteredPosts.map((post) => (
                    <tr
                      key={post.slug}
                      className="group hover:bg-primary/5 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <Link
                          href={`/dashboard/edit/${post.slug}`}
                          className="font-semibold hover:text-primary"
                        >
                          {post.title}
                        </Link>
                        <div className="text-xs text-muted-foreground font-mono">
                          /{post.slug}
                        </div>
                      </td>

                      <td className="py-4 px-6">{post.category}</td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">
                            {post.date}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/dashboard/edit/${post.slug}`}>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                              title="Edit Post"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
                            onClick={() => handleDelete(post.slug)}
                            title="Delete Post"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredPosts.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="h-48 text-center text-muted-foreground"
                      >
                        No posts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
