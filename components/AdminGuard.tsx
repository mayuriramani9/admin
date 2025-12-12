// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { Loader2 } from "lucide-react";

// export default function AdminGuard({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [authorized, setAuthorized] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();
//   useEffect(() => {
//     if (pathname === "/dashboard/login") {
//       setAuthorized(true);
//       return;
//     }

//     const isAdmin = localStorage.getItem("isAdmin");

//     if (!isAdmin) {
//       router.push("/dashboard/login");
//     } else {
//       setAuthorized(true);
//     }
//   }, [router, pathname]);

//   if (!authorized) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center bg-background">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Login page doesn't need guard UX
    if (pathname === "/dashboard/login") {
      setReady(true);
      return;
    }

    // If middleware lets us through, we’re authorized
    setReady(true);
  }, [pathname]);

  if (!ready) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
