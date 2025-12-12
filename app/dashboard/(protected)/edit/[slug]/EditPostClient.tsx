"use client";

import React from "react";
import PostEditor from "@/components/PostEditor";
import { Loader2 } from "lucide-react";

export default function EditPostClient({ initialData }: { initialData: any }) {
  // No fetch anymore, so "loading" is only for navigation suspense.
  // If you still want a loader, wrap the page in a <Suspense> from the parent layout.

  if (initialData === undefined) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-primary/5 to-accent/5">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">
          Loading post data...
        </p>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-primary/5 to-accent/5">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p className="text-muted-foreground">
            The post you are trying to edit does not exist.
          </p>
        </div>
      </div>
    );
  }

  return <PostEditor initialData={initialData} isEditing={true} />;
}
