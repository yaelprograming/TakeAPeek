import { Camera, Cloud, Share, Images, Wand2, Layout } from 'lucide-react';

const features = [
  {
    icon: <Cloud size={24} />,
    title: "Cloud Storage",
    description: "Store unlimited photos securely in the cloud and access them from any device, anywhere."
  },
  {
    icon: <Layout size={24} />,
    title: "Organization",
    description: "Organize your photos with smart albums, tags, and custom categories for easy retrieval."
  },
  {
    icon: <Share size={24} />,
    title: "Easy Sharing",
    description: "Share photos and albums with clients through secure, customizable galleries."
  },
  {
    icon: <Images size={24} />,
    title: "Create Collages",
    description: "Design stunning collages with our intuitive, drag-and-drop editor."
  },
  {
    icon: <Wand2 size={24} />,
    title: "AI Filtering",
    description: "Let AI help you sort, categorize, and enhance your photos automatically."
  },
  {
    icon: <Camera size={24} />,
    title: "Professional Editing",
    description: "Access powerful editing tools designed specifically for photographers."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-darkblue-900 mb-4">
            Designed for <span className="text-gradient">Photographers</span>
          </h2>
          <p className="text-lg text-darkblue-800/70">
            Everything you need to manage your photography business efficiently in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-darkblue-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-darkblue-800/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;