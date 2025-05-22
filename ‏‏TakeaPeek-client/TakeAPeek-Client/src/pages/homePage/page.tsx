// // "use client"

// // import { useEffect, useRef, useState } from "react"
// // import Image from "next/image"
// // // import Link from "next/link"
// // import { motion, useScroll, useTransform } from "framer-motion"
// // import { Camera, ChevronDown, FolderOpen, ImageIcon, Layers, Link, Search, Upload, Users } from "lucide-react"
// // import { useMobile } from "../../hooks/use-mobile"
// // import { Button } from "../../components/ui/button"

// // // import { Button } from "@/components/ui/button"

// // export default function HomePage() {
// //   const isMobile = useMobile()
// //   const targetRef = useRef<HTMLDivElement>(null)
// //   const { scrollYProgress } = useScroll({
// //     target: targetRef,
// //     offset: ["start start", "end start"],
// //   })

// //   const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
// //   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

// //   const [mounted, setMounted] = useState(false)
// //   useEffect(() => {
// //     setMounted(true)
// //   }, [])

// //   return (
// //     <div className="min-h-screen bg-white overflow-hidden">
// //       {/* Navigation */}
// //       <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-100">
// //         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
// //           <div className="flex items-center gap-2">
// //             <Image src="/images/logo.png" alt="TakeAPeek Logo" width={40} height={40} className="w-auto h-10" />
// //             <span className="text-2xl font-bold">
// //               Take<span className="text-teal-500">A</span>Peek
// //             </span>
// //           </div>
// //           <nav className="hidden md:flex items-center gap-6">
// //             <Link href="#features" className="text-gray-600 hover:text-teal-500 transition">
// //               תכונות
// //             </Link>
// //             <Link href="#ai" className="text-gray-600 hover:text-teal-500 transition">
// //               בינה מלאכותית
// //             </Link>
// //             <Link href="#organize" className="text-gray-600 hover:text-teal-500 transition">
// //               ארגון
// //             </Link>
// //             <Link href="#collage" className="text-gray-600 hover:text-teal-500 transition">
// //               קולאז'ים
// //             </Link>
// //           </nav>
// //           <div className="flex items-center gap-3">
// //             <Button variant="outline" className="hidden sm:flex">
// //               התחברות
// //             </Button>
// //             <Button className="bg-teal-500 hover:bg-teal-600">התחל עכשיו</Button>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Hero Section */}
// //       <section ref={targetRef} className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
// //         {mounted && (
// //           <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10 bg-gradient-to-b from-teal-50 to-white">
// //             <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,178,172,0.15),transparent_50%)]"></div>
// //             <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(56,178,172,0.1),transparent_50%)]"></div>
// //           </motion.div>
// //         )}

// //         <div className="container mx-auto px-4 relative z-10">
// //           <div className="text-center max-w-4xl mx-auto mb-16">
// //             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
// //               <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
// //                 <span className="text-teal-500">מהפכה</span> בעולם <span className="text-teal-600">הצילום</span>
// //               </h1>
// //             </motion.div>
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, delay: 0.2 }}
// //             >
// //               <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
// //                 שחרר את הפוטנציאל האמיתי של התמונות שלך עם טכנולוגיית AI מתקדמת. גלה, ארגן וצור בדרך חדשה לגמרי.
// //               </p>
// //             </motion.div>
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, delay: 0.4 }}
// //               className="flex flex-col sm:flex-row gap-4 justify-center"
// //             >
// //               <Button className="bg-teal-500 hover:bg-teal-600 h-12 px-8 text-lg">נסה בחינם</Button>
// //               <Button variant="outline" className="h-12 px-8 text-lg">
// //                 צפה בהדגמה
// //               </Button>
// //             </motion.div>
// //           </div>

// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.7, delay: 0.6 }}
// //             className="relative max-w-5xl mx-auto"
// //           >
// //             {/* Main Dashboard Preview */}
// //             <div className="relative rounded-xl overflow-hidden shadow-2xl border border-teal-100">
// //               <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent z-10"></div>
// //               <Image
// //                 src="/placeholder.svg?height=600&width=1200"
// //                 alt="TakeAPeek Dashboard"
// //                 width={1200}
// //                 height={600}
// //                 className="w-full h-auto"
// //               />

