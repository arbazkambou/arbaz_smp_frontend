import { AuthProvider } from "@/providers/AuthProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./globals.css";
import FilterProvider from "@/providers/FilterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  // const user = await fetchUser();
  // console.log(user);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" reverseOrder={false} />
        <AuthProvider token={token}>
          <QueryProvider>
            <FilterProvider>{children}</FilterProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
