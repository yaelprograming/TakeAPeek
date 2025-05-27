// // "use client"

// // import { useEffect, useRef, useState } from "react"
// // import { Link } from "react-router-dom"
// // import "./homePage.css"

// // export default function HomePage() {
// //   const targetRef = useRef<HTMLDivElement>(null)
// //   const [scrollY, setScrollY] = useState(0)
// //   const [mounted, setMounted] = useState(false)

// //   useEffect(() => {
// //     setMounted(true)

// //     const handleScroll = () => {
// //       setScrollY(window.scrollY)
// //     }

// //     window.addEventListener("scroll", handleScroll)
// //     return () => {
// //       window.removeEventListener("scroll", handleScroll)
// //     }
// //   }, [])

// //   // Calculate opacity and transform based on scroll position
// //   const heroOpacity = Math.max(1 - scrollY / 500, 0)
// //   const heroTransform = `translateY(${scrollY * 0.4}px)`

// //   return (
// //     <div className="homepage min-h-screen bg-white overflow-hidden">
// //       {/* Navigation */}
// //       <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-teal-100">
// //         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
// //           <div className="flex items-center gap-2">
// //             <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 width="24"
// //                 height="24"
// //                 viewBox="0 0 24 24"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 strokeWidth="2"
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 className="text-white"
// //               >
// //                 <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
// //                 <circle cx="12" cy="13" r="4"></circle>
// //               </svg>
// //             </div>
// //             <span className="text-2xl font-bold">
// //               Take<span className="text-teal-500">A</span>Peek
// //             </span>
// //           </div>
// //           <nav className="hidden md:flex items-center gap-6">
// //             <a href="#features" className="text-gray-600 hover:text-teal-500 transition">
// //               תכונות
// //             </a>
// //             <a href="#ai" className="text-gray-600 hover:text-teal-500 transition">
// //               בינה מלאכותית
// //             </a>
// //             <a href="#organize" className="text-gray-600 hover:text-teal-500 transition">
// //               ארגון
// //             </a>
// //             <a href="#collage" className="text-gray-600 hover:text-teal-500 transition">
// //               קולאז'ים
// //             </a>
// //           </nav>
// //           <div className="flex items-center gap-3">
// //             <Link to="/login" className="hidden sm:block">
// //               <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
// //                 התחברות
// //               </button>
// //             </Link>
// //             <Link to="/register">
// //               <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition">
// //                 התחל עכשיו
// //               </button>
// //             </Link>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Hero Section */}
// //       <section ref={targetRef} className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
// //         <div
// //           className="absolute inset-0 -z-10 bg-gradient-to-b from-teal-50 to-white"
// //           style={{ opacity: heroOpacity, transform: heroTransform }}
// //         >
// //           <div className="absolute inset-0 bg-radial-gradient-1"></div>
// //           <div className="absolute inset-0 bg-radial-gradient-2"></div>
// //         </div>

// //         <div className="container mx-auto px-4 relative z-10">
// //           <div className="text-center max-w-4xl mx-auto mb-16">
// //             <div className="animate-fade-in-down">
// //               <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
// //                 <span className="text-teal-500">מהפכה</span> בעולם <span className="text-teal-600">הצילום</span>
// //               </h1>
// //             </div>
// //             <div className="animate-fade-in-down animation-delay-200">
// //               <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
// //                 שחרר את הפוטנציאל האמיתי של התמונות שלך עם טכנולוגיית AI מתקדמת. גלה, ארגן וצור בדרך חדשה לגמרי.
// //               </p>
// //             </div>
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-down animation-delay-400">
// //               <button className="bg-teal-500 hover:bg-teal-600 h-12 px-8 text-lg text-white rounded-md transition">
// //                 נסה בחינם
// //               </button>
// //               <button className="border border-gray-300 h-12 px-8 text-lg rounded-md hover:bg-gray-100 transition">
// //                 צפה בהדגמה
// //               </button>
// //             </div>
// //           </div>

