"use client";

import { useRouter } from "next/navigation";
import { upsertPostAction } from "@/app/dashboard/(protected)/actions";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  List,
  Heading1,
  Heading2,
  Quote,
  Link2,
  Image as ImageIcon,
  Eye,
  Code,
  Save,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Tag,
  UploadCloud,
  X,
  Sparkles,
} from "lucide-react";

// // --- Helper: Image Upload Function ---
// const uploadImage = async (file: File): Promise<string | null> => {
//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const res = await fetch("/api/upload", {
//       method: "POST",
//       body: formData,
//     });
//     const data = await res.json();
//     if (data.success) {
//       return data.url;
//     }
//     return null;
//   } catch (err) {
//     console.error("Upload failed", err);
//     return null;
//   }
// };

// --- Sub-Component: Markdown Editor ---
interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const MarkdownEditor = ({
  value,
  onChange,
  className,
}: MarkdownEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const newText =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleImageBtnClick = () => {
    fileInputRef.current?.click();
  };

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setIsUploading(true);
  //   const url = await uploadImage(file);
  //   setIsUploading(false);

  //   if (url) {
  //     insertText(`![${file.name}](${url})`);
  //   } else {
  //     alert("Failed to upload image");
  //   }

  //   e.target.value = "";
  // };

  const renderPreview = (text: string) => {
    if (!text) return "";
    return text
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-2xl md:text-3xl font-bold mt-12 mb-6 scroll-mt-24">$1</h2>'
      )
      .replace(
        /^# (.*$)/gim,
        '<h1 class="text-3xl font-bold mt-8 mb-6">$1</h1>'
      )
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(
        /!\[(.*?)\]\((.*?)\)/gim,
        '<img alt="$1" src="$2" class="rounded-xl my-8 max-w-full h-auto border border-border/40 shadow-lg" />'
      )
      .replace(
        /^> (.*$)/gim,
        '<blockquote class="border-l-4 border-accent pl-6 py-2 my-8 italic text-xl font-medium bg-accent/5 rounded-r-lg">$1</blockquote>'
      )
      .replace(
        /^- (.*$)/gim,
        '<li class="flex items-start gap-3 mb-4"><svg class="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="text-lg text-muted-foreground">$1</span></li>'
      )
      .replace(/\n/gim, "<br />");
  };

  return (
    <div
      className={cn(
        "border border-border/60 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm shadow-lg transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40",
        className
      )}
    >
      {/* <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      /> */}

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all"
            onClick={() => insertText("**", "**")}
            title="Bold"
            type="button"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all"
            onClick={() => insertText("*", "*")}
            title="Italic"
            type="button"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <div className="w-px h-5 bg-border/60 mx-2" />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all"
            onClick={() => insertText("# ")}
            title="Heading 1"
            type="button"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all"
            onClick={() => insertText("## ")}
            title="Heading 2"
            type="button"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <div className="w-px h-5 bg-border/60 mx-2" />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all"
            onClick={() => insertText("- ")}
            title="List"
            type="button"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all"
            onClick={() => insertText("> ")}
            title="Quote"
            type="button"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <div className="w-px h-5 bg-border/60 mx-2" />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all"
            onClick={() => insertText("[Link Text](url)")}
            title="Link"
            type="button"
          >
            <Link2 className="h-4 w-4" />
          </Button>
          {/* <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all"
            onClick={handleImageBtnClick}
            title="Upload Image"
            disabled={isUploading}
            type="button"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ImageIcon className="h-4 w-4" />
            )}
          </Button> */}
        </div>

        <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-lg border border-border/60 p-1 shadow-sm">
          <Button
            variant={!isPreview ? "default" : "ghost"}
            size="sm"
            type="button"
            className={cn(
              "h-8 px-3 text-xs font-medium transition-all",
              !isPreview && "shadow-sm"
            )}
            onClick={() => setIsPreview(false)}
          >
            <Code className="h-3.5 w-3.5 mr-1.5" /> Write
          </Button>
          <Button
            variant={isPreview ? "default" : "ghost"}
            size="sm"
            type="button"
            className={cn(
              "h-8 px-3 text-xs font-medium transition-all",
              isPreview && "shadow-sm"
            )}
            onClick={() => setIsPreview(true)}
          >
            <Eye className="h-3.5 w-3.5 mr-1.5" /> Preview
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="relative min-h-[500px]">
        {isPreview ? (
          <div
            className="prose prose-lg dark:prose-invert max-w-none p-8 min-h-[500px] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        ) : (
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full min-h-[500px] p-8 resize-y border-0 focus-visible:ring-0 font-mono text-sm leading-relaxed bg-transparent"
            placeholder="Start writing your story..."
          />
        )}
      </div>
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 px-6 py-3 text-xs text-muted-foreground border-t border-border/60 flex justify-between items-center">
        <span className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Markdown supported
        </span>
        <span className="font-medium">{value?.length || 0} characters</span>
      </div>
    </div>
  );
};

// --- Main Editor Component ---

