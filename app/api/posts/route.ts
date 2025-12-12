// // // // import { NextResponse } from "next/server";
// // // // import fs from "fs/promises";
// // // // import path from "path";
// // // // import matter from "gray-matter";

// // // // const postsDirectory = path.join(process.cwd(), "posts");

// // // // export const dynamic = "force-dynamic";

// // // // // GET: List all posts
// // // // export async function GET() {
// // // //   try {
// // // //     try {
// // // //       await fs.access(postsDirectory);
// // // //     } catch {
// // // //       await fs.mkdir(postsDirectory, { recursive: true });
// // // //       return NextResponse.json([]);
// // // //     }

// // // //     const files = await fs.readdir(postsDirectory);

// // // //     const posts = await Promise.all(
// // // //       files
// // // //         .filter((file) => file.endsWith(".md"))
// // // //         .map(async (file) => {
// // // //           const content = await fs.readFile(
// // // //             path.join(postsDirectory, file),
// // // //             "utf8"
// // // //           );
// // // //           const { data } = matter(content);
// // // //           return {
// // // //             slug: file.replace(".md", ""),
// // // //             ...data,
// // // //           };
// // // //         })
// // // //     );

// // // //     return NextResponse.json(posts);
// // // //   } catch (error) {
// // // //     return NextResponse.json(
// // // //       { error: "Failed to fetch posts" },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // // POST: Create new post
// // // // export async function POST(req: Request) {
// // // //   try {
// // // //     const body = await req.json();
// // // //     const { slug, rawContent, ...meta } = body;
// // // //     const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();

// // // //     const fileContent = matter.stringify(rawContent || "", meta);

// // // //     await fs.writeFile(
// // // //       path.join(postsDirectory, `${safeSlug}.md`),
// // // //       fileContent,
// // // //       "utf8"
// // // //     );
// // // //     return NextResponse.json({ success: true, slug: safeSlug });
// // // //   } catch (error) {
// // // //     return NextResponse.json(
// // // //       { error: "Failed to create post" },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // // import { NextResponse } from "next/server";
// // // // // import { Octokit } from "@octokit/rest";
// // // // // import matter from "gray-matter";

// // // // // const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// // // // // const CONFIG = {
// // // // //   owner: process.env.GITHUB_OWNER!,
// // // // //   repo: process.env.GITHUB_REPO!,
// // // // //   path: "posts",
// // // // // };

// // // // // export const dynamic = "force-dynamic";

// // // // // // POST: Create a new file

// // // // // export async function POST(req: Request) {
// // // // //   try {
// // // // //     const body = await req.json();
// // // // //     const { slug, rawContent, ...meta } = body;

// // // // //     const fileContent = matter.stringify(rawContent || "", meta);
// // // // //     const base64Content = Buffer.from(fileContent).toString("base64");

// // // // //     await octokit.repos.createOrUpdateFileContents({
// // // // //       ...CONFIG,
// // // // //       path: `${CONFIG.path}/${slug}.md`,
// // // // //       message: `feat(blog): create new post ${slug}`,
// // // // //       content: base64Content,
// // // // //     });

// // // // //     return NextResponse.json({ success: true, slug });
// // // // //   } catch (error) {
// // // // //     return NextResponse.json(
// // // // //       { error: "Failed to create post" },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }

// // // // // // GET: List all posts
// // // // // export async function GET() {
// // // // //   try {
// // // // //     const { data } = await octokit.repos.getContent({
// // // // //       ...CONFIG,
// // // // //       path: CONFIG.path,
// // // // //     });

// // // // //     if (!Array.isArray(data)) {
// // // // //       return NextResponse.json([]);
// // // // //     }

// // // // //     const posts = await Promise.all(
// // // // //       data
// // // // //         .filter((file) => file.name.endsWith(".md"))
// // // // //         .map(async (file) => {
// // // // //           const { data: fileData } = await octokit.repos.getContent({
// // // // //             ...CONFIG,
// // // // //             path: file.path,
// // // // //           });

