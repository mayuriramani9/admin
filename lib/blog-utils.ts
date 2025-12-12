// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";

// const postsDirectory = path.join(process.cwd(), "posts");

// if (!fs.existsSync(postsDirectory)) {
//   fs.mkdirSync(postsDirectory);
// }

// export interface BlogPostBlock {
//   type: string;
//   text?: string;
//   id?: string;
//   items?: string[];
// }

// export interface BlogPost {
//   id: string;
//   title: string;
//   subtitle?: string;
//   excerpt?: string;
//   date: string;
//   readTime: string;
//   author: string;
//   authorRole?: string;
//   category: string;
//   featured?: boolean;
//   iconName?: string; // Store icon name (e.g., "Cpu")
//   content?: any[];
// }

// // --- HELPER: CONVERT MARKDOWN BODY TO YOUR CUSTOM JSON BLOCKS ---
// function parseMarkdownToBlocks(markdown: string): BlogPostBlock[] {
//   const lines = markdown.split("\n");
//   const blocks: BlogPostBlock[] = [];
//   let currentListItems: string[] = [];

//   lines.forEach((line) => {
//     const trimmed = line.trim();
//     if (!trimmed) return;

//     // Handle H2 (## Title)
//     if (trimmed.startsWith("## ")) {
//       // Flush any pending list
//       if (currentListItems.length > 0) {
//         blocks.push({ type: "list", items: [...currentListItems] });
//         currentListItems = [];
//       }
//       const text = trimmed.replace("## ", "");
//       blocks.push({
//         type: "h2",
//         text,
//         id: text.toLowerCase().replace(/\s+/g, "-"),
//       });
//     }
//     // Handle Blockquote (> Text)
//     else if (trimmed.startsWith("> ")) {
//       if (currentListItems.length > 0) {
//         blocks.push({ type: "list", items: [...currentListItems] });
//         currentListItems = [];
//       }
//       blocks.push({ type: "quote", text: trimmed.replace("> ", "") });
//     }
//     // Handle List Items (- Item)
//     else if (trimmed.startsWith("- ")) {
//       currentListItems.push(trimmed.replace("- ", ""));
//     }
//     // Handle Paragraphs
//     else {
//       if (currentListItems.length > 0) {
//         blocks.push({ type: "list", items: [...currentListItems] });
//         currentListItems = [];
//       }
//       blocks.push({ type: "p", text: trimmed });
//     }
//   });

//   // Flush remaining list if any
//   if (currentListItems.length > 0) {
//     blocks.push({ type: "list", items: [...currentListItems] });
//   }

//   return blocks;
// }

// // --- GET SINGLE POST ---
// export function getPostBySlug(slug: string): BlogPost | null {
//   const realSlug = slug.replace(/\.md$/, "");
//   const fullPath = path.join(postsDirectory, `${realSlug}.md`);

//   try {
//     const fileContents = fs.readFileSync(fullPath, "utf8");
//     const { data, content } = matter(fileContents);

//     // Convert raw Markdown content to your specific JSON structure
//     const structuredContent = parseMarkdownToBlocks(content);

//     return {
//       id: realSlug,
//       title: data.title,
//       subtitle: data.subtitle,
//       date: data.date,
//       readTime: data.readTime,
//       author: data.author,
//       authorRole: data.authorRole,
//       category: data.category,
//       content: structuredContent,
//     };
//   } catch (err) {
//     return null;
//   }
// }

// // --- GET ALL SLUGS (For Static Generation) ---
// export function getAllPostSlugs() {
//   return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
// }

// export function getAllPosts(): BlogPost[] {
//   // 1. Get all files in 'posts' folder
//   const fileNames = fs.readdirSync(postsDirectory);

//   const allPosts = fileNames
//     .filter((fileName) => fileName.endsWith(".md"))
//     .map((fileName) => {
//       // 2. Read frontmatter
//       const fullPath = path.join(postsDirectory, fileName);
//       const fileContents = fs.readFileSync(fullPath, "utf8");
//       const { data, content } = matter(fileContents);

//       // 3. Generate a fallback excerpt if not provided
//       const fallbackExcerpt =
//         content.slice(0, 150).replace(/[#*`]/g, "") + "...";

