"use server";

import { octokit, GITHUB_CONFIG } from "@/lib/github";
import matter from "gray-matter";
import { utf8ToBase64 } from "@/lib/base64";
import { revalidatePath } from "next/cache";

function safeSlug(input: string) {
  return String(input || "")
    .replace(/[^a-z0-9-]/gi, "-")
    .toLowerCase()
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function deletePostAction(slug: string) {
  try {
    const s = safeSlug(slug);
    const filePath = `${GITHUB_CONFIG.path}/${s}.md`;

    const { data } = await octokit.rest.repos.getContent({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      path: filePath,
      ref: GITHUB_CONFIG.branch,
    });

    if (!("sha" in data) || typeof data.sha !== "string") {
      return { success: false, error: "Post not found" };
    }

    await octokit.rest.repos.deleteFile({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      path: filePath,
      message: `Delete post: ${s}`,
      sha: data.sha,
      branch: GITHUB_CONFIG.branch,
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || "Delete failed" };
  }
}

export async function upsertPostAction(input: {
  slug: string;
  newSlug?: string;
  rawContent: string;
  meta: Record<string, any>;
}) {
  try {
    const current = safeSlug(input.slug);
    const next = safeSlug(input.newSlug || input.slug);

    if (!next) return { success: false, error: "Invalid slug" };

    const oldPath = `${GITHUB_CONFIG.path}/${current}.md`;
    const newPath = `${GITHUB_CONFIG.path}/${next}.md`;

    // get old sha (if exists)
    const old = await octokit.rest.repos.getContent({
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      path: oldPath,
      ref: GITHUB_CONFIG.branch,
    });

    const oldSha =
      "sha" in old.data && typeof old.data.sha === "string"
        ? old.data.sha
        : null;

    const fileContent = matter.stringify(
      input.rawContent || "",
      input.meta || {}
    );
    const content = utf8ToBase64(fileContent);

    // rename: delete old then create new
    if (oldSha && current !== next) {
      await octokit.rest.repos.deleteFile({
        owner: GITHUB_CONFIG.owner,
        repo: GITHUB_CONFIG.repo,
        path: oldPath,
        message: `Delete post: ${current} (renaming)`,
        sha: oldSha,
        branch: GITHUB_CONFIG.branch,
      });

      await octokit.rest.repos.createOrUpdateFileContents({
        owner: GITHUB_CONFIG.owner,
        repo: GITHUB_CONFIG.repo,
        path: newPath,
        message: `Create post: ${next} (renamed from ${current})`,
        content,
        branch: GITHUB_CONFIG.branch,
      });
    } else {
      // update or create
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: GITHUB_CONFIG.owner,
        repo: GITHUB_CONFIG.repo,
        path: newPath,
        message: oldSha ? `Update post: ${next}` : `Create post: ${next}`,
        content,
        sha: oldSha || undefined,
        branch: GITHUB_CONFIG.branch,
      });
    }

    revalidatePath("/dashboard");
    return { success: true, slug: next };
  } catch (e: any) {
    return { success: false, error: e?.message || "Save failed" };
  }
}
