import logo from '@/assets/logo.svg';

const Footer = () => {
  return (
    <footer className="border-t-2 border-gray-200">
      <div className="w-full h-35 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <img className="w-10 h-10" src={logo} alt="Logo" />
            <h1>AgroMap</h1>
          </div>

          <p className="text-base text-gray-400">© 2026 AgroMap Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
