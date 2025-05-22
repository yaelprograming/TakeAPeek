import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-turquoise-400 to-turquoise-600"></div>
                <div className="absolute inset-[2px] rounded-full bg-white flex items-center justify-center">
                  <span className="text-turquoise-600 font-bold text-lg">P</span>
                </div>
              </div>
              <span className="ml-2 text-2xl font-bold text-darkblue-900 font-display">
                Take A <span className="text-turquoise-600">Peek</span>
              </span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-darkblue-800 hover:text-turquoise-600 transition-colors">Features</a>
            <a href="#gallery" className="text-darkblue-800 hover:text-turquoise-600 transition-colors">Gallery</a>
            <a href="#pricing" className="text-darkblue-800 hover:text-turquoise-600 transition-colors">Pricing</a>
            <Button variant="outline" className="border-turquoise-500 text-turquoise-700 hover:bg-turquoise-50">
              Log in
            </Button>
            <Button className="bg-turquoise-600 hover:bg-turquoise-700 text-white">
              Sign up free
            </Button>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden rounded-md p-2 text-darkblue-800 hover:bg-turquoise-50"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="space-y-1 px-4 py-5">
            <a href="#features" className="block px-3 py-2 text-base font-medium text-darkblue-800 hover:bg-turquoise-50 rounded-md">
              Features
            </a>
            <a href="#gallery" className="block px-3 py-2 text-base font-medium text-darkblue-800 hover:bg-turquoise-50 rounded-md">
              Gallery
            </a>
            <a href="#pricing" className="block px-3 py-2 text-base font-medium text-darkblue-800 hover:bg-turquoise-50 rounded-md">
              Pricing
            </a>
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full border-turquoise-500 text-turquoise-700">
                Log in
              </Button>
              <Button className="w-full bg-turquoise-600 hover:bg-turquoise-700 text-white">
                Sign up free
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;