// //           <div className="relative max-w-5xl mx-auto animate-fade-in-up animation-delay-600">
// //             {/* Main Dashboard Preview */}
// //             <div className="relative rounded-xl overflow-hidden shadow-2xl border border-teal-100">
// //               <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent z-10"></div>
// //               <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center">
// //                 <div className="dashboard-preview">
// //                   {/* Dashboard mockup content */}
// //                   <div className="dashboard-header">
// //                     <div className="dashboard-search">
// //                       <svg
// //                         xmlns="http://www.w3.org/2000/svg"
// //                         width="16"
// //                         height="16"
// //                         fill="currentColor"
// //                         className="search-icon"
// //                         viewBox="0 0 16 16"
// //                       >
// //                         <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
// //                       </svg>
// //                       <span>חיפוש תמונות...</span>
// //                     </div>
// //                     <div className="dashboard-user">
// //                       <span>שלום, משתמש</span>
// //                       <div className="user-avatar"></div>
// //                     </div>
// //                   </div>
// //                   <div className="dashboard-content">
// //                     <div className="dashboard-sidebar">
// //                       <div className="sidebar-item active">
// //                         <svg
// //                           xmlns="http://www.w3.org/2000/svg"
// //                           width="16"
// //                           height="16"
// //                           fill="currentColor"
// //                           viewBox="0 0 16 16"
// //                         >
// //                           <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
// //                           <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
// //                         </svg>
// //                         <span>דף הבית</span>
// //                       </div>
// //                       <div className="sidebar-item">
// //                         <svg
// //                           xmlns="http://www.w3.org/2000/svg"
// //                           width="16"
// //                           height="16"
// //                           fill="currentColor"
// //                           viewBox="0 0 16 16"
// //                         >
// //                           <path d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z" />
// //                           <path d="M4.318 10.254a.5.5 0 0 0 .133.684l3.474 2.106a.5.5 0 0 0 .52 0l3.474-2.106a.5.5 0 0 0 .134-.684.5.5 0 0 0-.684-.133L8 12.44l-3.369-2.04a.5.5 0 0 0-.684.134z" />
// //                         </svg>
// //                         <span>אלבומים</span>
// //                       </div>
// //                       <div className="sidebar-item">
// //                         <svg
// //                           xmlns="http://www.w3.org/2000/svg"
// //                           width="16"
// //                           height="16"
// //                           fill="currentColor"
// //                           viewBox="0 0 16 16"
// //                         >
// //                           <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
// //                           <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
// //                         </svg>
// //                         <span>תמונות</span>
// //                       </div>
// //                       <div className="sidebar-item">
// //                         <svg
// //                           xmlns="http://www.w3.org/2000/svg"
// //                           width="16"
// //                           height="16"
// //                           fill="currentColor"
// //                           viewBox="0 0 16 16"
// //                         >
// //                           <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755z" />
// //                         </svg>
// //                         <span>פרופיל</span>
// //                       </div>
// //                       <div className="sidebar-item">
// //                         <svg
// //                           xmlns="http://www.w3.org/2000/svg"
// //                           width="16"
// //                           height="16"
// //                           fill="currentColor"
// //                           viewBox="0 0 16 16"
// //                         >
// //                           <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
// //                         </svg>
// //                         <span>הגדרות</span>
// //                       </div>
// //                     </div>
// //                     <div className="dashboard-main">
// //                       <div className="dashboard-grid">
// //                         {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
// //                           <div key={i} className="dashboard-image">
// //                             <div className="image-overlay"></div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Floating UI Elements */}
// //               <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-teal-100 max-w-xs">
// //                 <div className="flex items-center gap-3 mb-3">
// //                   <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
// //                   <span className="text-sm font-medium text-gray-700">ניתוח AI הושלם</span>
// //                 </div>
// //                 <p className="text-sm text-gray-600 mb-2">נמצאו 24 תמונות עם תוכן דומה</p>
// //                 <div className="flex gap-2">
// //                   <button className="bg-teal-500 hover:bg-teal-600 text-white text-xs px-3 py-1 rounded-md transition">
// //                     צפה בקבוצה
// //                   </button>
// //                   <button className="border border-gray-300 text-xs px-3 py-1 rounded-md hover:bg-gray-100 transition">
// //                     סגור
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-teal-100">
// //                 <div className="flex gap-2">
// //                   <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition">
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       width="16"
// //                       height="16"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       strokeWidth="2"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                     >
// //                       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
// //                       <polyline points="17 8 12 3 7 8"></polyline>
// //                       <line x1="12" y1="3" x2="12" y2="15"></line>
// //                     </svg>
// //                   </button>
// //                   <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition">
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       width="16"
// //                       height="16"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       strokeWidth="2"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                     >
// //                       <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v1"></path>
// //                       <path d="M15 13h5v5h-5z"></path>
// //                       <path d="M18 16v-3"></path>
// //                       <path d="M15 16h5"></path>
// //                     </svg>
// //                   </button>
// //                   <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition">
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       width="16"
// //                       height="16"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       strokeWidth="2"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                     >
// //                       <path d="M16 16H8a2 2 0 0 1-2-2V8h8"></path>
// //                       <path d="M16 8h2a2 2 0 0 1 2 2v6"></path>
// //                       <path d="M22 12h-4"></path>
// //                       <path d="M16 16v4"></path>
// //                       <path d="M8 2h8"></path>
// //                       <path d="M12 2v4"></path>
// //                     </svg>
// //                   </button>
// //                   <button className="h-8 w-8 flex items-center justify-center rounded-md bg-teal-500 text-white">
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       width="16"
// //                       height="16"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       strokeWidth="2"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                     >
// //                       <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
// //                       <circle cx="8.5" cy="8.5" r="1.5"></circle>
// //                       <polyline points="21 15 16 10 5 21"></polyline>
// //                     </svg>
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Decorative Elements */}
// //             <div className="absolute -top-6 -right-6 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
// //             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
// //           </div>