// // // // //           // @ts-ignore
// // // // //           const content = Buffer.from(fileData.content, "base64").toString(
// // // // //             "utf-8"
// // // // //           );
// // // // //           const { data: frontmatter } = matter(content);

// // // // //           return {
// // // // //             slug: file.name.replace(".md", ""),
// // // // //             title: frontmatter.title || file.name,
// // // // //             category: frontmatter.category || "Uncategorized",
// // // // //             date: frontmatter.date || "No date",
// // // // //           };
// // // // //         })
// // // // //     );

// // // // //     return NextResponse.json(posts);
// // // // //   } catch (error) {
// // // // //     console.error(error);
// // // // //     return NextResponse.json([]);
// // // // //   }
// // // // // }

// // // import { NextResponse } from "next/server";
// // // import { r2, R2_BUCKET } from "@/lib/r2";
// // // import {
// // //   ListObjectsV2Command,
// // //   GetObjectCommand,
// // //   PutObjectCommand,
// // // } from "@aws-sdk/client-s3";
// // // import matter from "gray-matter";

// // // export const dynamic = "force-dynamic";

// // // // GET: List all posts
// // // export async function GET() {
// // //   try {
// // //     // 1. List objects
// // //     const listCmd = new ListObjectsV2Command({ Bucket: R2_BUCKET });
// // //     const listRes = await r2.send(listCmd);
// // //     const contents = listRes.Contents || [];

// // //     // 2. Fetch content for each md file
// // //     const posts = await Promise.all(
// // //       contents
// // //         .filter((file) => file.Key && file.Key.endsWith(".md"))
// // //         .map(async (file) => {
// // //           const getCmd = new GetObjectCommand({
// // //             Bucket: R2_BUCKET,
// // //             Key: file.Key,
// // //           });
// // //           const res = await r2.send(getCmd);
// // //           const content = (await res.Body?.transformToString()) || "";

// // //           const { data } = matter(content);
// // //           return {
// // //             slug: file.Key!.replace(".md", ""),
// // //             ...data,
// // //           };
// // //         })
// // //     );

// // //     return NextResponse.json(posts);
// // //   } catch (error) {
// // //     console.error(error);
// // //     return NextResponse.json(
// // //       { error: "Failed to fetch posts" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // // POST: Create new post
// // // export async function POST(req: Request) {
// // //   try {
// // //     const body = await req.json();
// // //     const { slug, rawContent, ...meta } = body;
// // //     const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
// // //     const fileName = `${safeSlug}.md`;

// // //     const fileContent = matter.stringify(rawContent || "", meta);

// // //     const command = new PutObjectCommand({
// // //       Bucket: R2_BUCKET,
// // //       Key: fileName,
// // //       Body: fileContent,
// // //       ContentType: "text/markdown",
// // //     });

// // //     await r2.send(command);

// // //     return NextResponse.json({ success: true, slug: safeSlug });
// // //   } catch (error) {
// // //     console.error(error);
// // //     return NextResponse.json(
// // //       { error: "Failed to create post" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // app/api/posts/route.ts
// // import { NextResponse } from "next/server";
// // import { octokit, GITHUB_CONFIG } from "@/lib/github";
// // import matter from "gray-matter";

// // export const runtime = "edge";

// // export const dynamic = "force-dynamic";

// // // GET: List all posts
// // export async function GET() {
// //   try {
// //     const { data: files } = await octokit.rest.repos.getContent({
// //       owner: GITHUB_CONFIG.owner,
// //       repo: GITHUB_CONFIG.repo,
// //       path: GITHUB_CONFIG.path,
// //       ref: GITHUB_CONFIG.branch,
// //     });

// //     if (!Array.isArray(files)) return NextResponse.json([]);

// //     const posts = await Promise.all(
// //       files
// //         .filter((file) => file.name.endsWith(".md"))
// //         .map(async (file) => {
// //           const { data } = await octokit.rest.repos.getContent({
// //             owner: GITHUB_CONFIG.owner,
// //             repo: GITHUB_CONFIG.repo,
// //             path: file.path,
// //             ref: GITHUB_CONFIG.branch,
// //           });