// //               {/* Floating UI Elements */}
// //               <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-teal-100 max-w-xs">
// //                 <div className="flex items-center gap-3 mb-3">
// //                   <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
// //                   <span className="text-sm font-medium text-gray-700">ניתוח AI הושלם</span>
// //                 </div>
// //                 <p className="text-sm text-gray-600 mb-2">נמצאו 24 תמונות עם תוכן דומה</p>
// //                 <div className="flex gap-2">
// //                   <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-xs">
// //                     צפה בקבוצה
// //                   </Button>
// //                   <Button size="sm" variant="outline" className="text-xs">
// //                     סגור
// //                   </Button>
// //                 </div>
// //               </div>

// //               <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-teal-100">
// //                 <div className="flex gap-2">
// //                   <Button size="icon" variant="ghost" className="h-8 w-8">
// //                     <Upload className="h-4 w-4" />
// //                   </Button>
// //                   <Button size="icon" variant="ghost" className="h-8 w-8">
// //                     <FolderOpen className="h-4 w-4" />
// //                   </Button>
// //                   <Button size="icon" variant="ghost" className="h-8 w-8">
// //                     <Layers className="h-4 w-4" />
// //                   </Button>
// //                   <Button size="icon" className="h-8 w-8 bg-teal-500 hover:bg-teal-600">
// //                     <ImageIcon className="h-4 w-4" />
// //                   </Button>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Decorative Elements */}
// //             <div className="absolute -top-6 -right-6 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
// //             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
// //           </motion.div>

// //           <div className="flex justify-center mt-12">
// //             <motion.div
// //               initial={{ opacity: 0, y: 10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, delay: 1 }}
// //               className="animate-bounce"
// //             >
// //               <Link href="#features">
// //                 <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 border border-teal-100">
// //                   <ChevronDown className="h-6 w-6 text-teal-500" />
// //                 </Button>
// //               </Link>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section id="features" className="py-20 bg-white">
// //         <div className="container mx-auto px-4">
// //           <div className="text-center max-w-3xl mx-auto mb-16">
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5 }}
// //               viewport={{ once: true, margin: "-100px" }}
// //             >
// //               <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">תכונות חזקות לצלמים</h2>
// //               <p className="text-xl text-gray-600">כל מה שאתה צריך כדי לנהל את אוסף התמונות שלך ביעילות</p>
// //             </motion.div>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-8">
// //             {[
// //               {
// //                 icon: <Upload className="h-8 w-8 text-teal-500" />,
// //                 title: "העלאה קלה",
// //                 description: "גרור ושחרר מספר תמונות בבת אחת. תמיכה בכל הפורמטים העיקריים.",
// //               },
// //               {
// //                 icon: <FolderOpen className="h-8 w-8 text-teal-500" />,
// //                 title: "ארגון חכם",
// //                 description: "צור תיקיות, תגיות וקטגוריות מותאמות אישית כדי לשמור על הכל מסודר.",
// //               },
// //               {
// //                 icon: <Search className="h-8 w-8 text-teal-500" />,
// //                 title: "חיפוש עוצמתי",
// //                 description: "מצא כל תמונה באופן מיידי עם יכולות החיפוש המתקדמות שלנו.",
// //               },
// //               {
// //                 icon: <Users className="h-8 w-8 text-teal-500" />,
// //                 title: "זיהוי פנים",
// //                 description: "זהה וקבץ תמונות באופן אוטומטי לפי האנשים המופיעים בהן.",
// //               },
// //               {
// //                 icon: <Layers className="h-8 w-8 text-teal-500" />,
// //                 title: "קולאז'ים יצירתיים",
// //                 description: "עצב קולאז'ים מדהימים עם עורך גרור ושחרר אינטואיטיבי.",
// //               },
// //               {
// //                 icon: <Camera className="h-8 w-8 text-teal-500" />,
// //                 title: "עיבוד אצווה",
// //                 description: "החל עריכות, תגיות או קטגוריות על מספר תמונות בבת אחת.",
// //               },
// //             ].map((feature, index) => (
// //               <motion.div
// //                 key={index}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: index * 0.1 }}
// //                 viewport={{ once: true, margin: "-100px" }}
// //                 className="bg-white p-8 rounded-xl border border-teal-100 shadow-sm hover:shadow-md transition-all duration-300 group"
// //               >
// //                 <div className="bg-teal-50 p-3 rounded-lg w-fit mb-5 group-hover:bg-teal-100 transition-colors">
// //                   {feature.icon}
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
// //                 <p className="text-gray-600">{feature.description}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* AI Section */}
// //       <section id="ai" className="py-20 bg-gradient-to-b from-white to-teal-50">
// //         <div className="container mx-auto px-4">
// //           <div className="grid md:grid-cols-2 gap-12 items-center">
// //             <motion.div
// //               initial={{ opacity: 0, x: -20 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.5 }}
// //               viewport={{ once: true, margin: "-100px" }}
// //               className="order-2 md:order-1"
// //             >
// //               <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl border border-teal-100">
// //                 <Image
// //                   src="/placeholder.svg?height=500&width=600"
// //                   alt="AI Photo Analysis"
// //                   fill
// //                   className="object-cover"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/30 to-transparent"></div>

