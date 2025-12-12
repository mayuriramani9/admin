// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Search,
//   Menu,
//   X,
//   Calendar,
//   Clock,
//   User,
//   ArrowRight,
//   ChevronRight,
//   ShieldAlert,
//   Terminal,
//   Cpu,
//   Lock,
//   FileText,
//   Activity,
//   Globe,
// } from "lucide-react";
// import { useState } from "react";
// import { ThemeToggle } from "@/components/theme-toggle";
// import Image from "next/image";
// import Link from "next/link";
// import LogoWhite from "../../public/logo-light.png";
// import LogoBlack from "../../public/logo-dark.png";
// import { BlogPost } from "@/lib/blog-utils";

// const ICON_MAP: Record<string, any> = {
//   Cpu: Cpu,
//   ShieldAlert: ShieldAlert,
//   Terminal: Terminal,
//   Lock: Lock,
//   Activity: Activity,
//   Globe: Globe,
//   FileText: FileText,
// };

// export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   const closeMenu = () => setIsMenuOpen(false);

//   const uniqueCategories = [
//     "All",
//     ...Array.from(new Set(posts.map((p) => p.category))),
//   ];

//   // Filter logic
//   const filteredPosts = posts.filter((post) => {
//     const matchesCategory =
//       activeCategory === "All" || post.category === activeCategory;

//     const title = post.title || "";
//     const excerpt = post.excerpt || "";
//     const subtitle = post.subtitle || "";

//     const matchesSearch =
//       title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       subtitle.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const featuredPost = posts.find((post) => post.featured) || posts[0];
//   console.log("Featured Post:", featuredPost);

//   const renderIcon = (iconName: string | undefined, className: string) => {
//     const IconComponent = ICON_MAP[iconName || "FileText"] || FileText;
//     return <IconComponent className={className} />;
//   };

//   return (
//     <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
//       {/* Header */}
//       <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-primary/20 z-50 h-20 dark:bg-gradient-to-r dark:from-background/80 dark:to-background/50">
//         <div className="container mx-auto h-full flex items-center justify-between">
//           {/* Logo on the left */}
//           <div>
//             <Link href="/" className="cursor-pointer">
//               <Image
//                 src={LogoWhite}
//                 alt="Logo"
//                 width={120}
//                 height={40}
//                 className="block dark:hidden h-36 w-auto max-w-[600px] object-contain"
//               />
//               <Image
//                 src={LogoBlack}
//                 alt="Logo"
//                 width={120}
//                 height={40}
//                 className="hidden dark:block h-36 w-auto max-w-[600px] object-contain"
//               />
//             </Link>
//           </div>

//           <div className="flex items-center gap-4">
//             <nav className="hidden md:flex items-center space-x-8">
//               <a
//                 href="/#solution"
//                 className="text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
//               >
//                 Solution
//               </a>
//               <a
//                 href="/blogs"
//                 className="text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
//               >
//                 Blogs / Articles
//               </a>
//               <a
//                 href="/#demo"
//                 className="text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
//               >
//                 Demo
//               </a>
//               <a
//                 href="/#integrations"
//                 className="text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
//               >
//                 Integrations
//               </a>
//               <Link href="/#early-access">
//                 <Button
//                   size="sm"
//                   className="relative group overflow-hidden rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--primary),0.5)]"
//                 >
//                   <span className="relative z-10 flex items-center gap-2 font-semibold">
//                     Get Early Access
//                     {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
//                   </span>

//                   {/* Shine Effect */}
//                   <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
//                 </Button>
//               </Link>
//               <ThemeToggle />
//             </nav>

//             <span className="md:hidden">
//               <ThemeToggle />
//             </span>

//             {/* Mobile Menu Button (Hamburger) */}
//             <button
//               className="md:hidden p-2 mr-5 rounded-md z-50 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-colors duration-200 relative p-1.5 radius-20 rounded-md md:hidden"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Panel */}
//         {isMenuOpen && (
//           <div className="md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-sm border-b border-primary/20">
//             <nav className="flex flex-col items-center">
//               <a
//                 href="/#solution"
//                 onClick={closeMenu}
//                 className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
//               >
//                 Solution
//               </a>
//               <a
//                 href="/blogs"
//                 className="text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
//               >
//                 Blogs / Articles
//               </a>
//               <a
//                 href="/#demo"
//                 onClick={closeMenu}
//                 className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
//               >
//                 Demo
//               </a>
//               <a
//                 href="/#integrations"
//                 onClick={closeMenu}
//                 className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
//               >
//                 Integrations
//               </a>
//               <a
//                 href="/#early-access"
//                 onClick={closeMenu}
//                 className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
//               >
//                 Early Access
//               </a>
//               <div className="pt-4"></div>
//             </nav>
//           </div>
//         )}
//       </header>

