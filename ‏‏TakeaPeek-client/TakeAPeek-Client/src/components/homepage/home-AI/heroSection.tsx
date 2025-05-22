import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Image, Share, Cloud, Wand2 } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-br from-turquoise-50 to-white">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-turquoise-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-turquoise-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <span className="inline-block px-4 py-1.5 bg-turquoise-100 text-turquoise-700 rounded-full text-sm font-semibold mb-4">
                For Professional Photographers
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-darkblue-900 leading-tight">
                Manage photos with <span className="text-gradient">stunning simplicity</span>
              </h1>
              <p className="mt-6 text-xl text-darkblue-800/80 leading-relaxed">
                Organize, share, and transform your photography collection with AI-powered tools designed for professionals.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-turquoise-600 hover:bg-turquoise-700 text-white text-lg">
                Start free trial
              </Button>
              <Button size="lg" variant="outline" className="border-turquoise-200 text-darkblue-900 hover:bg-turquoise-50 text-lg">
                Watch demo
              </Button>
            </div>
            
            <div className="pt-4 flex flex-wrap items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-turquoise-100"></div>
                ))}
              </div>
              <p className="text-sm text-darkblue-800">
                <span className="font-semibold">4,000+</span> photographers trust us
              </p>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              {/* Main phone frame */}
              <div className="relative mx-auto w-[280px] h-[580px] bg-darkblue-900 rounded-[3rem] border-[8px] border-darkblue-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-6 bg-darkblue-900 rounded-b-xl"></div>
                
                {/* App UI Mock */}
                <div className="h-full bg-white overflow-hidden">
                  {/* App header */}
                  <div className="bg-turquoise-600 text-white p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold">Take A Peek</h3>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Camera size={18} />
                      </div>
                    </div>
                  </div>
                  
                  {/* App content */}
                  <div className="p-3 grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div 
                        key={i} 
                        className="aspect-square rounded-md overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shimmer"
                      ></div>
                    ))}
                  </div>
                  
                  {/* App bottom bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-white p-2 border-t border-gray-200">
                    <div className="flex justify-around">
                      <div className="p-2"><Image size={20} className="text-turquoise-600" /></div>
                      <div className="p-2"><Share size={20} className="text-gray-400" /></div>
                      <div className="p-2"><Cloud size={20} className="text-gray-400" /></div>
                      <div className="p-2"><Wand2 size={20} className="text-gray-400" /></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-2xl bg-white shadow-xl p-4 rotate-6 animate-float">
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-turquoise-200 to-turquoise-400 flex items-center justify-center">
                  <Cloud className="text-white" size={32} />
                </div>
              </div>
              
              <div className="absolute -bottom-8 -left-16 w-32 h-32 rounded-2xl bg-white shadow-xl p-3 -rotate-12 animate-float" style={{animationDelay: '1s'}}>
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-200 to-purple-400 flex items-center justify-center">
                  <Wand2 className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,75C1120,75,1280,53,1360,42.7L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;