import { Button } from "@mui/material";

const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-turquoise-600 to-turquoise-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your photo management?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join thousands of photographers who have simplified their workflow with Take A Peek.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="large" className="bg-white text-turquoise-700 hover:bg-gray-100 text-lg">
              Start your free trial
            </Button>
            <Button size="large" variant="outlined" className="border-white text-white hover:bg-turquoise-700 text-lg">
              Schedule a demo
            </Button>
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

export default CtaSection;