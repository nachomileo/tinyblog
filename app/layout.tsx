import type { Metadata } from "next"
import { Gilda_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const gildaDisplay = Gilda_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gilda",
})

export const metadata: Metadata = {
  title: "Blog",
  description: "A minimalistic markdown blog",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${gildaDisplay.className} ${gildaDisplay.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