//       return {
//         id: fileName.replace(/\.md$/, ""),
//         title: data.title,
//         excerpt: data.excerpt || data.subtitle || fallbackExcerpt,
//         date: data.date,
//         readTime: data.readTime,
//         author: data.author,
//         category: data.category || "General",
//         featured: data.featured === true,
//         iconName: data.iconName || "FileText", // Default icon
//       };
//     });

//   // 4. Sort posts by date (Newest first)
//   return allPosts.sort((a, b) => {
//     return new Date(b.date).getTime() - new Date(a.date).getTime();
//   });
// }

// // // lib/blog-utils.ts
// // import { r2, R2_BUCKET } from "./r2";
// // import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
// // import matter from "gray-matter";

// // // Keep your interfaces as they were
// // export interface BlogPostBlock {
// //   type: string;
// //   text?: string;
// //   id?: string;
// //   items?: string[];
// // }

// // export interface BlogPost {
// //   id: string;
// //   title: string;
// //   subtitle?: string;
// //   excerpt?: string;
// //   date: string;
// //   readTime: string;
// //   author: string;
// //   authorRole?: string;
// //   category: string;
// //   featured?: boolean;
// //   iconName?: string;
// //   content?: any[];
// // }

// // // --- HELPER: CONVERT STREAM TO STRING ---
// // const streamToString = (stream: any): Promise<string> =>
// //   new Promise((resolve, reject) => {
// //     const chunks: any[] = [];
// //     stream.on("data", (chunk: any) => chunks.push(chunk));
// //     stream.on("error", reject);
// //     stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
// //   });

// // // --- HELPER: PARSE MARKDOWN (Unchanged Logic) ---
// // function parseMarkdownToBlocks(markdown: string): BlogPostBlock[] {
// //   const lines = markdown.split("\n");
// //   const blocks: BlogPostBlock[] = [];
// //   let currentListItems: string[] = [];

// //   lines.forEach((line) => {
// //     const trimmed = line.trim();
// //     if (!trimmed) return;

// //     if (trimmed.startsWith("## ")) {
// //       if (currentListItems.length > 0) {
// //         blocks.push({ type: "list", items: [...currentListItems] });
// //         currentListItems = [];
// //       }
// //       const text = trimmed.replace("## ", "");
// //       blocks.push({
// //         type: "h2",
// //         text,
// //         id: text.toLowerCase().replace(/\s+/g, "-"),
// //       });
// //     } else if (trimmed.startsWith("> ")) {
// //       if (currentListItems.length > 0) {
// //         blocks.push({ type: "list", items: [...currentListItems] });
// //         currentListItems = [];
// //       }
// //       blocks.push({ type: "quote", text: trimmed.replace("> ", "") });
// //     } else if (trimmed.startsWith("- ")) {
// //       currentListItems.push(trimmed.replace("- ", ""));
// //     } else {
// //       if (currentListItems.length > 0) {
// //         blocks.push({ type: "list", items: [...currentListItems] });
// //         currentListItems = [];
// //       }
// //       blocks.push({ type: "p", text: trimmed });
// //     }
// //   });

// //   if (currentListItems.length > 0) {
// //     blocks.push({ type: "list", items: [...currentListItems] });
// //   }

// //   return blocks;
// // }

// // // --- GET SINGLE POST (Async now) ---
// // export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
// //   const realSlug = slug.replace(/\.md$/, "");
// //   const key = `${realSlug}.md`;

// //   try {
// //     const command = new GetObjectCommand({
// //       Bucket: R2_BUCKET,
// //       Key: key,
// //     });

// //     const response = await r2.send(command);

// //     // AWS SDK v3 streams body
// //     const fileContents = await response.Body?.transformToString();

// //     if (!fileContents) return null;

// //     const { data, content } = matter(fileContents);
// //     const structuredContent = parseMarkdownToBlocks(content);

// //     return {
// //       id: realSlug,
// //       title: data.title,
// //       subtitle: data.subtitle,
// //       date: data.date,
// //       readTime: data.readTime,
// //       author: data.author,
// //       authorRole: data.authorRole,
// //       category: data.category,
// //       content: structuredContent,
// //     };
// //   } catch (err) {
// //     console.error("Error fetching post:", err);
// //     return null;
// //   }
// // }

// // // --- GET ALL SLUGS ---
// // export async function getAllPostSlugs() {
// //   try {
// //     const command = new ListObjectsV2Command({
// //       Bucket: R2_BUCKET,
// //     });
// //     const response = await r2.send(command);
// //     const contents = response.Contents || [];