//       {/* --- Hero Section --- */}
//       <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/5 to-transparent">
//         <div className="container mx-auto max-w-6xl text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-3 pb-2 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
//             Threat Intelligence Insights
//           </h1>
//           <p className="text-lg md:text-xl text-muted-foreground/70 max-w-2xl mx-auto mb-8">
//             Expert analysis on the latest cyber threats, AI security trends, and
//             SOC automation strategies.
//           </p>

//           {/* Search Bar */}
//           <div className="max-w-md mx-auto relative mb-12">
//             <input
//               type="text"
//               placeholder="Search articles..."
//               className="w-full py-3 px-5 pr-12 rounded-full bg-card border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <Search className="absolute right-4 top-3.5 h-5 w-5 text-muted-foreground" />
//           </div>

//           {/* Category Filter */}
//           <div className="flex flex-wrap justify-center gap-3">
//             {uniqueCategories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                   activeCategory === cat
//                     ? "bg-primary text-white shadow-lg shadow-primary/25"
//                     : "bg-card border border-border hover:border-primary/50 text-muted-foreground"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- Main Content --- */}
//       <div className="container mx-auto max-w-6xl px-4 py-12">
//         {/* Featured Post */}
//         {activeCategory === "All" && !searchQuery && featuredPost && (
//           <div className="mb-16">
//             <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//               <span className="w-2 h-8 bg-primary rounded-full"></span>
//               Featured Insight
//             </h2>
//             <Link href={`/blogs/${featuredPost.id}`}>
//               <Card className="group overflow-hidden bg-card border-primary/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
//                 <div className="grid md:grid-cols-2 gap-0">
//                   <div className="h-64 md:h-auto bg-gradient-to-br from-primary/20 via-accent/10 to-background flex items-center justify-center relative overflow-hidden">
//                     <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/40 to-transparent"></div>
//                     {renderIcon(
//                       featuredPost.iconName,
//                       "h-32 w-32 text-primary/80 relative z-10 group-hover:scale-110 transition-transform duration-500"
//                     )}
//                   </div>
//                   <CardContent className="p-8 md:p-12 flex flex-col justify-center">
//                     <div className="flex items-center gap-3 mb-4 text-xs font-semibold uppercase tracking-wider">
//                       <span className="bg-primary/20 text-primary px-3 py-1 rounded-full">
//                         {featuredPost.category}
//                       </span>
//                       <span className="text-muted-foreground flex items-center gap-1">
//                         <Clock className="w-3 h-3" /> {featuredPost.readTime}
//                       </span>
//                     </div>
//                     <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
//                       {featuredPost.title}
//                     </h3>
//                     <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
//                       {featuredPost.subtitle}
//                     </p>
//                     <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
//                       {featuredPost.excerpt}
//                     </p>
//                     <div className="flex items-center justify-between mt-auto">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
//                           <User className="h-4 w-4 text-accent" />
//                         </div>
//                         {/* <span className="text-sm font-medium">
//                           {featuredPost.author}
//                         </span> */}
//                         <div>
//                           <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
//                             {featuredPost.author}
//                           </p>
//                           <p className="text-xs text-slate-500 dark:text-slate-400">
//                             {featuredPost.date}
//                           </p>
//                         </div>
//                       </div>
//                       <span className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
//                         Read Article <ArrowRight className="ml-2 h-4 w-4" />
//                       </span>
//                     </div>
//                   </CardContent>
//                 </div>
//               </Card>
//             </Link>
//           </div>
//         )}

//         {/* Posts Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredPosts
//             .filter(
//               (post) =>
//                 // Don't show the featured post in the grid if we are already showing the featured section above
//                 searchQuery ||
//                 activeCategory !== "All" ||
//                 post.id !== featuredPost?.id
//             )
//             .map((post) => (
//               <Link href={`/blogs/${post.id}`} key={post.id}>
//                 <Card className="h-full flex flex-col group bg-card border-border/50 hover:border-primary/40 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//                   <div className="h-48 bg-gradient-to-br from-card to-background border-b border-border/50 flex items-center justify-center relative overflow-hidden">
//                     <div className="absolute top-4 left-4 z-10">
//                       <span className="bg-background/80 backdrop-blur-md border border-border text-foreground px-3 py-1 rounded-full text-xs font-semibold">
//                         {post.category}
//                       </span>
//                     </div>
//                     {renderIcon(
//                       post.iconName,
//                       "h-16 w-16 text-muted-foreground/50 group-hover:text-primary transition-colors duration-300"
//                     )}
//                   </div>

