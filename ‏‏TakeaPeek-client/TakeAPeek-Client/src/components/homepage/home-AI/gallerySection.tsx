import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const GallerySection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('gallery');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Sample gallery data
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'landscape', label: 'Landscape' },
    { id: 'events', label: 'Events' }
  ];

  // Create placeholder images with varying aspect ratios
  const createGalleryItems = (count: number) => {
    return Array(count).fill(0).map((_, index) => {
      const isLandscape = index % 3 !== 0;
      return {
        id: index,
        aspectRatio: isLandscape ? 'landscape' : 'portrait',
        color: index % 2 === 0 ? 'from-turquoise-200 to-turquoise-400' : 'from-darkblue-100 to-darkblue-300'
      };
    });
  };

  const galleryItems = createGalleryItems(8);

  return (
    <section id="gallery" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-darkblue-900 mb-4">
            Showcase Your <span className="text-gradient">Best Work</span>
          </h2>
          <p className="text-lg text-darkblue-800/70">
            Create beautiful galleries to share with clients. Present your photos in the best possible way.
          </p>
        </div>

        {/* Gallery filter tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 -mx-4 px-4">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-white text-darkblue-900 shadow-sm' 
                    : 'text-darkblue-900/60 hover:text-darkblue-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id}
              className={`group overflow-hidden rounded-xl shadow-md transition-all duration-500 ${
                item.aspectRatio === 'portrait' ? 'row-span-2' : ''
              } ${isInView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={`w-full h-full bg-gradient-to-br ${item.color} relative`}>
                <div className="absolute inset-0 group-hover:bg-darkblue-900/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white border-0">
                    View
                  </Button>
                </div>
                <div className={`${item.aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="border-turquoise-200 text-darkblue-900 hover:bg-turquoise-50 mt-8">
            View more examples <ChevronRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;