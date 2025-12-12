// // // import { NextResponse } from "next/server";
// // // import fs from "fs/promises";
// // // import path from "path";
// // // import matter from "gray-matter";

// // // const postsDirectory = path.join(process.cwd(), "posts");

// // // export const dynamic = "force-dynamic";

// // // type RouteContext = {
// // //   params: Promise<{ slug: string }>;
// // // };

// // // // GET: Single Post Content
// // // export async function GET(req: Request, { params }: RouteContext) {
// // //   try {
// // //     const { slug } = await params;

// // //     if (!slug)
// // //       return NextResponse.json({ error: "Missing slug" }, { status: 400 });

// // //     const filePath = path.join(postsDirectory, `${slug}.md`);
// // //     const fileContent = await fs.readFile(filePath, "utf8");
// // //     const { data, content } = matter(fileContent);

// // //     return NextResponse.json({
// // //       slug,
// // //       ...data,
// // //       rawContent: content,
// // //     });
// // //   } catch (error) {
// // //     return NextResponse.json({ error: "Post not found" }, { status: 404 });
// // //   }
// // // }

// // // // PUT: Update Post
// // // export async function PUT(req: Request, { params }: RouteContext) {
// // //   try {
// // //     const { slug: currentSlug } = await params;

// // //     if (!currentSlug)
// // //       return NextResponse.json({ error: "Missing slug" }, { status: 400 });

// // //     const body = await req.json();
// // //     const { newSlug, rawContent, ...meta } = body;

// // //     const oldPath = path.join(postsDirectory, `${currentSlug}.md`);

// // //     if (newSlug && newSlug !== currentSlug) {
// // //       await fs.unlink(oldPath).catch(() => {});
// // //     }

// // //     const targetSlug = newSlug || currentSlug;
// // //     const safeSlug = targetSlug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
// // //     const newPath = path.join(postsDirectory, `${safeSlug}.md`);

// // //     const fileContent = matter.stringify(rawContent || "", meta);
// // //     await fs.writeFile(newPath, fileContent, "utf8");

// // //     return NextResponse.json({ success: true, slug: safeSlug });
// // //   } catch (error) {
// // //     console.error(error);
// // //     return NextResponse.json({ error: "Update failed" }, { status: 500 });
// // //   }
// // // }

// // // // DELETE: Remove Post
// // // export async function DELETE(req: Request, { params }: RouteContext) {
// // //   try {
// // //     const { slug } = await params;

// // //     if (!slug)
// // //       return NextResponse.json({ error: "Missing slug" }, { status: 400 });

// // //     const filePath = path.join(postsDirectory, `${slug}.md`);
// // //     await fs.unlink(filePath);
// // //     return NextResponse.json({ success: true });
// // //   } catch (error) {
// // //     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
// // //   }
// // // }

// // // // import { NextResponse } from "next/server";
// // // // import { Octokit } from "@octokit/rest";
// // // // import matter from "gray-matter";

// // // // const octokit = new Octokit({
// // // //   auth: process.env.GITHUB_TOKEN,
// // // // });

// // // // const CONFIG = {
// // // //   owner: process.env.GITHUB_OWNER!,
// // // //   repo: process.env.GITHUB_REPO!,
// // // //   path: "posts",
// // // // };

// // // // async function getFileSha(slug: string) {
// // // //   try {
// // // //     const { data } = await octokit.repos.getContent({
// // // //       ...CONFIG,
// // // //       path: `${CONFIG.path}/${slug}.md`,
// // // //     });

// // // //     // @ts-ignore
// // // //     return data.sha;
// // // //   } catch (error) {
// // // //     return null;
// // // //   }
// // // // }

// // // // // GET: Fetch a single post from GitHub
// // // // export async function GET(
// // // //   req: Request,
// // // //   { params }: { params: Promise<{ slug: string }> }
// // // // ) {
// // // //   try {
// // // //     const { slug } = await params;

// // // //     const { data } = await octokit.repos.getContent({
// // // //       ...CONFIG,
// // // //       path: `${CONFIG.path}/${slug}.md`,
// // // //     });

// // // //     // @ts-ignore - Decode Base64 content
// // // //     const content = Buffer.from(data.content, "base64").toString("utf-8");
// // // //     const { data: frontmatter, content: markdownBody } = matter(content);

// // // //     return NextResponse.json({
// // // //       slug,
// // // //       ...frontmatter,
// // // //       rawContent: markdownBody,
// // // //     });
// // // //   } catch (error) {
// // // //     return NextResponse.json({ error: "Post not found" }, { status: 404 });
// // // //   }
// // // // }

