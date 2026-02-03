import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <Menu className="w-8 h-8 text-primary cursor-pointer" onClick={toggleMenu} />

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={toggleMenu} />
      )}

      <div
        className={`
        fixed top-0 right-0 h-screen w-80 bg-white z-50 shadow-2xl p-6
        transition-transform duration-300 ease-in-out transform
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      >
        <div className="flex justify-end mb-8">
          <X
            className="w-8 h-8 text-gray-500 cursor-pointer hover:text-primary"
            onClick={toggleMenu}
          />
        </div>

        <nav className="flex flex-col gap-6 font-semibold text-lg text-gray-800">
          <a href="#features" onClick={toggleMenu} className="hover:text-primary">
            Features
          </a>
          <a href="#solutions" onClick={toggleMenu} className="hover:text-primary">
            Solutions
          </a>
          <a href="#pricing" onClick={toggleMenu} className="hover:text-primary">
            Pricing
          </a>
          <a href="#resources" onClick={toggleMenu} className="hover:text-primary">
            Resources
          </a>
        </nav>

        <div className="absolute bottom-10 left-6 right-6 flex flex-col gap-4">
          <button className="py-3 border border-primary text-primary rounded-xl font-bold">
            Log in
          </button>
          <button className="py-3 bg-primary text-white rounded-xl font-bold">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