// //           <div className="flex justify-center mt-12">
// //             <div className="animate-bounce">
// //               <a href="#features">
// //                 <button className="rounded-full h-12 w-12 border border-teal-100 flex items-center justify-center">
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     width="24"
// //                     height="24"
// //                     viewBox="0 0 24 24"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     className="text-teal-500"
// //                   >
// //                     <polyline points="6 9 12 15 18 9"></polyline>
// //                   </svg>
// //                 </button>
// //               </a>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section id="features" className="py-20 bg-white">
// //         <div className="container mx-auto px-4">
// //           <div className="text-center max-w-3xl mx-auto mb-16">
// //             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">תכונות חזקות לצלמים</h2>
// //             <p className="text-xl text-gray-600">כל מה שאתה צריך כדי לנהל את אוסף התמונות שלך ביעילות</p>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-8">
// //             {[
// //               {
// //                 icon: (
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     width="32"
// //                     height="32"
// //                     viewBox="0 0 24 24"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     className="text-teal-500"
// //                   >
// //                     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
// //                     <polyline points="17 8 12 3 7 8"></polyline>
// //                     <line x1="12" y1="3" x2="12" y2="15"></line>
// //                   </svg>
// //                 ),
// //                 title: "העלאה קלה",
// //                 description: "גרור ושחרר מספר תמונות בבת אחת. תמיכה בכל הפורמטים העיקריים.",
// //               },
// //               {
// //                 icon: (
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     width="32"
// //                     height="32"
// //                     viewBox="0 0 24 24"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     className="text-teal-500"
// //                   >
// //                     <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v1"></path>
// //                     <path d="M15 13h5v5h-5z"></path>
// //                     <path d="M18 16v-3"></path>
// //                     <path d="M15 16h5"></path>
// //                   </svg>
// //                 ),
// //                 title: "ארגון חכם",
// //                 description: "צור תיקיות, תגיות וקטגוריות מותאמות אישית כדי לשמור על הכל מסודר.",
// //               },
// //               {
// //                 icon: (
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     width="32"
// //                     height="32"
// //                     viewBox="0 0 24 24"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     className="text-teal-500"
// //                   >
// //                     <circle cx="11" cy="11" r="8"></circle>
// //                     <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
// //                   </svg>
// //                 ),
// //                 title: "חיפוש עוצמתי",
// //                 description: "מצא כל תמונה באופן מיידי עם יכולות החיפוש המתקדמות שלנו.",
// //               },
// //               {
// //                 icon: (
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     width="32"
// //                     height="32"
// //                     viewBox="0 0 24 24"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     className="text-teal-500"
// //                   >
// //                     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
// //                     <circle cx="9" cy="7" r="4"></circle>
// //                     <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
// //                     <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
// //                   </svg>
// //                 ),
// //                 title: "זיהוי פנים",
// //                 description: "זהה וקבץ תמונות באופן אוטומטי לפי האנשים המופיעים בהן.",
// //               },
// //               {
// //                 icon: (
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     width="32"
// //                     height="32"
// //                     viewBox="0 0 24 24"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     className="text-teal-500"
// //                   >
// //                     <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
// //                     <rect x="7" y="7" width="3" height="9"></rect>
// //                     <rect x="14" y="7" width="3" height="5"></rect>
// //                   </svg>
// //                 ),
// //                 title: "קולאז'ים יצירתיים",
// //                 description: "עצב קולאז'ים מדהימים עם עורך גרור ושחרר אינטואיטיבי.",
// //               },
// //               {
// //                 icon: (
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     width="32"
// //                     height="32"
// //                     viewBox="0 0 24 24"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     className="text-teal-500"
// //                   >
// //                     <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
// //                     <circle cx="12" cy="13" r="4"></circle>
// //                   </svg>
// //                 ),
// //                 title: "עיבוד אצווה",
// //                 description: "החל עריכות, תגיות או קטגוריות על מספר תמונות בבת אחת.",
// //               },
// //             ].map((feature, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-white p-8 rounded-xl border border-teal-100 shadow-sm hover:shadow-md transition-all duration-300 group feature-card"
// //               >
// //                 <div className="bg-teal-50 p-3 rounded-lg w-fit mb-5 group-hover:bg-teal-100 transition-colors">
// //                   {feature.icon}
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
// //                 <p className="text-gray-600">{feature.description}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* AI Section */}
// //       <section id="ai" className="py-20 bg-gradient-to-b from-white to-teal-50">
// //         <div className="container mx-auto px-4">
// //           <div className="grid md:grid-cols-2 gap-12 items-center">
// //             <div className="order-2 md:order-1">
// //               <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl border border-teal-100">
// //                 <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/30 to-transparent"></div>
// //                 <div className="h-full w-full bg-gray-100 relative">
// //                   {/* AI Analysis mockup */}
// //                   <div className="ai-analysis-mockup">
// //                     <div className="ai-image"></div>
// //                     <div className="ai-overlay">
// //                       <div className="ai-box ai-box-1"></div>
// //                       <div className="ai-box ai-box-2"></div>
// //                     </div>
// //                   </div>
// //                 </div>

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
// //             </div>
// //             <div className="order-1 md:order-2 space-y-6">
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
// //                   <div key={index} className="flex gap-4 p-4 rounded-lg hover:bg-teal-50 transition-colors ai-feature">
// //                     <div className="mt-1 bg-teal-100 rounded-full p-1">
// //                       <div className="h-5 w-5 rounded-full bg-teal-500 flex items-center justify-center text-white">
// //                         {index + 1}
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <h3 className="font-semibold text-gray-900 text-lg">{feature.title}</h3>
// //                       <p className="text-gray-600">{feature.description}</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               <button className="mt-6 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md transition">
// //                 גלה את תכונות ה-AI
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-500 relative overflow-hidden">
// //         <div className="absolute inset-0 bg-opacity-10 bg-cover bg-center"></div>
// //         <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-teal-500/90"></div>
// //         <div className="container mx-auto px-4 text-center relative z-10">
// //           <div>
// //             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">מהפכה בעולם הצילום - התחל לארגן היום</h2>
// //             <p className="text-xl text-teal-50 max-w-2xl mx-auto mb-8">
// //               הצטרף לאלפי צלמים ששינו את שיטת העבודה שלהם עם TakeAPeek.
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //               <button className="bg-white text-teal-600 hover:bg-teal-50 h-12 px-8 text-lg rounded-md transition">
// //                 התחל ניסיון בחינם
// //               </button>
// //               <button className="border border-white text-white hover:bg-teal-600/50 h-12 px-8 text-lg rounded-md transition">
// //                 תאם הדגמה
// //               </button>
// //             </div>
// //           </div>