// //                 {/* AI Analysis Overlay */}
// //                 <div className="absolute top-4 right-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-teal-100">
// //                   <div className="flex items-center gap-3 mb-3">
// //                     <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
// //                     <span className="text-sm font-medium text-gray-700">ניתוח AI בתהליך</span>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <div className="h-2 bg-teal-200 rounded-full w-3/4 animate-pulse"></div>
// //                     <div className="h-2 bg-teal-200 rounded-full w-1/2 animate-pulse delay-100"></div>
// //                     <div className="h-2 bg-teal-200 rounded-full w-5/6 animate-pulse delay-200"></div>
// //                   </div>
// //                 </div>

// //                 {/* Face Recognition Boxes */}
// //                 <div className="absolute top-1/3 left-1/4 w-16 h-16 border-2 border-teal-400 rounded-md animate-pulse"></div>
// //                 <div className="absolute bottom-1/3 right-1/3 w-16 h-16 border-2 border-teal-400 rounded-md animate-pulse delay-300"></div>

// //                 {/* Tags */}
// //                 <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
// //                   <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-teal-700 border border-teal-100">
// //                     #נוף
// //                   </div>
// //                   <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-teal-700 border border-teal-100">
// //                     #טבע
// //                   </div>
// //                   <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-teal-700 border border-teal-100">
// //                     #קיץ
// //                   </div>
// //                   <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-teal-700 border border-teal-100">
// //                     #חופשה
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //             <motion.div
// //               initial={{ opacity: 0, x: 20 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.5 }}
// //               viewport={{ once: true, margin: "-100px" }}
// //               className="order-1 md:order-2 space-y-6"
// //             >
// //               <h2 className="text-3xl md:text-4xl font-bold text-gray-900">מופעל על ידי בינה מלאכותית מתקדמת</h2>
// //               <p className="text-xl text-gray-600">האלגוריתמים החכמים שלנו הופכים את ניהול התמונות לקל ופשוט.</p>

// //               <div className="space-y-6 mt-8">
// //                 {[
// //                   {
// //                     title: "זיהוי פנים",
// //                     description: "זיהוי אוטומטי של אנשים בתמונות שלך לקטלוג וחיפוש קלים.",
// //                   },
// //                   {
// //                     title: "ניתוח תוכן",
// //                     description: "AI מזהה נופים, אובייקטים וצבעים כדי להפוך את החיפוש לאינטואיטיבי ועוצמתי.",
// //                   },
// //                   {
// //                     title: "המלצות חכמות",
// //                     description: "קבל המלצות לארגון וקיבוץ תמונות דומות על בסיס התוכן שלהן.",
// //                   },
// //                   {
// //                     title: "תיוג אוטומטי",
// //                     description: "תן ל-AI ליצור תגיות רלוונטיות לתמונות שלך כדי לשפר את יכולת החיפוש.",
// //                   },
// //                 ].map((feature, index) => (
// //                   <motion.div
// //                     key={index}
// //                     initial={{ opacity: 0, y: 10 }}
// //                     whileInView={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.3, delay: index * 0.1 }}
// //                     viewport={{ once: true, margin: "-100px" }}
// //                     className="flex gap-4 p-4 rounded-lg hover:bg-teal-50 transition-colors"
// //                   >
// //                     <div className="mt-1 bg-teal-100 rounded-full p-1">
// //                       <div className="h-5 w-5 rounded-full bg-teal-500 flex items-center justify-center text-white">
// //                         {index + 1}
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <h3 className="font-semibold text-gray-900 text-lg">{feature.title}</h3>
// //                       <p className="text-gray-600">{feature.description}</p>
// //                     </div>
// //                   </motion.div>
// //                 ))}
// //               </div>

