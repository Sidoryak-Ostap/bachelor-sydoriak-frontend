import CTASection from './components/CTASection';
import Features from './components/Features';
import Footer from './components/Footer';
import Header from './components/Header';
import Info from './components/Info';
import Intro from './components/Intro';
import Pricing from './components/Pricing';
import Stats from './components/Stats';

const Main = () => {
  return (
    <div>
      <Header />
      <Intro />
      {/* <Stats /> */}
      <Features />
      <Info />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Main;
