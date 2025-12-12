import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const GITHUB_CONFIG = {
  owner: process.env.GITHUB_OWNER!,
  repo: process.env.GITHUB_REPO!,
  branch: process.env.GITHUB_BRANCH || "main",
  path: "posts",
};