// //           {/* Floating Camera Icon */}
// //           <div className="absolute -bottom-16 -right-16 w-32 h-32 opacity-10">
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               width="100%"
// //               height="100%"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //               className="text-white"
// //             >
// //               <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
// //               <circle cx="12" cy="13" r="4"></circle>
// //             </svg>
// //           </div>
// //           <div className="absolute -top-16 -left-16 w-32 h-32 opacity-10">
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               width="100%"
// //               height="100%"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //               className="text-white"
// //             >
// //               <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
// //               <circle cx="12" cy="13" r="4"></circle>
// //             </svg>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="bg-gray-900 text-gray-300 py-12">
// //         <div className="container mx-auto px-4">
// //           <div className="grid md:grid-cols-4 gap-8">
// //             <div>
// //               <div className="flex items-center gap-2 mb-4">
// //                 <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
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
// //                   <a href="#" className="hover:text-teal-400 transition">
// //                     תכונות
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a href="#" className="hover:text-teal-400 transition">
// //                     מחירים
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a href="#" className="hover:text-teal-400 transition">
// //                     הדרכות
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a href="#" className="hover:text-teal-400 transition">
// //                     עדכונים
// //                   </a>
// //                 </li>
// //               </ul>
// //             </div>

// //             <div>
// //               <h3 className="text-white font-semibold mb-4">חברה</h3>
// //               <ul className="space-y-2">
// //                 <li>
// //                   <a href="#" className="hover:text-teal-400 transition">
// //                     אודות
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a href="#" className="hover:text-teal-400 transition">
// //                     בלוג
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a href="#" className="hover:text-teal-400 transition">
// //                     קריירה
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a href="#" className="hover:text-teal-400 transition">
// //                     צור קשר
// //                   </a>
// //                 </li>
// //               </ul>
// //             </div>