// //               <Button className="mt-6 bg-teal-500 hover:bg-teal-600">גלה את תכונות ה-AI</Button>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Interactive Demo Section */}
// //       <section id="organize" className="py-20 bg-white relative overflow-hidden">
// //         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,178,172,0.1),transparent_50%)]"></div>
// //         <div className="container mx-auto px-4 relative z-10">
// //           <div className="text-center max-w-3xl mx-auto mb-16">
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5 }}
// //               viewport={{ once: true, margin: "-100px" }}
// //             >
// //               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
// //                 ארגן את התמונות שלך כמו מעולם לא לפני
// //               </h2>
// //               <p className="text-xl text-gray-600">כלים אינטואיטיביים שהופכים את ניהול אלפי תמונות לפשוט ומהנה</p>
// //             </motion.div>
// //           </div>

// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.7 }}
// //             viewport={{ once: true, margin: "-100px" }}
// //             className="relative max-w-5xl mx-auto"
// //           >
// //             <div className="bg-white rounded-xl shadow-xl border border-teal-100 overflow-hidden">
// //               <div className="border-b border-teal-100 p-4 flex items-center justify-between bg-gradient-to-r from-teal-50 to-white">
// //                 <div className="w-24"></div>
// //                 <div className="bg-white rounded-full px-4 py-1 text-sm text-gray-500 border border-gray-200">
// //                   takeapeek.app/my-photos
// //                 </div>
// //                 <div className="flex items-center gap-3">
// //                   <div className="bg-red-500 h-3 w-3 rounded-full"></div>
// //                   <div className="bg-yellow-500 h-3 w-3 rounded-full"></div>
// //                   <div className="bg-teal-500 h-3 w-3 rounded-full"></div>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-12 h-[500px]">
// //                 {/* Sidebar */}
// //                 <div className="col-span-3 border-l border-teal-100 p-4 bg-gray-50">
// //                   <div className="space-y-2">
// //                     <div className="bg-teal-500 text-white rounded-lg p-2 flex items-center gap-2">
// //                       <FolderOpen className="h-4 w-4" />
// //                       <span className="text-sm font-medium">כל התמונות</span>
// //                     </div>
// //                     {["חופשה 2023", "משפחה", "עבודה", "טבע", "אירועים"].map((folder, i) => (
// //                       <div
// //                         key={i}
// //                         className="hover:bg-teal-50 rounded-lg p-2 flex items-center gap-2 cursor-pointer transition-colors"
// //                       >
// //                         <FolderOpen className="h-4 w-4 text-teal-500" />
// //                         <span className="text-sm font-medium text-gray-700">{folder}</span>
// //                       </div>
// //                     ))}
// //                   </div>

// //                   <div className="mt-6">
// //                     <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">אוספים חכמים</h3>
// //                     <div className="space-y-2">
// //                       {["פנים", "נופים", "מסמכים", "צילומי מסך", "מועדפים"].map((collection, i) => (
// //                         <div
// //                           key={i}
// //                           className="hover:bg-teal-50 rounded-lg p-2 flex items-center gap-2 cursor-pointer transition-colors"
// //                         >
// //                           <div className="h-2 w-2 rounded-full bg-teal-500"></div>
// //                           <span className="text-sm font-medium text-gray-700">{collection}</span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Main Content */}
// //                 <div className="col-span-9 p-4 overflow-y-auto">
// //                   <div className="flex justify-between items-center mb-4">
// //                     <div className="flex items-center gap-2">
// //                       <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
// //                         <Layers className="h-4 w-4 ml-1" />
// //                         צור קולאז'
// //                       </Button>
// //                       <Button variant="outline" size="sm">
// //                         <Upload className="h-4 w-4 ml-1" />
// //                         העלה
// //                       </Button>
// //                     </div>
// //                     <h3 className="font-semibold text-gray-900">תמונות אחרונות</h3>
// //                   </div>