//                   <CardContent className="p-6 flex-1 flex flex-col">
//                     <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
//                       <span className="flex items-center gap-1">
//                         <Calendar className="w-3 h-3" /> {post.date}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Clock className="w-3 h-3" /> {post.readTime}
//                       </span>
//                     </div>

//                     <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
//                       {post.title}
//                     </h3>

//                     <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-1">
//                       {post.excerpt}
//                     </p>

//                     <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
//                       <span className="text-xs font-medium text-muted-foreground">
//                         By {post.author}
//                       </span>
//                       <ChevronRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
//                     </div>
//                   </CardContent>
//                 </Card>
//               </Link>
//             ))}
//         </div>

//         {filteredPosts.length === 0 && (
//           <div className="text-center py-20">
//             <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//             <h3 className="text-xl font-semibold">No articles found</h3>
//             <p className="text-muted-foreground">
//               Try adjusting your search or category filter.
//             </p>
//           </div>
//         )}
//       </div>

//       <footer className="border-t border-border bg-card/50 py-12 px-4">
//         <div className="container mx-auto max-w-6xl">
//           <div className="grid md:grid-cols-3 gap-8 mb-8">
//             <div>
//               <div className="flex self-start -ml-6 -mb-8 md:mt-[-40px]">
//                 <Image
//                   src={LogoWhite}
//                   alt="Logo"
//                   width={200}
//                   height={146}
//                   objectFit="contain"
//                   className="block dark:hidden"
//                 />
//                 <Image
//                   src={LogoBlack}
//                   alt="Logo"
//                   width={200}
//                   height={146}
//                   objectFit="contain"
//                   className="hidden dark:block"
//                 />
//               </div>
//               <p className="text-muted-foreground text-sm mb-1">
//                 ThreatLens | AI-Powered Threat Intelligence Platform
//               </p>
//               <p className="text-muted-foreground mb-4 text-[13px] text-zinc-400 opacity-80 text-justify">
//                 ThreatLens is a next-generation, multi-agent cybersecurity
//                 platform that accelerates threat detection, investigation, and
//                 response through intelligent automation and real-time threat
//                 intelligence enrichment.
//               </p>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Contact</h3>
//               <div className="space-y-2">
//                 <a
//                   href="mailto:contact@thethreatlens.com"
//                   className="block text-muted-foreground hover:text-primary transition-colors text-zinc-400 "
//                 >
//                   contact@thethreatlens.com
//                 </a>
//               </div>
//               <h3 className="font-semibold my-4">Follow Us</h3>
//               <div className="flex space-x-2 mt-2">
//                 <a
//                   href="https://www.linkedin.com/company/threatlens-global/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="LinkedIn"
//                   className="group p-2.5 bg-card border border-border/50 rounded-lg transition-all duration-300 hover:bg-[#0077B5]/10 hover:border-[#0077B5]/30"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 512 512"
//                     className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-[#0077B5]"
//                     fill="currentColor"
//                   >
//                     <g>
//                       <rect
//                         x="36.623"
//                         y="173.51"
//                         width="98.117"
//                         height="302.462"
//                         stroke="currentColor"
//                         strokeWidth="20"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeMiterlimit="10"
//                         fill="none"
//                       />
//                       <path
//                         d="M401.994,177.057c-1.043-0.326-2.029-0.684-3.123-0.992c-1.32-0.299-2.635-0.552-3.979-0.765
//           c-5.207-1.048-10.918-1.789-17.605-1.789c-57.199,0-93.486,41.715-105.434,57.824V173.51h-98.117v302.462h98.115V310.994
//           c0,0,74.145-103.554,105.436-27.5v192.478h98.09V271.864C475.377,226.163,444.141,188.082,401.994,177.057z"
//                         stroke="currentColor"
//                         strokeWidth="20"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeMiterlimit="10"
//                         fill="none"
//                       />
//                       <path
//                         d="M84.615,132.266c26.499,0,47.988-21.54,47.988-48.12c0-26.573-21.489-48.117-47.988-48.117
//           c-26.503,0-47.992,21.544-47.992,48.117C36.623,110.725,58.112,132.266,84.615,132.266z"
//                         stroke="currentColor"
//                         strokeWidth="20"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeMiterlimit="10"
//                         fill="none"
//                       />
//                     </g>
//                   </svg>
//                 </a>
//                 <a
//                   href="https://x.com/Thethreatlens"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Twitter/X"
//                   className="group p-2.5 bg-card border border-border/50 rounded-lg transition-all duration-300 hover:bg-black/10 hover:border-black/30"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 50 50"
//                     className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-black"
//                     fill="currentColor"
//                   >
//                     <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
//                   </svg>
//                 </a>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-4">Legal</h3>
//               <div className="space-y-2">
//                 <Link
//                   href="/PrivacyPolicy"
//                   className="block text-muted-foreground hover:text-primary transition-colors text-zinc-400 "
//                 >
//                   Privacy Policy
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-border pt-8 text-center">
//             <p className="text-muted-foreground">
//               © 2025 THREATLENS CYBERSECURITY SOLUTIONS, INC. All rights
//               reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Menu,
  X,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  Terminal,
  Cpu,
  Lock,
  FileText,
  Activity,
  Globe,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import LogoWhite from "../../public/logo-light.png";