// //           if (!("content" in data)) return null;

// //           const content = Buffer.from(data.content, "base64").toString("utf8");
// //           const { data: meta } = matter(content);

// //           return {
// //             slug: file.name.replace(".md", ""),
// //             ...meta,
// //           };
// //         })
// //     );

// //     return NextResponse.json(posts.filter(Boolean));
// //   } catch (error) {
// //     return NextResponse.json(
// //       { error: "Failed to fetch posts" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // POST: Create new post
// // export async function POST(req: Request) {
// //   try {
// //     const body = await req.json();
// //     const { slug, rawContent, ...meta } = body;
// //     const safeSlug = slug.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
// //     const fileName = `${safeSlug}.md`;
// //     const filePath = `${GITHUB_CONFIG.path}/${fileName}`;

// //     const fileContent = matter.stringify(rawContent || "", meta);
// //     const base64Content = Buffer.from(fileContent).toString("base64");

// //     await octokit.rest.repos.createOrUpdateFileContents({
// //       owner: GITHUB_CONFIG.owner,
// //       repo: GITHUB_CONFIG.repo,
// //       path: filePath,
// //       message: `Create post: ${safeSlug}`,
// //       content: base64Content,
// //       branch: GITHUB_CONFIG.branch,
// //     });

// //     return NextResponse.json({ success: true, slug: safeSlug });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json(
// //       { error: "Failed to create post" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // app/api/posts/route.ts
// import { NextResponse } from "next/server";
// import { octokit, GITHUB_CONFIG } from "@/lib/github";
// import matter from "gray-matter";
// import { base64ToUtf8, utf8ToBase64 } from "@/lib/base64";

// export const runtime = "edge";
// export const dynamic = "force-dynamic";

// // GET: List all posts
// export async function GET() {
//   try {
//     const { data: files } = await octokit.rest.repos.getContent({
//       owner: GITHUB_CONFIG.owner,
//       repo: GITHUB_CONFIG.repo,
//       path: GITHUB_CONFIG.path,
//       ref: GITHUB_CONFIG.branch,
//     });

//     if (!Array.isArray(files)) return NextResponse.json([]);

//     const posts = await Promise.all(
//       files
//         .filter((file) => file.name.endsWith(".md"))
//         .map(async (file) => {
//           const { data } = await octokit.rest.repos.getContent({
//             owner: GITHUB_CONFIG.owner,
//             repo: GITHUB_CONFIG.repo,
//             path: file.path,
//             ref: GITHUB_CONFIG.branch,
//           });

//           if (!("content" in data) || typeof data.content !== "string")
//             return null;

//           const content = base64ToUtf8(data.content);
//           const { data: meta } = matter(content);

//           return {
//             slug: file.name.replace(".md", ""),
//             ...meta,
//           };
//         })
//     );

//     return NextResponse.json(posts.filter(Boolean));
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to fetch posts" },
//       { status: 500 }
//     );
//   }
// }

// // POST: Create new post
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { slug, rawContent, ...meta } = body;

//     const safeSlug = String(slug || "")
//       .replace(/[^a-z0-9-]/gi, "-")
//       .toLowerCase()
//       .replace(/-+/g, "-")
//       .replace(/^-|-$/g, "");

//     if (!safeSlug) {
//       return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
//     }

//     const fileName = `${safeSlug}.md`;
//     const filePath = `${GITHUB_CONFIG.path}/${fileName}`;

//     const fileContent = matter.stringify(rawContent || "", meta);
//     const base64Content = utf8ToBase64(fileContent);

//     await octokit.rest.repos.createOrUpdateFileContents({
//       owner: GITHUB_CONFIG.owner,
//       repo: GITHUB_CONFIG.repo,
//       path: filePath,
//       message: `Create post: ${safeSlug}`,
//       content: base64Content,
//       branch: GITHUB_CONFIG.branch,
//     });

