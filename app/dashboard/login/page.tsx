"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Lock,
  KeyRound,
  Loader2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Call the API to verify password
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.replace("/dashboard");
        router.refresh();
      } else {
        setError("Access denied. Invalid credentials.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl opacity-50" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-3xl opacity-50" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="pt-8 pb-6 px-8 text-center space-y-4">
            <div className="mx-auto bg-gradient-to-br from-primary/20 to-accent/20 p-4 rounded-2xl w-fit shadow-inner ring-1 ring-white/10 relative group">
              <Lock className="w-8 h-8 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Welcome Back
              </h1>
              <p className="text-sm text-muted-foreground/60">
                Enter your secure key to access the dashboard
              </p>
              {/* <p className="text-xs text-muted-foreground/60">
                Enter your secure key to access the dashboard
              </p> */}
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    disabled={isLoading}
                    className="pl-10 h-11 bg-background/50 border-border/60 focus:bg-background transition-all"
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 p-2 rounded-md animate-in fade-in slide-in-from-top-1">
                    <ShieldCheck className="w-3 h-3" />
                    {error}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className={cn(
                  "w-full h-11 shadow-lg transition-all",
                  "bg-gradient-to-r from-primary to-accent hover:opacity-90"
                )}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Unlock Dashboard
                    <ChevronRight className="w-4 h-4 ml-2 opacity-70" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