// //                   <div className="grid grid-cols-4 gap-3">
// //                     {Array.from({ length: 12 }).map((_, i) => (
// //                       <div
// //                         key={i}
// //                         className="aspect-square rounded-lg overflow-hidden border border-teal-100 group relative"
// //                       >
// //                         <Image
// //                           src={`/placeholder.svg?height=150&width=150&text=Photo${i + 1}`}
// //                           alt={`Photo ${i + 1}`}
// //                           fill
// //                           className="object-cover group-hover:scale-105 transition-transform duration-300"
// //                         />
// //                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
// //                           <div className="p-2 w-full flex justify-between items-center">
// //                             <Button
// //                               size="icon"
// //                               variant="ghost"
// //                               className="h-6 w-6 bg-white/20 hover:bg-white/40 text-white"
// //                             >
// //                               <Search className="h-3 w-3" />
// //                             </Button>
// //                             <span className="text-white text-xs truncate">תמונה_{i + 1}.jpg</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Collage Creator Section */}
// //       <section id="collage" className="py-20 bg-gradient-to-b from-teal-50 to-white">
// //         <div className="container mx-auto px-4">
// //           <div className="text-center max-w-3xl mx-auto mb-16">
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5 }}
// //               viewport={{ once: true, margin: "-100px" }}
// //             >
// //               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">צור קולאז'ים מדהימים</h2>
// //               <p className="text-xl text-gray-600">בטא את היצירתיות שלך עם יוצר הקולאז'ים העוצמתי שלנו</p>
// //             </motion.div>
// //           </div>

// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.95 }}
// //             whileInView={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.7 }}
// //             viewport={{ once: true, margin: "-100px" }}
// //             className="relative max-w-4xl mx-auto"
// //           >
// //             {/* Collage Preview */}
// //             <div className="bg-white rounded-xl shadow-xl border border-teal-100 p-8">
// //               <div className="grid grid-cols-4 grid-rows-3 gap-3 h-[400px]">
// //                 <div className="col-span-2 row-span-3 rounded-lg overflow-hidden relative shadow-md">
// //                   <Image
// //                     src="/placeholder.svg?height=400&width=300"
// //                     alt="Main collage image"
// //                     fill
// //                     className="object-cover"
// //                   />
// //                 </div>
// //                 <div className="col-span-2 row-span-1 rounded-lg overflow-hidden relative shadow-md">
// //                   <Image
// //                     src="/placeholder.svg?height=150&width=300"
// //                     alt="Collage image 2"
// //                     fill
// //                     className="object-cover"
// //                   />
// //                 </div>
// //                 <div className="col-span-1 row-span-1 rounded-lg overflow-hidden relative shadow-md">
// //                   <Image
// //                     src="/placeholder.svg?height=150&width=150"
// //                     alt="Collage image 3"
// //                     fill
// //                     className="object-cover"
// //                   />
// //                 </div>
// //                 <div className="col-span-1 row-span-1 rounded-lg overflow-hidden relative shadow-md">
// //                   <Image
// //                     src="/placeholder.svg?height=150&width=150"
// //                     alt="Collage image 4"
// //                     fill
// //                     className="object-cover"
// //                   />
// //                 </div>
// //                 <div className="col-span-2 row-span-1 rounded-lg overflow-hidden relative shadow-md">
// //                   <Image
// //                     src="/placeholder.svg?height=150&width=300"
// //                     alt="Collage image 5"
// //                     fill
// //                     className="object-cover"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Floating Controls */}
// //               <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4 border border-teal-100">
// //                 <Button variant="outline" size="sm" className="rounded-full">
// //                   <Layers className="h-4 w-4 ml-2" />
// //                   תבניות
// //                 </Button>
// //                 <Button variant="outline" size="sm" className="rounded-full">
// //                   <Upload className="h-4 w-4 ml-2" />
// //                   הוסף תמונות
// //                 </Button>
// //                 <Button className="rounded-full bg-teal-500 hover:bg-teal-600">צור קולאז'</Button>
// //               </div>
// //             </div>

