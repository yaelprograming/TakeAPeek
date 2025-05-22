import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-darkblue-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-turquoise-400 to-turquoise-600"></div>
                <div className="absolute inset-[2px] rounded-full bg-darkblue-900 flex items-center justify-center">
                  <span className="text-turquoise-400 font-bold text-lg">P</span>
                </div>
              </div>
              <span className="ml-2 text-2xl font-bold text-white font-display">
                Take A <span className="text-turquoise-400">Peek</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              The complete photo management solution for professional photographers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-turquoise-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-turquoise-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-turquoise-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-turquoise-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-turquoise-400 transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-turquoise-400 transition-colors">Features</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-turquoise-400 transition-colors">Gallery</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-turquoise-400 transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-turquoise-400 transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Help & Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-turquoise-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-turquoise-400 transition-colors">Support Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-turquoise-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-turquoise-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-turquoise-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for photography tips and product updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-darkblue-800 border border-darkblue-700 rounded-l-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-turquoise-400"
              />
              <button className="bg-turquoise-600 hover:bg-turquoise-700 text-white px-4 rounded-r-md text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-darkblue-800 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Take A Peek. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;