// //             <div>
// //               <h3 className="text-white font-semibold mb-4">משפטי</h3>
// //               <ul className="space-y-2">
// //                 <li>
// //                   <a href="#" className="hover:text-teal-400 transition">
// //                     פרטיות
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a href="#" className="hover:text-teal-400 transition">
// //                     תנאים
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a href="#" className="hover:text-teal-400 transition">
// //                     אבטחה
// //                   </a>
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

"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  Fade,
  Slide,
  Zoom,
  Typography,
  TypographyProps
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { Camera, Upload, FolderOpen, ImageIcon, Search, Grid3x3, Sparkles } from "lucide-react"
import { Link, Link as RouterLink, useNavigate } from "react-router-dom"
import React from "react"
import { useAuth } from "../../components/AuthContext"
import Header from "../../components/Header"
import { AnimatePresence, motion } from "framer-motion"

// סגנון מותאם אישית לכותרות
// const GradientTypography = styled(Typography)(({ theme }) => ({
//   background: "linear-gradient(90deg, #0c678d 0%, #0d818f 50%, #0aa997 100%)",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   backgroundClip: "text",
//   textFillColor: "transparent",
//   fontWeight: "bold",
// }))

export const GradientTypography = React.forwardRef<HTMLSpanElement, TypographyProps>(
    function GradientTypography(props, ref) {
      return (
        <Typography
          {...props}
          ref={ref}
          sx={{
            background: "linear-gradient(90deg, #0c678d, #0d818f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            ...props.sx,
          }}
        />
      )
    }
  )

// סגנון מותאם אישית לכפתורים
const GradientButton = React.forwardRef(function GradientButton(
  props: React.ComponentProps<typeof Button> & { sx?: object },
  ref
) {
    return (
      <Button
        {...props} // Spread all props to the Button component
        sx={{
          background: "linear-gradient(90deg, #0c678d, #0d818f)",
          color: "white",
          "&:hover": {
            background: "linear-gradient(90deg, #0a5a6b, #0b6f7c)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
          ...props.sx,
        }}
      />
    );
  });

// סגנון מותאם אישית לכרטיסים
const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
  },
}))

// אנימציה לתמונות
const AnimatedImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  transition: "transform 0.5s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
}))

