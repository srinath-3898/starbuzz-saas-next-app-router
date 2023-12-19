import { Inter } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "@/components/ReduxWrapper/ReduxWrapper";
import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Starbuzz.ai",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ReduxWrapper>{children}</ReduxWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}