// // // // // PUT: Update or Create a post
// // // // export async function PUT(
// // // //   req: Request,
// // // //   { params }: { params: Promise<{ slug: string }> }
// // // // ) {
// // // //   try {
// // // //     const { slug: currentSlug } = await params;
// // // //     const body = await req.json();
// // // //     const { newSlug, rawContent, ...meta } = body;

// // // //     const targetSlug = newSlug || currentSlug;
// // // //     const fileName = `${targetSlug}.md`;

// // // //     // 1. Create the file content (Frontmatter + Markdown)
// // // //     const fileContent = matter.stringify(rawContent || "", meta);
// // // //     const base64Content = Buffer.from(fileContent).toString("base64");

// // // //     // 2. Check if we need to rename (Delete old -> Create new)
// // // //     if (newSlug && newSlug !== currentSlug) {
// // // //       const oldSha = await getFileSha(currentSlug);
// // // //       if (oldSha) {
// // // //         await octokit.repos.deleteFile({
// // // //           ...CONFIG,
// // // //           path: `${CONFIG.path}/${currentSlug}.md`,
// // // //           message: `chore: rename ${currentSlug} to ${newSlug}`,
// // // //           sha: oldSha,
// // // //         });
// // // //       }
// // // //     }

// // // //     // 3. Update or Create the file
// // // //     const targetSha = await getFileSha(targetSlug);

// // // //     await octokit.repos.createOrUpdateFileContents({
// // // //       ...CONFIG,
// // // //       path: `${CONFIG.path}/${fileName}`,
// // // //       message: `feat(blog): update post ${targetSlug}`,
// // // //       content: base64Content,
// // // //       sha: targetSha || undefined,
// // // //     });

// // // //     return NextResponse.json({ success: true, slug: targetSlug });
// // // //   } catch (error) {
// // // //     console.error(error);
// // // //     return NextResponse.json(
// // // //       { error: "Failed to save to GitHub" },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // // DELETE: Remove a post
// // // // export async function DELETE(
// // // //   req: Request,
// // // //   { params }: { params: Promise<{ slug: string }> }
// // // // ) {
// // // //   try {
// // // //     const { slug } = await params;
// // // //     const sha = await getFileSha(slug);

// // // //     if (!sha) {
// // // //       return NextResponse.json({ error: "File not found" }, { status: 404 });
// // // //     }

// // // //     await octokit.repos.deleteFile({
// // // //       ...CONFIG,
// // // //       path: `${CONFIG.path}/${slug}.md`,
// // // //       message: `chore(blog): delete post ${slug}`,
// // // //       sha: sha,
// // // //     });

// // // //     return NextResponse.json({ success: true });
// // // //   } catch (error) {
// // // //     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
// // // //   }
// // // // }

// // // app/api/posts/[slug]/route.ts
// // import { NextResponse } from "next/server";
// // import { r2, R2_BUCKET } from "@/lib/r2";
// // import {
// //   GetObjectCommand,
// //   PutObjectCommand,
// //   DeleteObjectCommand,
// // } from "@aws-sdk/client-s3";
// // import matter from "gray-matter";

// // export const dynamic = "force-dynamic";

// // type RouteContext = {
// //   params: Promise<{ slug: string }>;
// // };

// // // GET: Single Post Content
// // export async function GET(req: Request, { params }: RouteContext) {
// //   try {
// //     const { slug } = await params;
// //     if (!slug)
// //       return NextResponse.json({ error: "Missing slug" }, { status: 400 });

// //     const command = new GetObjectCommand({
// //       Bucket: R2_BUCKET,
// //       Key: `${slug}.md`,
// //     });

// //     const response = await r2.send(command);
// //     const fileContent = await response.Body?.transformToString();

// //     if (!fileContent) throw new Error("Empty file");

// //     const { data, content } = matter(fileContent);

// //     return NextResponse.json({
// //       slug,
// //       ...data,
// //       rawContent: content,
// //     });
// //   } catch (error) {
// //     return NextResponse.json({ error: "Post not found" }, { status: 404 });
// //   }
// // }

// // // PUT: Update Post
// // export async function PUT(req: Request, { params }: RouteContext) {
// //   try {
// //     const { slug: currentSlug } = await params;
// //     if (!currentSlug)
// //       return NextResponse.json({ error: "Missing slug" }, { status: 400 });

// //     const body = await req.json();
// //     const { newSlug, rawContent, ...meta } = body;

// //     // Handle Rename: If slug changes, delete old file
// //     if (newSlug && newSlug !== currentSlug) {
// //       const deleteCmd = new DeleteObjectCommand({
// //         Bucket: R2_BUCKET,
// //         Key: `${currentSlug}.md`,
// //       });
// //       await r2.send(deleteCmd);
// //     }