// //             {/* Decorative Elements */}
// //             <div className="absolute -top-6 -right-6 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
// //             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Testimonials */}
// //       <section className="py-20 bg-white">
// //         <div className="container mx-auto px-4">
// //           <div className="text-center max-w-3xl mx-auto mb-16">
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5 }}
// //               viewport={{ once: true, margin: "-100px" }}
// //             >
// //               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">מה המשתמשים שלנו אומרים</h2>
// //               <p className="text-xl text-gray-600">צלמים מכל העולם אוהבים את TakeAPeek</p>
// //             </motion.div>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-8">
// //             {[
// //               {
// //                 quote: "TakeAPeek שינה לחלוטין את האופן שבו אני מארגנת את תיק העבודות שלי. תכונות ה-AI מדהימות!",
// //                 name: "שרה כהן",
// //                 title: "צלמת מקצועית",
// //               },
// //               {
// //                 quote:
// //                   "בעבר הייתי מבזבז שעות על ארגון תמונות אחרי כל צילום. עכשיו TakeAPeek עושה זאת אוטומטית עם תוצאות טובות יותר.",
// //                 name: "מיכאל לוי",
// //                 title: "צלם חתונות",
// //               },
// //               {
// //                 quote: "יוצר הקולאז'ים אינטואיטיבי ועוצמתי. אני יוצרת מצגות מדהימות ללקוחות שלי תוך דקות.",
// //                 name: "אמה רודריגז",
// //                 title: "צלמת פורטרטים",
// //               },
// //             ].map((testimonial, index) => (
// //               <motion.div
// //                 key={index}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: index * 0.1 }}
// //                 viewport={{ once: true, margin: "-100px" }}
// //                 className="bg-white p-8 rounded-xl border border-teal-100 shadow-sm hover:shadow-md transition-all duration-300"
// //               >
// //                 <div className="mb-4 text-teal-500">
// //                   {Array.from({ length: 5 }).map((_, i) => (
// //                     <span key={i} className="text-xl">
// //                       ★
// //                     </span>
// //                   ))}
// //                 </div>
// //                 <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
// //                 <div>
// //                   <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
// //                   <p className="text-gray-500 text-sm">{testimonial.title}</p>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-500 relative overflow-hidden">
// //         <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10 bg-cover bg-center"></div>
// //         <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-teal-500/90"></div>
// //         <div className="container mx-auto px-4 text-center relative z-10">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             viewport={{ once: true, margin: "-100px" }}
// //           >
// //             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">מהפכה בעולם הצילום - התחל לארגן היום</h2>
// //             <p className="text-xl text-teal-50 max-w-2xl mx-auto mb-8">
// //               הצטרף לאלפי צלמים ששינו את שיטת העבודה שלהם עם TakeAPeek.
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //               <Button className="bg-white text-teal-600 hover:bg-teal-50 h-12 px-8 text-lg">התחל ניסיון בחינם</Button>
// //               <Button variant="outline" className="border-white text-white hover:bg-teal-600/50 h-12 px-8 text-lg">
// //                 תאם הדגמה
// //               </Button>
// //             </div>
// //           </motion.div>

// //           {/* Floating Camera Icon */}
// //           <div className="absolute -bottom-16 -right-16 w-32 h-32 opacity-10">
// //             <Camera className="w-full h-full text-white" />
// //           </div>
// //           <div className="absolute -top-16 -left-16 w-32 h-32 opacity-10">
// //             <Camera className="w-full h-full text-white" />
// //           </div>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="bg-gray-900 text-gray-300 py-12">
// //         <div className="container mx-auto px-4">
// //           <div className="grid md:grid-cols-4 gap-8">
// //             <div>
// //               <div className="flex items-center gap-2 mb-4">
// //                 <Image src="/images/logo.png" alt="TakeAPeek Logo" width={30} height={30} className="w-auto h-8" />
// //                 <span className="text-2xl font-bold text-white">
// //                   Take<span className="text-teal-400">A</span>Peek
// //                 </span>
// //               </div>
// //               <p className="text-gray-400">מהפכה בעולם הצילום - הפתרון האולטימטיבי לארגון תמונות.</p>
// //             </div>

