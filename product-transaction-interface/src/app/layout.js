import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import AuthContext from "@/provider/AuthContext";

const inter = Roboto_Mono({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Ecomerce",
  description: "Product transaction services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