import LogoBlack from "../../public/logo-dark.png";
import { BlogPost } from "@/lib/blog-utils";

const ICON_MAP: Record<string, any> = {
  Cpu: Cpu,
  ShieldAlert: ShieldAlert,
  Terminal: Terminal,
  Lock: Lock,
  Activity: Activity,
  Globe: Globe,
  FileText: FileText,
};

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const closeMenu = () => setIsMenuOpen(false);

  const uniqueCategories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
    ],
    [posts]
  );

  // Filter logic
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;

      const title = post.title || "";
      const excerpt = post.excerpt || "";
      const subtitle = post.subtitle || "";

      const matchesSearch =
        !q ||
        title.toLowerCase().includes(q) ||
        excerpt.toLowerCase().includes(q) ||
        subtitle.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return posts.find((post) => post.featured) || posts[0];
  }, [posts]);

  const renderIcon = (iconName: string | undefined, className: string) => {
    const IconComponent = ICON_MAP[iconName || "FileText"] || FileText;
    return <IconComponent className={className} />;
  };

  return (
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
                priority
              />
              <Image
                src={LogoBlack}
                alt="Logo"
                width={120}
                height={40}
                className="hidden dark:block h-36 w-auto max-w-[600px] object-contain"
                priority
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
              <Link href="/#early-access">
                <Button
                  size="sm"
                  className="relative group overflow-hidden rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--primary),0.5)]"
                >
                  <span className="relative z-10 flex items-center gap-2 font-semibold">
                    Get Early Access
                  </span>
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
              className="md:hidden p-2 mr-5 rounded-md z-50 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-colors duration-200 relative p-1.5 radius-20 rounded-md"
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
            <nav className="flex flex-col items-center gap-3 py-4">
              <a
                href="/#solution"
                onClick={closeMenu}
                className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
              >
                Solution
              </a>
              <a
                href="/blogs"
                onClick={closeMenu}
                className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium dark:text-white dark:hover:text-gray-200 dark:font-semibold"
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
            </nav>
          </div>
        )}
      </header>

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-3 pb-2 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Threat Intelligence Insights
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground/70 max-w-2xl mx-auto mb-8">
            Expert analysis on the latest cyber threats, AI security trends, and
            SOC automation strategies.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-12">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full py-3 px-5 pr-12 rounded-full bg-card border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-4 top-3.5 h-5 w-5 text-muted-foreground" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-card border border-border hover:border-primary/50 text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- Main Content --- */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Featured Post */}
        {activeCategory === "All" && !searchQuery && featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Featured Insight
            </h2>

            <Link href={`/blogs/${featuredPost.id}`}>
              <Card className="group overflow-hidden bg-card border-primary/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-64 md:h-auto bg-gradient-to-br from-primary/20 via-accent/10 to-background flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/40 to-transparent"></div>
                    {renderIcon(
                      featuredPost.iconName,
                      "h-32 w-32 text-primary/80 relative z-10 group-hover:scale-110 transition-transform duration-500"
                    )}
                  </div>

                  <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4 text-xs font-semibold uppercase tracking-wider">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full">
                        {featuredPost.category}
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {featuredPost.readTime}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h3>

                    {featuredPost.subtitle && (
                      <p className="text-muted-foreground/90 text-lg mb-1 line-clamp-2">
                        {featuredPost.subtitle}
                      </p>
                    )}

                    {/* <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p> */}

                    <p className="text-sm text-muted-foreground/70 mb-4 line-clamp-2">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                          <User className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {featuredPost.author}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {featuredPost.date}
                          </p>
                        </div>
                      </div>

                      <span className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                        Read Article <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts
            .filter(
              (post) =>
                searchQuery ||
                activeCategory !== "All" ||
                post.id !== featuredPost?.id
            )
            .map((post) => (
              <Link href={`/blogs/${post.id}`} key={post.id}>
                <Card className="h-full flex flex-col group bg-card border-border/50 hover:border-primary/40 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-br from-card to-background border-b border-border/50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-background/80 backdrop-blur-md border border-border text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                    {renderIcon(
                      post.iconName,
                      "h-16 w-16 text-muted-foreground/50 group-hover:text-primary transition-colors duration-300"
                    )}
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.subtitle && (
                      <p className="text-md text-muted-foreground/90 mb-1 line-clamp-2">
                        {post.subtitle}
                      </p>
                    )}

                    <p className="text-sm text-muted-foreground/60 mb-6 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                      <span className="text-xs font-medium text-muted-foreground">
                        By {post.author}
                      </span>
                      <ChevronRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </div>

      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex self-start -ml-6 -mb-8 md:mt-[-40px]">
                <Image
                  src={LogoWhite}
                  alt="Logo"
                  width={200}
                  height={146}
                  className="block dark:hidden object-contain"
                />
                <Image
                  src={LogoBlack}
                  alt="Logo"
                  width={200}
                  height={146}
                  className="hidden dark:block object-contain"
                />
              </div>

              <p className="text-muted-foreground text-sm mb-1">
                ThreatLens | AI-Powered Threat Intelligence Platform
              </p>
              <p className="text-muted-foreground mb-4 text-[13px] text-zinc-400 opacity-80 text-justify">
                ThreatLens is a next-generation, multi-agent cybersecurity
                platform that accelerates threat detection, investigation, and
                response through intelligent automation and real-time threat
                intelligence enrichment.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <a
                  href="mailto:contact@thethreatlens.com"
                  className="block text-muted-foreground hover:text-primary transition-colors text-zinc-400 "
                >
                  contact@thethreatlens.com
                </a>
              </div>

              <h3 className="font-semibold my-4">Follow Us</h3>
              <div className="flex space-x-2 mt-2">
                <a
                  href="https://www.linkedin.com/company/threatlens-global/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="group p-2.5 bg-card border border-border/50 rounded-lg transition-all duration-300 hover:bg-[#0077B5]/10 hover:border-[#0077B5]/30"
                >
                  {/* ... your SVG unchanged ... */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-[#0077B5]"
                    fill="currentColor"
                  >
                    <g>
                      <rect
                        x="36.623"
                        y="173.51"
                        width="98.117"
                        height="302.462"
                        stroke="currentColor"
                        strokeWidth="20"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        fill="none"
                      />
                      <path
                        d="M401.994,177.057c-1.043-0.326-2.029-0.684-3.123-0.992c-1.32-0.299-2.635-0.552-3.979-0.765
          c-5.207-1.048-10.918-1.789-17.605-1.789c-57.199,0-93.486,41.715-105.434,57.824V173.51h-98.117v302.462h98.115V310.994
          c0,0,74.145-103.554,105.436-27.5v192.478h98.09V271.864C475.377,226.163,444.141,188.082,401.994,177.057z"
                        stroke="currentColor"
                        strokeWidth="20"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        fill="none"
                      />
                      <path
                        d="M84.615,132.266c26.499,0,47.988-21.54,47.988-48.12c0-26.573-21.489-48.117-47.988-48.117
          c-26.503,0-47.992,21.544-47.992,48.117C36.623,110.725,58.112,132.266,84.615,132.266z"
                        stroke="currentColor"
                        strokeWidth="20"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        fill="none"
                      />
                    </g>
                  </svg>
                </a>

                <a
                  href="https://x.com/Thethreatlens"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter/X"
                  className="group p-2.5 bg-card border border-border/50 rounded-lg transition-all duration-300 hover:bg-black/10 hover:border-black/30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-black"
                    fill="currentColor"
                  >
                    <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <Link
                  href="/PrivacyPolicy"
                  className="block text-muted-foreground hover:text-primary transition-colors text-zinc-400 "
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground">
              © 2025 THREATLENS CYBERSECURITY SOLUTIONS, INC. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
