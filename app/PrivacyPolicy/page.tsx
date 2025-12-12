"use client";

import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "getterms-embed-js";
    script.src = "https://gettermscdn.com/dist/js/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.getElementById("getterms-embed-js")) {
        document.getElementById("getterms-embed-js")?.remove();
      }
    };
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div
        className="getterms-document-embed"
        data-getterms="GjLBV"
        data-getterms-document="app-privacy"
        data-getterms-lang="en-us"
        data-getterms-mode="direct"
        data-getterms-env="https://gettermscdn.com"
      />
    </div>
  );
}