//     return NextResponse.json({ success: true, slug: safeSlug });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to create post" },
//       { status: 500 }
//     );
//   }
// }

// app/api/posts/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge"; // Required for Cloudflare

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Ensure this is set in Cloudflare Env vars
const GITHUB_API = "https://api.github.com";
const CONFIG = {
  owner: process.env.GITHUB_OWNER || "your-github-username",
  repo: process.env.GITHUB_REPO || "your-repo-name",
  path: process.env.GITHUB_PATH || "content/posts",
  branch: process.env.GITHUB_BRANCH || "master",
};

// HELPER: Native Base64 Decode (Edge friendly)
const decodeBase64 = (str: string) => {
  // Github adds newlines to base64, remove them
  const cleanStr = str.replace(/\n/g, "");
  return decodeURIComponent(escape(atob(cleanStr)));
};

// HELPER: Native Base64 Encode (Edge friendly)
const encodeBase64 = (str: string) => {
  return btoa(unescape(encodeURIComponent(str)));
};

// HELPER: Lightweight Front-matter parser (Replaces gray-matter)
function parseFrontMatter(text: string) {
  const match = text.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);

  if (!match) return { data: {}, content: text };

  const rawMeta = match[1];
  const content = match[2].trim();
  const data: Record<string, any> = {};

  // Simple YAML line parser (Key: Value)
  rawMeta.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      const val = valueParts.join(":").trim();
      // Remove quotes if present
      data[key.trim()] = val.replace(/^['"](.*)['"]$/, "$1");
    }
  });

  return { data, content };
}

// HELPER: Serialize Front-matter
function stringifyFrontMatter(content: string, meta: Record<string, any>) {
  const metaString = Object.entries(meta)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `---\n${metaString}\n---\n\n${content}`;
}

// GET: List all posts
export async function GET() {
  try {
    // 1. Fetch File List
    const listRes = await fetch(
      `${GITHUB_API}/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${CONFIG.path}?ref=${CONFIG.branch}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "User-Agent": "Nextjs-Edge-App",
        },
        cache: "no-store", // Adjust caching as needed
      }
    );

    if (!listRes.ok) return NextResponse.json([]);

    const files = await listRes.json();
    if (!Array.isArray(files)) return NextResponse.json([]);

    // 2. Fetch Content for each MD file in parallel
    const posts = await Promise.all(
      files
        .filter((file: any) => file.name.endsWith(".md"))
        .map(async (file: any) => {
          const fileRes = await fetch(file.url, {
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              "User-Agent": "Nextjs-Edge-App",
            },
          });

          const fileData = await fileRes.json();
          if (!fileData.content) return null;

          const rawContent = decodeBase64(fileData.content);
          const { data } = parseFrontMatter(rawContent);

          return {
            slug: file.name.replace(".md", ""),
            ...data,
          };
        })
    );

    return NextResponse.json(posts.filter(Boolean));
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST: Create new post
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, rawContent, ...meta } = body;

    // Validate Slug
    const safeSlug = String(slug || "")
      .replace(/[^a-z0-9-]/gi, "-")
      .toLowerCase()
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!safeSlug) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const fileName = `${safeSlug}.md`;
    const fullPath = `${CONFIG.path}/${fileName}`;

    // Prepare Content
    const fileContent = stringifyFrontMatter(rawContent || "", meta);
    const base64Content = encodeBase64(fileContent);

    // PUT request to GitHub (Create or Update)
    const putRes = await fetch(
      `${GITHUB_API}/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${fullPath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "User-Agent": "Nextjs-Edge-App",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Create post: ${safeSlug}`,
          content: base64Content,
          branch: CONFIG.branch,
        }),
      }
    );

    if (!putRes.ok) {
      const errorData = await putRes.json();
      console.error("GitHub Error:", errorData);
      throw new Error("GitHub API Error");
    }

    return NextResponse.json({ success: true, slug: safeSlug });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