// //     return contents
// //       .filter((file) => file.Key && file.Key.endsWith(".md"))
// //       .map((file) => file.Key!);
// //   } catch (error) {
// //     return [];
// //   }
// // }

// // // --- GET ALL POSTS ---
// // export async function getAllPosts(): Promise<BlogPost[]> {
// //   try {
// //     const command = new ListObjectsV2Command({
// //       Bucket: R2_BUCKET,
// //     });
// //     const response = await r2.send(command);
// //     const contents = response.Contents || [];

// //     // Map over files and fetch content in parallel
// //     const postPromises = contents
// //       .filter((file) => file.Key && file.Key.endsWith(".md"))
// //       .map(async (file) => {
// //         try {
// //           const getCmd = new GetObjectCommand({
// //             Bucket: R2_BUCKET,
// //             Key: file.Key,
// //           });
// //           const res = await r2.send(getCmd);
// //           const fileContents = await res.Body?.transformToString();

// //           if (!fileContents) return null;

// //           const { data, content } = matter(fileContents);
// //           const fallbackExcerpt =
// //             content.slice(0, 150).replace(/[#*`]/g, "") + "...";

// //           return {
// //             id: file.Key!.replace(/\.md$/, ""),
// //             title: data.title,
// //             excerpt: data.excerpt || data.subtitle || fallbackExcerpt,
// //             date: data.date,
// //             readTime: data.readTime,
// //             author: data.author,
// //             category: data.category || "General",
// //             featured: data.featured === true,
// //             iconName: data.iconName || "FileText",
// //           } as BlogPost;
// //         } catch (e) {
// //           return null;
// //         }
// //       });

// //     const allPosts = (await Promise.all(postPromises)).filter(
// //       (post): post is BlogPost => post !== null
// //     );

// //     return allPosts.sort((a, b) => {
// //       return new Date(b.date).getTime() - new Date(a.date).getTime();
// //     });
// //   } catch (error) {
// //     console.error("Error fetching all posts:", error);
// //     return [];
// //   }
// // }

// // lib/blog-utils.ts
// // import { octokit, GITHUB_CONFIG } from "./github";
// // import matter from "gray-matter";
// // import { remark } from "remark";
// // import remarkParse from "remark-parse";

// // // Keep your interfaces (BlogPost, BlogPostBlock, etc.) exactly as they were
// // export interface BlogPostBlock {
// //   type: string;
// //   text?: string;
// //   id?: string;
// //   items?: string[];
// // }

// // export interface BlogPost {
// //   id: string;
// //   title: string;
// //   subtitle?: string;
// //   excerpt?: string;
// //   date: string;
// //   readTime: string;
// //   author: string;
// //   authorRole?: string;
// //   category: string;
// //   featured?: boolean;
// //   iconName?: string;
// //   content?: any[];
// // }

// // // --- HELPER: PARSE MARKDOWN ---
// // function parseMarkdownToBlocks(markdown: string): BlogPostBlock[] {
// //   // ... (Keep your existing parsing logic here) ...
// //   // For brevity, I am omitting the parsing logic body,
// //   // but paste your original `parseMarkdownToBlocks` function here.
// //   return [];
// // }

// // // --- GET SINGLE POST ---
// // export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
// //   const realSlug = slug.replace(/\.md$/, "");
// //   const filePath = `${GITHUB_CONFIG.path}/${realSlug}.md`;

// //   try {
// //     const res = await octokit.rest.repos.getContent({
// //       owner: GITHUB_CONFIG.owner,
// //       repo: GITHUB_CONFIG.repo,
// //       path: filePath,
// //       ref: GITHUB_CONFIG.branch,
// //     });

// //     const data = res.data;

// //     // If it's a directory, GitHub returns an array
// //     if (Array.isArray(data)) return null;

// //     if (!("content" in data) || typeof data.content !== "string") return null;

// //     const base64 = data.content.replace(/\n/g, ""); // IMPORTANT
// //     const fileContent = Buffer.from(
// //       base64,
// //       (data as any).encoding ?? "base64"
// //     ).toString("utf8");

// //     const parsed = matter(fileContent);
// //     const markdownBody = (parsed.content ?? "").trim();

// //     // Debug temporarily
// //     console.log("MD body length:", markdownBody.length);
// //     console.log("MD body preview:", markdownBody.slice(0, 200));

