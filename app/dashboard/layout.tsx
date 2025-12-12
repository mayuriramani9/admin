// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// export default async function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
// const token = (await cookies()).get("admin_session")?.value;
// if (!token) redirect("/login");
//   return <>{children}</>;
// }

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("admin_session")?.value;
  if (!token) redirect("/login");

  return <>{children}</>;
}
