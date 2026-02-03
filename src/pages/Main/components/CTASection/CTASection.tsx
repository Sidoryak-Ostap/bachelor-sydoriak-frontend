const CTASection = () => {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center bg-primary rounded-2xl py-15">
          <h2 className="font-extrabold text-white text-center mb-5 text-4xl">
            Ready to Modernize Your Farm?
          </h2>
          <p className="text-base text-gray-300 mb-8 text-center">
            Join thousands of farmers using AgroMap to make data-driven <br /> decisions today.
          </p>
          <button className="cursor-pointer bg-white text-primary text-base font-bold rounded-xl py-3 px-8">
            Get Started for Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
