import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Take A Peek has completely transformed how I manage my photography business. The AI filtering saves me hours of work every week.",
    name: "Sarah Johnson",
    title: "Wedding Photographer",
    avatar: "SJ"
  },
  {
    id: 2,
    quote: "The organization features are incredible. I can find any photo in seconds, and sharing with clients has never been easier.",
    name: "Michael Chen",
    title: "Portrait Photographer",
    avatar: "MC"
  },
  {
    id: 3,
    quote: "Cloud storage that actually works for photographers. The collage creation tools are intuitive and powerful.",
    name: "Elena Rodriguez",
    title: "Fashion Photographer",
    avatar: "ER"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('testimonials');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-darkblue-900 mb-4">
            Loved by <span className="text-gradient">Photographers</span>
          </h2>
          <p className="text-lg text-darkblue-800/70">
            Hear what professional photographers have to say about Take A Peek.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-500 absolute inset-0 ${
                  index === activeIndex 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : index < activeIndex 
                      ? 'opacity-0 -translate-x-full z-0' 
                      : 'opacity-0 translate-x-full z-0'
                }`}
              >
                <Card className="bg-gray-50/80 border-turquoise-100 p-8 md:p-10">
                  <div className="flex flex-col items-center">
                    <div className="mb-6 text-turquoise-500">
                      <Quote size={42} />
                    </div>
                    <p className="text-xl md:text-2xl text-center text-darkblue-900 mb-8 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-turquoise-400 to-turquoise-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                        {testimonial.avatar}
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-darkblue-900">{testimonial.name}</h4>
                        <p className="text-sm text-darkblue-700">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}

            {/* Show first testimonial by default */}
            <div className={`transition-all duration-500 ${activeIndex === 0 || !isInView ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <Card className="bg-gray-50/80 border-turquoise-100 p-8 md:p-10">
                <div className="flex flex-col items-center">
                  <div className="mb-6 text-turquoise-500">
                    <Quote size={42} />
                  </div>
                  <p className="text-xl md:text-2xl text-center text-darkblue-900 mb-8 italic">
                    "{testimonials[0].quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-turquoise-400 to-turquoise-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonials[0].avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-darkblue-900">{testimonials[0].name}</h4>
                      <p className="text-sm text-darkblue-700">{testimonials[0].title}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                  index === activeIndex ? 'bg-turquoise-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;