// //             <div>
// //               <h3 className="text-white font-semibold mb-4">מוצר</h3>
// //               <ul className="space-y-2">
// //                 <li>
// //                   <Link href="#" className="hover:text-teal-400 transition">
// //                     תכונות
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="hover:text-teal-400 transition">
// //                     מחירים
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="hover:text-teal-400 transition">
// //                     הדרכות
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="hover:text-teal-400 transition">
// //                     עדכונים
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>

// //             <div>
// //               <h3 className="text-white font-semibold mb-4">חברה</h3>
// //               <ul className="space-y-2">
// //                 <li>
// //                   <Link href="#" className="hover:text-teal-400 transition">
// //                     אודות
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="hover:text-teal-400 transition">
// //                     בלוג
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="hover:text-teal-400 transition">
// //                     קריירה
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="hover:text-teal-400 transition">
// //                     צור קשר
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>

// //             <div>
// //               <h3 className="text-white font-semibold mb-4">משפטי</h3>
// //               <ul className="space-y-2">
// //                 <li>
// //                   <Link href="#" className="hover:text-teal-400 transition">
// //                     פרטיות
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="hover:text-teal-400 transition">
// //                     תנאים
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="hover:text-teal-400 transition">
// //                     אבטחה
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>

// //           <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
// //             <p>© {new Date().getFullYear()} TakeAPeek. כל הזכויות שמורות.</p>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   )
// // }

// "use client"

// import { useEffect, useRef, useState } from "react"
// import Link from "next/link"

// export default function HomePage() {
//   const targetRef = useRef<HTMLDivElement>(null)
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   return (
//     <div className="min-h-screen bg-white overflow-hidden">
//       {/* Navigation */}
//       <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-100">
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 bg-teal-500 rounded-full"></div>
//             <span className="text-2xl font-bold">
//               Take<span className="text-teal-500">A</span>Peek
//             </span>
//           </div>
//           <nav className="hidden md:flex items-center gap-6">
//             <Link href="#features" className="text-gray-600 hover:text-teal-500 transition">
//               תכונות
//             </Link>
//             <Link href="#ai" className="text-gray-600 hover:text-teal-500 transition">
//               בינה מלאכותית
//             </Link>
//             <Link href="#organize" className="text-gray-600 hover:text-teal-500 transition">
//               ארגון
//             </Link>
//             <Link href="#collage" className="text-gray-600 hover:text-teal-500 transition">
//               קולאז'ים
//             </Link>
//           </nav>
//           <div className="flex items-center gap-3">
//             <button className="hidden sm:flex px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
//               התחברות
//             </button>
//             <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition">
//               התחל עכשיו
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section ref={targetRef} className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
//         <div className="absolute inset-0 -z-10 bg-gradient-to-b from-teal-50 to-white">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,178,172,0.15),transparent_50%)]"></div>
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(56,178,172,0.1),transparent_50%)]"></div>
//         </div>

//         <div className="container mx-auto px-4 relative z-10">
//           <div className="text-center max-w-4xl mx-auto mb-16">
//             <div>
//               <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
//                 <span className="text-teal-500">מהפכה</span> בעולם <span className="text-teal-600">הצילום</span>
//               </h1>
//             </div>
//             <div>
//               <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
//                 שחרר את הפוטנציאל האמיתי של התמונות שלך עם טכנולוגיית AI מתקדמת. גלה, ארגן וצור בדרך חדשה לגמרי.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="bg-teal-500 hover:bg-teal-600 h-12 px-8 text-lg text-white rounded-md transition">
//                 נסה בחינם
//               </button>
//               <button className="border border-gray-300 h-12 px-8 text-lg rounded-md hover:bg-gray-100 transition">
//                 צפה בהדגמה
//               </button>
//             </div>
//           </div>

//           <div className="relative max-w-5xl mx-auto">
//             {/* Main Dashboard Preview */}
//             <div className="relative rounded-xl overflow-hidden shadow-2xl border border-teal-100">
//               <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent z-10"></div>
//               <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center text-gray-500">
//                 תצוגת דשבורד
//               </div>