// //     const structuredContent = parseMarkdownToBlocks(markdownBody);

// //     return {
// //       id: realSlug,
// //       title: parsed.data.title,
// //       subtitle: parsed.data.subtitle,
// //       date: parsed.data.date,
// //       readTime: parsed.data.readTime,
// //       author: parsed.data.author,
// //       authorRole: parsed.data.authorRole,
// //       category: parsed.data.category,
// //       content: structuredContent,
// //     } as BlogPost;
// //   } catch (err) {
// //     console.error("Error fetching post from GitHub:", err);
// //     return null;
// //   }
// // }

// // // --- GET ALL SLUGS ---
// // export async function getAllPostSlugs() {
// //   try {
// //     const { data } = await octokit.rest.repos.getContent({
// //       owner: GITHUB_CONFIG.owner,
// //       repo: GITHUB_CONFIG.repo,
// //       path: GITHUB_CONFIG.path,
// //       ref: GITHUB_CONFIG.branch,
// //     });

// //     if (!Array.isArray(data)) return [];

// //     return data
// //       .filter((file) => file.name.endsWith(".md"))
// //       .map((file) => file.name);
// //   } catch (error) {
// //     return [];
// //   }
// // }

// // // --- GET ALL POSTS ---
// // export async function getAllPosts(): Promise<BlogPost[]> {
// //   try {
// //     // 1. List all files in the 'posts' directory
// //     const { data: files } = await octokit.rest.repos.getContent({
// //       owner: GITHUB_CONFIG.owner,
// //       repo: GITHUB_CONFIG.repo,
// //       path: GITHUB_CONFIG.path,
// //       ref: GITHUB_CONFIG.branch,
// //     });

// //     if (!Array.isArray(files)) return [];

// //     // 2. Fetch content for each file in parallel
// //     const postPromises = files
// //       .filter((file) => file.name.endsWith(".md"))
// //       .map(async (file) => {
// //         try {
// //           // Fetch individual file content
// //           const { data } = await octokit.rest.repos.getContent({
// //             owner: GITHUB_CONFIG.owner,
// //             repo: GITHUB_CONFIG.repo,
// //             path: file.path,
// //             ref: GITHUB_CONFIG.branch,
// //           });

// //           if (!("content" in data)) return null;

// //           const fileContent = Buffer.from(data.content, "base64").toString(
// //             "utf8"
// //           );
// //           const { data: meta, content } = matter(fileContent);

// //           const fallbackExcerpt =
// //             content.slice(0, 150).replace(/[#*`]/g, "") + "...";

// //           return {
// //             id: file.name.replace(/\.md$/, ""),
// //             title: meta.title,
// //             excerpt: meta.excerpt || meta.subtitle || fallbackExcerpt,
// //             date: meta.date,
// //             readTime: meta.readTime,
// //             author: meta.author,
// //             category: meta.category || "General",
// //             featured: meta.featured === true,
// //             iconName: meta.iconName || "FileText",
// //           } as BlogPost;
// //         } catch (e) {
// //           return null;
// //         }
// //       });

// //     const allPosts = (await Promise.all(postPromises)).filter(
// //       (post): post is BlogPost => post !== null
// //     );

// //     return allPosts.sort((a, b) => {
// //       return new Date(b.date).getTime() - new Date(a.date).getTime();
// //     });
// //   } catch (error) {
// //     console.error("Error fetching all posts:", error);
// //     return [];
// //   }
// // }

import matter from "gray-matter";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "master";

