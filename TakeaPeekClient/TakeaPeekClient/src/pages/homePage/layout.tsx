// // import type React from "react"
// //  import type { Metadata } from "next"
// //  import { Heebo } from "next/font/google"
// // import "./globals.css"
// // import { ThemeProvider } from "../../components/theme-provider"
// // //  import { ThemeProvider } from "@/components/theme-provider"

// // const heebo = Heebo({ subsets: ["hebrew"] })

// // export const metadata: Metadata = {
// //   title: "TakeAPeek - ארגון תמונות מתקדם לצלמים",
// //   description:
// //     "מהפכה בעולם הצילום - ארגון, ניהול ושיפור אוסף התמונות שלך עם כלים מבוססי בינה מלאכותית. העלאה, קטלוג ויצירת קולאז'ים מדהימים בקלות.",
// // }

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode
// // }>) {
// //   return (
// //     <html lang="he" dir="rtl" suppressHydrationWarning>
// //       <body className={heebo.className}>
// //         <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
// //           {children}
// //         </ThemeProvider>
// //       </body>
// //     </html>
// //   )
// // }

// import type React from "react"
// import "./globals.css"

// export const metadata = {
//   title: "TakeAPeek - ארגון תמונות מתקדם לצלמים",
//   description: "מהפכה בעולם הצילום - ארגון, ניהול ושיפור אוסף התמונות שלך עם כלים מבוססי בינה מלאכותית.",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="he" dir="rtl">
//       <body>{children}</body>
//     </html>
//   )
// }
