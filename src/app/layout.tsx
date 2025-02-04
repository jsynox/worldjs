import type { Metadata } from "next";
import { Itim, Roboto } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const itim = Itim({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GuessOrKnow - Test Your Geography Knowledge",
  description: "An exciting quiz game to test your knowledge of world geography",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${itim.className} ${roboto.className}`}>
        <div className="relative">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