const GH_BASE_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/posts`;
const GH_HEADERS = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

export interface BlogPostBlock {
  type: string;
  text?: string;
  id?: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole?: string;
  category: string;
  featured?: boolean;
  rawContent?: string;
  iconName?: string;
  content?: BlogPostBlock[];
}

function parseMarkdownToBlocks(markdown: string): BlogPostBlock[] {
  const lines = markdown.split("\n");
  const blocks: BlogPostBlock[] = [];
  let currentListItems: string[] = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith("## ")) {
      if (currentListItems.length > 0) {
        blocks.push({ type: "list", items: [...currentListItems] });
        currentListItems = [];
      }
      const text = trimmed.replace("## ", "");
      blocks.push({
        type: "h2",
        text,
        id: text.toLowerCase().replace(/\s+/g, "-"),
      });
    } else if (trimmed.startsWith("> ")) {
      if (currentListItems.length > 0) {
        blocks.push({ type: "list", items: [...currentListItems] });
        currentListItems = [];
      }
      blocks.push({ type: "quote", text: trimmed.replace("> ", "") });
    } else if (trimmed.startsWith("- ")) {
      currentListItems.push(trimmed.replace("- ", ""));
    } else {
      if (currentListItems.length > 0) {
        blocks.push({ type: "list", items: [...currentListItems] });
        currentListItems = [];
      }
      blocks.push({ type: "p", text: trimmed });
    }
  });

  if (currentListItems.length > 0) {
    blocks.push({ type: "list", items: [...currentListItems] });
  }

  return blocks;
}

// --- NEW HELPER: FETCH RAW FILE CONTENT FROM GITHUB ---
async function fetchGitHubRawFile(filename: string): Promise<string | null> {
  const url = `${GH_BASE_URL}/${filename}?ref=${GITHUB_BRANCH}`;

  try {
    // Requesting raw format directly simplifies parsing
    const res = await fetch(url, {
      headers: {
        ...GH_HEADERS,
        Accept: "application/vnd.github.v3.raw",
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${filename}: ${res.statusText}`);
      return null;
    }

    return await res.text();
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    return null;
  }
}

// --- GET SINGLE POST ---
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const realSlug = slug.replace(/\.md$/, "");
  const filename = `${realSlug}.md`;

  const fileContents = await fetchGitHubRawFile(filename);

  if (!fileContents) return null;

  try {
    const { data, content } = matter(fileContents);
    const structuredContent = parseMarkdownToBlocks(content);

    // Generate fallback excerpt when none provided in frontmatter
    const fallbackExcerpt =
      (typeof content === "string" ? content.slice(0, 150) : "").replace(
        /[#*`]/g,
        ""
      ) + "...";

    return {
      id: realSlug,
      title: data.title,
      subtitle: data.subtitle,
      excerpt: data.excerpt || data.subtitle || fallbackExcerpt,
      date: data.date,
      readTime: data.readTime,
      author: data.author,
      authorRole: data.authorRole,
      category: data.category,
      rawContent: content,
      content: structuredContent,
    };
  } catch (err) {
    console.error("Error parsing markdown:", err);
    return null;
  }
}

// --- GET ALL POST SLUGS (ASYNC) ---
export async function getAllPostSlugs(): Promise<string[]> {
  const url = `${GH_BASE_URL}?ref=${GITHUB_BRANCH}`;

  try {
    const res = await fetch(url, { headers: GH_HEADERS });
    if (!res.ok) throw new Error(`GitHub API Error: ${res.statusText}`);

    const data: any[] = await res.json();

    return data
      .filter((file: any) => file.name.endsWith(".md"))
      .map((file: any) => file.name);
  } catch (error) {
    console.error("Error fetching post slugs:", error);
    return [];
  }
}

// --- GET ALL POSTS (ASYNC) ---
export async function getAllPosts(): Promise<BlogPost[]> {
  const url = `${GH_BASE_URL}?ref=${GITHUB_BRANCH}`;

  try {
    // 1. Get list of files in the directory
    const res = await fetch(url, { headers: GH_HEADERS });
    if (!res.ok) throw new Error(`GitHub API Error: ${res.statusText}`);

    const files: any[] = await res.json();

    const mdFiles = files.filter((file: any) => file.name.endsWith(".md"));

    // 2. Fetch content for ALL files in parallel
    const postsPromises = mdFiles.map(async (file: any) => {
      const rawContent = await fetchGitHubRawFile(file.name);

      if (!rawContent) return null;

      const { data, content } = matter(rawContent);

      // Generate fallback excerpt
      const fallbackExcerpt =
        content.slice(0, 150).replace(/[#*`]/g, "") + "...";

      return {
        id: file.name.replace(/\.md$/, ""),
        title: data.title,
        subtitle: data.subtitle,
        excerpt: data.excerpt || data.subtitle || fallbackExcerpt,
        date: data.date,
        readTime: data.readTime,
        author: data.author,
        category: data.category || "General",
        featured: data.featured,
        iconName: data.iconName || "FileText",
      };
    });

    // 3. Resolve all promises
    const allPosts = (await Promise.all(postsPromises)).filter(
      Boolean
    ) as BlogPost[];

    // 4. Sort posts by date (Newest first)
    return allPosts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
}