interface PostEditorProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function PostEditor({
  initialData,
  isEditing = false,
}: PostEditorProps) {
  const router = useRouter(); // must be inside component
  const originalSlugRef = useRef<string>(initialData?.slug || "");
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    excerpt: "",
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    readTime: "5 min read",
    author: "Admin",
    authorRole: "Editor",
    category: "Security",
    featured: false,
    // coverImage: "",
    rawContent:
      "## Introduction\n\nYour compelling introduction goes here...\n\n> A powerful quote to engage readers\n\n- Key point one\n- Key point two\n- Key point three",
    ...initialData,
  });

  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData((prev: any) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (value: string) => {
    setFormData({ ...formData, rawContent: value });
  };

  //     const file = e.target.files?.[0];
  //     if (!file) return;

  //     setIsUploadingCover(true);
  //     const url = await uploadImage(file);
  //     setIsUploadingCover(false);

  //     if (url) {
  //       setFormData({ ...formData, coverImage: url });
  //     }
  //   };

  const removeCoverImage = () => {
    setFormData({ ...formData, coverImage: "" });
    if (coverInputRef.current) coverInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");

    try {
      const payload = {
        slug: isEditing ? originalSlugRef.current : formData.slug, // old/current slug when editing
        newSlug: isEditing ? formData.slug : undefined, // new slug (maybe changed)
        rawContent: formData.rawContent,
        meta: {
          title: formData.title,
          subtitle: formData.subtitle,
          excerpt: formData.excerpt,
          date: formData.date,
          readTime: formData.readTime,
          author: formData.author,
          authorRole: formData.authorRole,
          category: formData.category,
          featured: formData.featured,
          iconName: formData.iconName,
          // coverImage: formData.coverImage, // if you add it back later
        },
      };

      const res = await upsertPostAction(payload);

      if (!res?.success) throw new Error(res?.error || "Failed to save post");

      setStatus("success");

      // keep UX the same; refresh server data and if slug changed, go to new edit url
      router.refresh();
      if (isEditing && res.slug && res.slug !== originalSlugRef.current) {
        originalSlugRef.current = res.slug;
        router.push(`/dashboard/edit/${res.slug}`);
      }

      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary/20 bg-background/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                {isEditing ? "Edit Post" : "Create New Blog Post"}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {status === "success" && (
              <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 animate-in fade-in slide-in-from-right">
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Saved Successfully</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-sm font-medium text-destructive animate-in fade-in slide-in-from-right">
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Error Saving</span>
              </div>
            )}
            <Button
              onClick={handleSubmit}
              disabled={status === "saving"}
              className="min-w-[140px] shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              {status === "saving" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? "Update Post" : "Publish Post"}
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/60 shadow-lg p-8 space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-base font-semibold text-foreground flex items-center gap-2"
                >
                  Post Title
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="text-xl font-semibold h-14 bg-background/50 border-border/60 focus-visible:border-primary/60 focus-visible:ring-primary/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="subtitle"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Subtitle
                </Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="h-11 bg-background/50 border-border/60 focus-visible:border-primary/60"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="excerpt"
                  className="text-sm font-medium text-muted-foreground"
                >
                  excerpt
                </Label>
                <Input
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="h-11 bg-background/50 border-border/60 focus-visible:border-primary/60"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Content
              </Label>
              <MarkdownEditor
                value={formData.rawContent}
                onChange={handleEditorChange}
              />
            </div>
          </div>

          {/* Right Column: Metadata & Cover Image */}
          <div className="space-y-6">
            {/* Cover Image Section */}
            {/* <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/60 shadow-lg p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <ImageIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Cover Image</h3>
                  <p className="text-xs text-muted-foreground">
                    Upload a stunning visual
                  </p>
                </div>
              </div>

              <div className="relative group">
                {formData.coverImage ? (
                  <div className="relative rounded-xl overflow-hidden border border-border/60 aspect-video shadow-md">
                    <img
                      src={formData.coverImage}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-10 w-10 rounded-full shadow-lg"
                        onClick={removeCoverImage}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-border/60 rounded-xl aspect-video flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-primary/5 hover:border-primary/40 transition-all bg-gradient-to-br from-primary/5 to-accent/5"
                    onClick={() => coverInputRef.current?.click()}
                  >
                    {isUploadingCover ? (
                      <>
                        <Loader2 className="h-10 w-10 animate-spin mb-3 text-primary" />
                        <span className="text-sm font-medium">
                          Uploading...
                        </span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="h-10 w-10 mb-3 text-primary" />
                        <span className="text-sm font-medium mb-1">
                          Click to upload
                        </span>
                        <span className="text-xs">PNG, JPG up to 10MB</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={coverInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleCoverUpload}
              />
            </div> */}

            {/* Post Details */}
            <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/60 shadow-lg p-6 space-y-6 sticky top-28">
              <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Tag className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Post Details</h3>
                  <p className="text-xs text-muted-foreground">
                    Configure metadata
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    URL Slug <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="bg-background/50 border-border/60 focus-visible:border-primary/60 h-10"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category
                  </Label>
                  <Input
                    name="category"
                    placeholder="e.g., Security"
                    value={formData.category}
                    onChange={handleChange}
                    className="bg-background/50 border-border/60 focus-visible:border-primary/60 h-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Author
                    </Label>
                    <Input
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      className="bg-background/50 border-border/60 h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Role
                    </Label>
                    <Input
                      name="authorRole"
                      value={formData.authorRole}
                      onChange={handleChange}
                      className="bg-background/50 border-border/60 h-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Date
                    </Label>
                    <Input
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="bg-background/50 border-border/60 h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Read Time
                    </Label>
                    <Input
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleChange}
                      className="bg-background/50 border-border/60 h-10"
                    />
                  </div>
                </div>
                {/* Featured checkbox */}
                <div className="pt-3">
                  <div className="flex items-center gap-3">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      checked={!!formData.featured}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featured: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-border/60 bg-background/50"
                    />
                    <Label htmlFor="featured" className="text-sm font-medium">
                      Featured
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">
                    Mark this post as featured to highlight it on the blogpage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