//               {/* Floating UI Elements */}
//               <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-teal-100 max-w-xs">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
//                   <span className="text-sm font-medium text-gray-700">ניתוח AI הושלם</span>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-2">נמצאו 24 תמונות עם תוכן דומה</p>
//                 <div className="flex gap-2">
//                   <button className="bg-teal-500 hover:bg-teal-600 text-white text-xs px-3 py-1 rounded-md transition">
//                     צפה בקבוצה
//                   </button>
//                   <button className="border border-gray-300 text-xs px-3 py-1 rounded-md hover:bg-gray-100 transition">
//                     סגור
//                   </button>
//                 </div>
//               </div>

//               <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-teal-100">
//                 <div className="flex gap-2">
//                   <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//                       <polyline points="17 8 12 3 7 8"></polyline>
//                       <line x1="12" y1="3" x2="12" y2="15"></line>
//                     </svg>
//                   </button>
//                   <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v1"></path>
//                       <path d="M15 13h5v5h-5z"></path>
//                       <path d="M18 16v-3"></path>
//                       <path d="M15 16h5"></path>
//                     </svg>
//                   </button>
//                   <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M16 16H8a2 2 0 0 1-2-2V8h8"></path>
//                       <path d="M16 8h2a2 2 0 0 1 2 2v6"></path>
//                       <path d="M22 12h-4"></path>
//                       <path d="M16 16v4"></path>
//                       <path d="M8 2h8"></path>
//                       <path d="M12 2v4"></path>
//                     </svg>
//                   </button>
//                   <button className="h-8 w-8 flex items-center justify-center rounded-md bg-teal-500 text-white">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//                       <circle cx="8.5" cy="8.5" r="1.5"></circle>
//                       <polyline points="21 15 16 10 5 21"></polyline>
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Decorative Elements */}
//             <div className="absolute -top-6 -right-6 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
//             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
//           </div>

//           <div className="flex justify-center mt-12">
//             <div className="animate-bounce">
//               <Link href="#features">
//                 <button className="rounded-full h-12 w-12 border border-teal-100 flex items-center justify-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-teal-500"
//                   >
//                     <polyline points="6 9 12 15 18 9"></polyline>
//                   </svg>
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">תכונות חזקות לצלמים</h2>
//             <p className="text-xl text-gray-600">כל מה שאתה צריך כדי לנהל את אוסף התמונות שלך ביעילות</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="32"
//                     height="32"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-teal-500"
//                   >
//                     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//                     <polyline points="17 8 12 3 7 8"></polyline>
//                     <line x1="12" y1="3" x2="12" y2="15"></line>
//                   </svg>
//                 ),
//                 title: "העלאה קלה",
//                 description: "גרור ושחרר מספר תמונות בבת אחת. תמיכה בכל הפורמטים העיקריים.",
//               },
//               {
//                 icon: (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="32"
//                     height="32"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-teal-500"
//                   >
//                     <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v1"></path>
//                     <path d="M15 13h5v5h-5z"></path>
//                     <path d="M18 16v-3"></path>
//                     <path d="M15 16h5"></path>
//                   </svg>
//                 ),
//                 title: "ארגון חכם",
//                 description: "צור תיקיות, תגיות וקטגוריות מותאמות אישית כדי לשמור על הכל מסודר.",
//               },
//               {
//                 icon: (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="32"
//                     height="32"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-teal-500"
//                   >
//                     <circle cx="11" cy="11" r="8"></circle>
//                     <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//                   </svg>
//                 ),
//                 title: "חיפוש עוצמתי",
//                 description: "מצא כל תמונה באופן מיידי עם יכולות החיפוש המתקדמות שלנו.",
//               },
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-8 rounded-xl border border-teal-100 shadow-sm hover:shadow-md transition-all duration-300 group"
//               >
//                 <div className="bg-teal-50 p-3 rounded-lg w-fit mb-5 group-hover:bg-teal-100 transition-colors">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-12">
//         <div className="container mx-auto px-4 text-center">
//           <p>© {new Date().getFullYear()} TakeAPeek. כל הזכויות שמורות.</p>
//         </div>
//       </footer>
//     </div>
//   )
// }

