"use client";

import { Button } from "@/components/ui/button";

import {
  Calendar,
  Clock,
  ArrowLeft,
  Linkedin,
  Twitter,
  Link as LinkIcon,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import LogoWhite from "../../../public/logo-light.png";
import LogoBlack from "../../../public/logo-dark.png";

export interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  category: string;
  content: {
    type: string;
    text?: string;
    id?: string;
    items?: string[];
  }[];
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const closeMenu = () => setIsMenuOpen(false);

  // Scroll Progress Bar Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = (platform: string) => {
    alert(`Shared to ${platform}`);
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-primary z-[60] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        {/* Header */}
        <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-primary/20 z-50 h-20 dark:bg-gradient-to-r dark:from-background/80 dark:to-background/50">
          <div className="container mx-auto h-full flex items-center justify-between">
            {/* Logo on the left */}
            <div>
              <Link href="/" className="cursor-pointer">
                <Image
                  src={LogoWhite}
                  alt="Logo"
                  width={120}
                  height={40}
                  className="block dark:hidden h-36 w-auto max-w-[600px] object-contain"
                />
                <Image
                  src={LogoBlack}
                  alt="Logo"
                  width={120}
                  height={40}
                  className="hidden dark:block h-36 w-auto max-w-[600px] object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="/#solution"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
                >
                  Solution
                </a>
                <a
                  href="/blogs"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
                >
                  Blogs / Articles
                </a>
                <a
                  href="/#demo"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
                >
                  Demo
                </a>
                <a
                  href="/#integrations"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
                >
                  Integrations
                </a>
                <Link href="#early-access">
                  <Button
                    size="sm"
                    className="relative group overflow-hidden rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--primary),0.5)]"
                  >
                    <span className="relative z-10 flex items-center gap-2 font-semibold">
                      Get Early Access
                      {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
                    </span>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
                  </Button>
                </Link>
                <ThemeToggle />
              </nav>

              <span className="md:hidden">
                <ThemeToggle />
              </span>

              {/* Mobile Menu Button (Hamburger) */}
              <button
                className="md:hidden p-2 mr-5 rounded-md z-50 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-colors duration-200 relative p-1.5 radius-20 rounded-md md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-sm border-b border-primary/20">
              <nav className="flex flex-col items-center">
                <a
                  href="/#solution"
                  onClick={closeMenu}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
                >
                  Solution
                </a>
                <a
                  href="/blogs"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
                >
                  Blogs / Articles
                </a>
                <a
                  href="/#demo"
                  onClick={closeMenu}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
                >
                  Demo
                </a>
                <a
                  href="/#integrations"
                  onClick={closeMenu}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
                >
                  Integrations
                </a>
                <a
                  href="/#early-access"
                  onClick={closeMenu}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
                >
                  Early Access
                </a>
                <div className="pt-4"></div>
              </nav>
            </div>
          )}
        </header>

        {/* --- Post Header --- */}
        <section className="pt-32 pb-12 px-4 bg-gradient-to-b from-primary/5 to-transparent border-b border-border/40">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link
                href="/blogs"
                className="hover:text-primary flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Blogs
              </Link>
              <ChevronRight className="w-4 h-4 opacity-50" />
              <span className="text-primary font-medium">{post.category}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-foreground">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-light">
              {post.subtitle}
            </p>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-foreground">{post.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {post.authorRole}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground border-t md:border-t-0 border-border/50 pt-4 md:pt-0">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" /> {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Content --- */}
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Share */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 flex flex-col gap-4">
                <button
                  onClick={() => handleShare("linkedin")}
                  className="p-3 rounded-full bg-card border border-border hover:border-[#0077B5] hover:text-[#0077B5] transition-all shadow-sm"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="p-3 rounded-full bg-card border border-border hover:border-black dark:hover:border-white hover:text-foreground transition-all shadow-sm"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all shadow-sm"
                >
                  <LinkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Text */}
            <div className="lg:col-span-8">
              <article className="prose prose-lg dark:prose-invert max-w-none">
                {post.content.map((block, index) => {
                  if (block.type === "h2")
                    return (
                      <h2
                        key={index}
                        id={block.id}
                        className="text-2xl md:text-3xl font-bold mt-12 mb-6 scroll-mt-24"
                      >
                        {block.text}
                      </h2>
                    );
                  if (block.type === "p")
                    return (
                      <p
                        key={index}
                        className="mb-6 text-lg leading-relaxed text-muted-foreground/90"
                      >
                        {block.text}
                      </p>
                    );
                  if (block.type === "quote")
                    return (
                      <blockquote
                        key={index}
                        className="border-l-4 border-accent pl-6 py-2 my-8 italic text-xl font-medium bg-accent/5 rounded-r-lg"
                      >
                        "{block.text}"
                      </blockquote>
                    );
                  if (block.type === "list")
                    return (
                      <ul key={index} className="space-y-4 my-8">
                        {block.items?.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <span className="text-lg text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    );
                  return null;
                })}
              </article>
            </div>

            {/* Sidebar TOC */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32 p-6 rounded-xl bg-card/50 border border-border/60">
                <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                  Table of Contents
                </h4>
                <nav className="flex flex-col space-y-3 text-sm">
                  {post.content
                    .filter((block) => block.type === "h2")
                    .map((block, idx) => (
                      <a
                        key={idx}
                        href={`#${block.id}`}
                        className="text-muted-foreground hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary pl-3 py-1"
                      >
                        {block.text}
                      </a>
                    ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
