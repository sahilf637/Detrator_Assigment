import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-mono p-5 bg-gradient-to-r from-cyan-500 to-blue-500">
        <header>
          <Link className="flex" href="/">
            <Image src="/comment.png" width={50} height={50} />
            <p className="text-lg text-grey-200 p-4 font-bold">Comentify</p>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