// //     const targetSlug = newSlug || currentSlug;
// //     const safeSlug = targetSlug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();

// //     const fileContent = matter.stringify(rawContent || "", meta);

// //     const putCmd = new PutObjectCommand({
// //       Bucket: R2_BUCKET,
// //       Key: `${safeSlug}.md`,
// //       Body: fileContent,
// //       ContentType: "text/markdown",
// //     });

// //     await r2.send(putCmd);

// //     return NextResponse.json({ success: true, slug: safeSlug });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json({ error: "Update failed" }, { status: 500 });
// //   }
// // }

// // // DELETE: Remove Post
// // export async function DELETE(req: Request, { params }: RouteContext) {
// //   try {
// //     const { slug } = await params;
// //     if (!slug)
// //       return NextResponse.json({ error: "Missing slug" }, { status: 400 });

// //     const command = new DeleteObjectCommand({
// //       Bucket: R2_BUCKET,
// //       Key: `${slug}.md`,
// //     });

// //     await r2.send(command);
// //     return NextResponse.json({ success: true });
// //   } catch (error) {
// //     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
// //   }
// // }

// // app/api/posts/[slug]/route.ts
// import { NextResponse } from "next/server";
// import { octokit, GITHUB_CONFIG } from "@/lib/github";
// import matter from "gray-matter";

// export const runtime = "edge";

// export const dynamic = "force-dynamic";

// type RouteContext = {
//   params: Promise<{ slug: string }>;
// };

// // GET: Single Post Content
// export async function GET(req: Request, { params }: RouteContext) {
//   try {
//     const { slug } = await params;
//     const filePath = `${GITHUB_CONFIG.path}/${slug}.md`;

//     const { data } = await octokit.rest.repos.getContent({
//       owner: GITHUB_CONFIG.owner,
//       repo: GITHUB_CONFIG.repo,
//       path: filePath,
//       ref: GITHUB_CONFIG.branch,
//     });

//     if (!("content" in data)) throw new Error("No content");

//     const fileContent = Buffer.from(data.content, "base64").toString("utf8");
//     const { data: meta, content } = matter(fileContent);

//     return NextResponse.json({
//       slug,
//       ...meta,
//       rawContent: content,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: "Post not found" }, { status: 404 });
//   }
// }

// // PUT: Update Post
// export async function PUT(req: Request, { params }: RouteContext) {
//   try {
//     const { slug: currentSlug } = await params;
//     const body = await req.json();
//     const { newSlug, rawContent, ...meta } = body;

//     const oldPath = `${GITHUB_CONFIG.path}/${currentSlug}.md`;

//     // 1. Get current file SHA (Required for update/delete)
//     const { data: currentFile } = await octokit.rest.repos.getContent({
//       owner: GITHUB_CONFIG.owner,
//       repo: GITHUB_CONFIG.repo,
//       path: oldPath,
//       ref: GITHUB_CONFIG.branch,
//     });

//     if (!("sha" in currentFile)) throw new Error("File not found");

//     const targetSlug = newSlug || currentSlug;
//     const safeSlug = targetSlug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
//     const newPath = `${GITHUB_CONFIG.path}/${safeSlug}.md`;

//     const fileContent = matter.stringify(rawContent || "", meta);
//     const base64Content = Buffer.from(fileContent).toString("base64");

//     // Scenario A: Rename (Delete old, create new)
//     if (newSlug && newSlug !== currentSlug) {
//       // Delete old
//       await octokit.rest.repos.deleteFile({
//         owner: GITHUB_CONFIG.owner,
//         repo: GITHUB_CONFIG.repo,
//         path: oldPath,
//         message: `Delete post: ${currentSlug} (renaming)`,
//         sha: currentFile.sha,
//         branch: GITHUB_CONFIG.branch,
//       });

//       // Create new
//       await octokit.rest.repos.createOrUpdateFileContents({
//         owner: GITHUB_CONFIG.owner,
//         repo: GITHUB_CONFIG.repo,
//         path: newPath,
//         message: `Create post: ${safeSlug} (renamed from ${currentSlug})`,
//         content: base64Content,
//         branch: GITHUB_CONFIG.branch,
//       });
//     }
//     // Scenario B: Update content only
//     else {
//       await octokit.rest.repos.createOrUpdateFileContents({
//         owner: GITHUB_CONFIG.owner,
//         repo: GITHUB_CONFIG.repo,
//         path: oldPath, // Same path
//         message: `Update post: ${safeSlug}`,
//         content: base64Content,
//         sha: currentFile.sha, // Must provide SHA to update
//         branch: GITHUB_CONFIG.branch,
//       });
//     }