const HomePage = () => {
  const [loaded, setLoaded] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const isMobile = useMediaQuery("(max-width:600px)")
  const isTablet = useMediaQuery("(max-width:960px)")
  const navigate = useNavigate()

  // אפקט טעינה
  useEffect(() => {
    setLoaded(true)
  }, [])

  // מידע על התכונות
  const features = [
    {
      title: "ארגון תמונות",
      description: "העלאה, הורדה ומיון תמונות בקלות. ארגון בתיקיות וניהול ספריית התמונות שלך.",
      icon: <FolderOpen size={40} color="#0c678d" />,
      // image: "/placeholder.svg?height=200&width=300",
       image: "img/logo.png?height=100&width=200",
    },
    {
      title: "זיהוי AI",
      description: "מיון וסינון תמונות באמצעות בינה מלאכותית. זיהוי פנים, אובייקטים וסצנות.",
      icon: <Sparkles size={40} color="#0d818f" />,
      // image: "/placeholder.svg?height=200&width=300",
      image: "img/logo.png?height=200&width=300",
    },
    {
      title: "יצירת קולאז'ים",
      description: "עיצוב קולאז'ים מרהיבים מהתמונות שלך בכמה קליקים פשוטים.",
      icon: <Grid3x3 size={40} color="#0aa997" />,
      image: "/img/logo.png??height=200&width=300",
    },
  ]

  const handleProtectedNavigation = (path: string) => {
    if (isAuthenticated) {
      navigate(path)
    }
  }
  return (
    <Box
      sx={{
        overflow: "hidden",
        direction: "rtl", // כיוון RTL לעברית
        textAlign: "right",
        minHeight: "100vh",
      }}
    >
      <Header/>
      {/* חלק עליון - גיבור */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4f1f9 100%)",
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          borderRadius: { xs: "0 0 24px 24px", md: "0 0 48px 48px" },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* הוספה */}
                {/* Background Animation Elements */}
                <motion.div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "linear-gradient(45deg, rgba(13, 129, 143, 0.1), rgba(10, 169, 151, 0.1))",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "linear-gradient(45deg, rgba(10, 169, 151, 0.1), rgba(12, 103, 141, 0.1))",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        {/* הוספה */}
        
        {/* <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={loaded} timeout={1000}>
                <Box>
                  <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-start" }}>
                    <img
                      src="/img/TakeAPeekLogo.png"
                      alt="TakeAPeek Logo"
                      style={{
                        height: isMobile ? "90px" : "110px",
                        marginBottom: "16px",
                      }}
                    />
                  </Box>
                  <GradientTypography variant={isMobile ? "h3" : "h2"} component="h1" sx={{ mb: 2 }}>
                    ארגון תמונות חכם לצלמים מקצועיים
                  </GradientTypography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: "90%" }}>
                    נהל את אוסף התמונות שלך בקלות עם כלי AI מתקדמים, ארגון חכם וממשק משתמש אינטואיטיבי
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <GradientButton variant="contained" size="large" component={Link} to="/register">
                      התחל עכשיו
                    </GradientButton>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "#0d818f",
                        color: "#0d818f",
                        "&:hover": {
                          borderColor: "#0aa997",
                          backgroundColor: "rgba(10, 169, 151, 0.04)",
                        },
                      }}
                      component={Link}
                      to="/gallery"
                    >
                      צפה בגלריה
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "#0d818f",
                        color: "#0d818f",
                        "&:hover": {
                          borderColor: "#0aa997",
                          backgroundColor: "rgba(10, 169, 151, 0.04)",
                        },
                      }}
                      component={Link}
                      to="/design"
                    >
צור קולאז                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "#0d818f",
                        color: "#0d818f",
                        "&:hover": {
                          borderColor: "#0aa997",
                          backgroundColor: "rgba(10, 169, 151, 0.04)",
                        },
                      }}
                      component={Link}
                      to="/calendar"
                    >
ליומן שלי                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={loaded} timeout={1500}>
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "300px", md: "400px" },
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: "80%",
                      height: "80%",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #0c678d 0%, #0aa997 100%)",
                      transform: "rotate(-5deg)",
                      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h4" color="white" sx={{ p: 2, textAlign: "center" }}>
                      TakeAPeek
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      width: "70%",
                      height: "70%",
                      borderRadius: "16px",
                      background: "white",
                      transform: "rotate(3deg) translateY(-10px)",
                      boxShadow: "0 15px 25px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Camera size={60} color="#0d818f" />
                  </Box>
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <GradientTypography variant="h3" component="h2" sx={{ mb: 2 }}>
            תכונות מתקדמות
          </GradientTypography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "800px", mx: "auto" }}>
            גלה את הכלים החדשניים שיהפכו את ניהול התמונות שלך לחוויה פשוטה ויעילה
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in={loaded} timeout={1000 + index * 500}>
                <FeatureCard>
                  <CardMedia component="img" height="200" image={feature.image} alt={feature.title} />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      {feature.icon}
                      <Typography variant="h5" component="h3" sx={{ mr: 1, fontWeight: "bold" }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4f1f9 100%)",
          py: { xs: 8, md: 12 },
          borderRadius: { xs: "24px", md: "48px" },
          my: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Slide direction="right" in={loaded} timeout={1000}>
                <Box>
                  <GradientTypography variant="h3" component="h2" sx={{ mb: 3 }}>
                    טכנולוגיית AI מתקדמת
                  </GradientTypography>
                  <Typography variant="body1" sx={{ mb: 4 }}>
                    האפליקציה שלנו משתמשת בטכנולוגיית בינה מלאכותית מתקדמת לזיהוי פנים, מיון תמונות לפי נושאים, וארגון
                    חכם של הספרייה שלך. המערכת לומדת את ההעדפות שלך ומשתפרת עם הזמן.
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          borderRadius: "50%",
                          bgcolor: "#0c678d",
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Search size={24} color="white" />
                      </Box>
                      <Typography variant="h6">זיהוי פנים וסצנות אוטומטי</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          borderRadius: "50%",
                          bgcolor: "#0d818f",
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ImageIcon size={24} color="white" />
                      </Box>
                      <Typography variant="h6">מיון חכם לפי איכות ותוכן</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          borderRadius: "50%",
                          bgcolor: "#0aa997",
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Upload size={24} color="white" />
                      </Box>
                      <Typography variant="h6">המלצות חכמות לארגון תמונות</Typography>
                    </Box>
                  </Box>
                </Box>
              </Slide>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={loaded} timeout={1500}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 2,
                    transform: isTablet ? "none" : "rotate(3deg)",
                  }}
                >
                  <AnimatedImage src="/placeholder.svg?height=200&width=200" alt="AI Feature 1" />
                  <AnimatedImage
                    src="/placeholder.svg?height=200&width=200"
                    alt="AI Feature 2"
                    sx={{ transform: "translateY(20px)" }}
                  />
                  <AnimatedImage
                    src="/placeholder.svg?height=200&width=200"
                    alt="AI Feature 3"
                    sx={{ transform: "translateY(-20px)" }}
                  />
                  <AnimatedImage src="/placeholder.svg?height=200&width=200" alt="AI Feature 4" />
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: "center" }}>
        <Fade in={loaded} timeout={1000}>
          <Box>
            <GradientTypography variant="h3" component="h2" sx={{ mb: 3 }}>
              מוכנים להתחיל?
            </GradientTypography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              הצטרפו לאלפי צלמים שכבר משתמשים ב-TakeAPeek לניהול ספריית התמונות שלהם
            </Typography>
            <GradientButton variant="contained" size="large" sx={{ px: 4, py: 1.5 }} component={Link} to="/register">
              צור חשבון חינם
            </GradientButton>
          </Box>
        </Fade>
      </Container>

      <Box
        sx={{
          bgcolor: "#f5f7fa",
          py: 4,
          borderRadius: "24px 24px 0 0",
          mt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src="/img/TakeAPeekLogo.png" alt="TakeAPeek Logo" style={{ height: "40px", marginLeft: "12px" }} />
                <Typography variant="body2" color="text.secondary">
                  &copy; {new Date().getFullYear()} TakeAPeek. כל הזכויות שמורות.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 3 }}>
                <Link to="/about" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    אודות
                  </Typography>
                </Link>
                <RouterLink to="/privacy" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    פרטיות
                  </Typography>
                </Link>
                <Link to="/terms" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    תנאי שימוש
                  </Typography>
                </Link>
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    צור קשר
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default HomePage
 */}

<Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-start" }}>
                  <motion.img
                    src="/img/TakeAPeekLogo.png"
                    alt="TakeAPeek Logo"
                    style={{
                      height: isMobile ? "90px" : "110px",
                      marginBottom: "16px",
                    }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </Box>

                <AnimatePresence>
                  {isAuthenticated ? (
                    <motion.div
                      key="authenticated"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <GradientTypography variant={isMobile ? "h3" : "h2"} component="h1" sx={{ mb: 2 }}>
                        ברוכים השבים, {user?.name}! 🎉
                      </GradientTypography>
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: "90%" }}>
                        המשיכו לנהל את אוסף התמונות שלכם עם הכלים המתקדמים שלנו
                      </Typography>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="guest"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <GradientTypography variant={isMobile ? "h3" : "h2"} component="h1" sx={{ mb: 2 }}>
                        ארגון תמונות חכם לצלמים מקצועיים
                      </GradientTypography>
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: "90%" }}>
                        נהל את אוסף התמונות שלך בקלות עם כלי AI מתקדמים, ארגון חכם וממשק משתמש אינטואיטיבי
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <GradientButton
                      variant="contained"
                      size="large"
                      onClick={() => handleProtectedNavigation("/gallery")}
                      startIcon={<Camera />}
                    >
                      {isAuthenticated ? "לגלריה שלי" : "צפה בגלריה"}
                    </GradientButton>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "#0d818f",
                        color: "#0d818f",
                        "&:hover": {
                          borderColor: "#0aa997",
                          backgroundColor: "rgba(10, 169, 151, 0.04)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => handleProtectedNavigation("/design")}
                      startIcon={<Grid3x3 />}
                    >
                      צור קולאז'
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "#0d818f",
                        color: "#0d818f",
                        "&:hover": {
                          borderColor: "#0aa997",
                          backgroundColor: "rgba(10, 169, 151, 0.04)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => handleProtectedNavigation("/calendar")}
                      startIcon={<FolderOpen />}
                    >
                      ליומן שלי
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "300px", md: "400px" },
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      width: "80%",
                      height: "80%",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #0c678d 0%, #0aa997 100%)",
                      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    animate={{
                      rotateY: [0, 10, 0],
                      rotateX: [0, 5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Typography variant="h4" color="white" sx={{ p: 2, textAlign: "center", fontWeight: 700 }}>
                      TakeAPeek
                    </Typography>
                  </motion.div>

                  <motion.div
                    style={{
                      position: "absolute",
                      width: "70%",
                      height: "70%",
                      borderRadius: "16px",
                      background: "white",
                      boxShadow: "0 15px 25px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotateZ: [0, 3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Camera size={60} color="#0d818f" />
                    </motion.div>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* חלק תכונות */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <GradientTypography variant="h3" component="h2" sx={{ mb: 2 }}>
              תכונות מתקדמות
            </GradientTypography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "800px", mx: "auto" }}>
              גלה את הכלים החדשניים שיהפכו את ניהול התמונות שלך לחוויה פשוטה ויעילה
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <FeatureCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={feature.image}
                    alt={feature.title}
                    sx={{
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        style={{ marginLeft: "8px" }}
                      >
                        {feature.icon}
                      </motion.div>
                      <Typography variant="h5" component="h3" sx={{ fontWeight: "bold" }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* חלק AI */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4f1f9 100%)",
          py: { xs: 8, md: 12 },
          borderRadius: { xs: "24px", md: "48px" },
          my: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "#0d818f",
              opacity: 0.3,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            initial={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}

        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <GradientTypography variant="h3" component="h2" sx={{ mb: 3 }}>
                  טכנולוגיית AI מתקדמת
                </GradientTypography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  האפליקציה שלנו משתמשת בטכנולוגיית בינה מלאכותית מתקדמת לזיהוי פנים, מיון תמונות לפי נושאים, וארגון חכם
                  של הספרייה שלך. המערכת לומדת את ההעדפות שלך ומשתפרת עם הזמן.
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    { icon: <Search size={24} color="white" />, text: "זיהוי פנים וסצנות אוטומטי", color: "#0c678d" },
                    { icon: <ImageIcon size={24} color="white" />, text: "מיון חכם לפי איכות ותוכן", color: "#0d818f" },
                    { icon: <Upload size={24} color="white" />, text: "המלצות חכמות לארגון תמונות", color: "#0aa997" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10 }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.3 }}>
                          <Box
                            sx={{
                              borderRadius: "50%",
                              bgcolor: item.color,
                              width: 40,
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {item.icon}
                          </Box>
                        </motion.div>
                        <Typography variant="h6">{item.text}</Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 2,
                    transform: isTablet ? "none" : "rotate(3deg)",
                  }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 5 : -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <AnimatedImage
                        src="/placeholder.svg?height=200&width=200"
                        alt={`AI Feature ${i}`}
                        sx={{
                          transform: i % 2 === 0 ? "translateY(20px)" : "translateY(-20px)",
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* חלק קריאה לפעולה */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <GradientTypography variant="h3" component="h2" sx={{ mb: 3 }}>
            {isAuthenticated ? "המשיכו לחקור!" : "מוכנים להתחיל?"}
          </GradientTypography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            {isAuthenticated
              ? "גלו עוד תכונות מדהימות ונהלו את התמונות שלכם בצורה המתקדמת ביותר"
              : "הצטרפו לאלפי צלמים שכבר משתמשים ב-TakeAPeek לניהול ספריית התמונות שלהם"}
          </Typography>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <GradientButton
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5 }}
              onClick={() => handleProtectedNavigation(isAuthenticated ? "/gallery" : "/register")}
              startIcon={<Camera />}
            >
              {isAuthenticated ? "לגלריה שלי" : "צור חשבון חינם"}
            </GradientButton>
          </motion.div>
        </motion.div>
      </Container>

      {/* פוטר */}
      <Box
        sx={{
          bgcolor: "#f5f7fa",
          py: 4,
          borderRadius: "24px 24px 0 0",
          mt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src="/img/TakeAPeekLogo.png" alt="TakeAPeek Logo" style={{ height: "40px", marginLeft: "12px" }} />
                <Typography variant="body2" color="text.secondary">
                  &copy; {new Date().getFullYear()} TakeAPeek. כל הזכויות שמורות.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 3 }}>
                <Link to="/about" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    אודות
                  </Typography>
                </Link>
                <Link to="/privacy" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    פרטיות
                  </Typography>
                </Link>
                <Link to="/terms" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    תנאי שימוש
                  </Typography>
                </Link>
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="text.secondary">
                    צור קשר
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default HomePage