//     return NextResponse.json({ success: true, slug: safeSlug });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// }

// // DELETE: Remove Post
// export async function DELETE(req: Request, { params }: RouteContext) {
//   try {
//     const { slug } = await params;
//     const filePath = `${GITHUB_CONFIG.path}/${slug}.md`;

//     // 1. Get SHA
//     const { data } = await octokit.rest.repos.getContent({
//       owner: GITHUB_CONFIG.owner,
//       repo: GITHUB_CONFIG.repo,
//       path: filePath,
//       ref: GITHUB_CONFIG.branch,
//     });

//     if (!("sha" in data)) throw new Error("File not found");

//     // 2. Delete
//     await octokit.rest.repos.deleteFile({
//       owner: GITHUB_CONFIG.owner,
//       repo: GITHUB_CONFIG.repo,
//       path: filePath,
//       message: `Delete post: ${slug}`,
//       sha: data.sha,
//       branch: GITHUB_CONFIG.branch,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }

// app/api/posts/[slug]/route.ts
import { NextResponse } from "next/server";
import { octokit, GITHUB_CONFIG } from "@/lib/github";
import matter from "gray-matter";
import { base64ToUtf8, utf8ToBase64 } from "@/lib/base64";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function normalizeSlug(input: unknown) {
  if (typeof input !== "string") return null;
  const s = input.trim();
  if (!s || s === "undefined" || s === "null") return null;
  return s;
}

// GET: Single Post Content
export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { slug: rawSlug } = await params;
    const slug = normalizeSlug(rawSlug);

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const filePath = `${GITHUB_CONFIG.path}/${slug}.md`;

    const { data } = await octokit.rest.repos.getContent({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      path: filePath,
      ref: GITHUB_CONFIG.branch,
    });

    if (!("content" in data) || typeof data.content !== "string") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const fileContent = base64ToUtf8(data.content);
    const { data: meta, content } = matter(fileContent);

    return NextResponse.json({ slug, ...meta, rawContent: content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}

// PUT: Update Post (and optionally rename)
export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const { slug: rawSlug } = await params;
    const currentSlug = normalizeSlug(rawSlug);

    if (!currentSlug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const body = await req.json();
    const { newSlug, rawContent, ...meta } = body;

    const oldPath = `${GITHUB_CONFIG.path}/${currentSlug}.md`;

    const { data: currentFile } = await octokit.rest.repos.getContent({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      path: oldPath,
      ref: GITHUB_CONFIG.branch,
    });

    if (!("sha" in currentFile) || typeof currentFile.sha !== "string") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const targetSlug = (newSlug && String(newSlug)) || currentSlug;
    const safeSlug = targetSlug
      .replace(/[^a-z0-9-]/gi, "-")
      .toLowerCase()
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!safeSlug) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const newPath = `${GITHUB_CONFIG.path}/${safeSlug}.md`;

    const fileContent = matter.stringify(rawContent || "", meta);
    const base64Content = utf8ToBase64(fileContent);

    if (newSlug && newSlug !== currentSlug) {
      // Delete old
      await octokit.rest.repos.deleteFile({
        owner: GITHUB_CONFIG.owner,
        repo: GITHUB_CONFIG.repo,
        path: oldPath,
        message: `Delete post: ${currentSlug} (renaming)`,
        sha: currentFile.sha,
        branch: GITHUB_CONFIG.branch,
      });

      // Create new
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: GITHUB_CONFIG.owner,
        repo: GITHUB_CONFIG.repo,
        path: newPath,
        message: `Create post: ${safeSlug} (renamed from ${currentSlug})`,
        content: base64Content,
        branch: GITHUB_CONFIG.branch,
      });
    } else {
      // Update same file
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: GITHUB_CONFIG.owner,
        repo: GITHUB_CONFIG.repo,
        path: oldPath,
        message: `Update post: ${safeSlug}`,
        content: base64Content,
        sha: currentFile.sha,
        branch: GITHUB_CONFIG.branch,
      });
    }

    return NextResponse.json({ success: true, slug: safeSlug });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE: Remove Post
export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const { slug: rawSlug } = await params;
    const slug = normalizeSlug(rawSlug);

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const filePath = `${GITHUB_CONFIG.path}/${slug}.md`;

    const { data } = await octokit.rest.repos.getContent({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      path: filePath,
      ref: GITHUB_CONFIG.branch,
    });

    if (!("sha" in data) || typeof data.sha !== "string") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await octokit.rest.repos.deleteFile({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      path: filePath,
      message: `Delete post: ${slug}`,
      sha: data.sha,
      branch: GITHUB_CONFIG.branch,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
