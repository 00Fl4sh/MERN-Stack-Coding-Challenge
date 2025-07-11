function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 bg-hero-pattern opacity-20"></div> */}
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-4">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6 animate-slide-up">
          <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
          Join 10,000+ AI learners worldwide
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-600 animate-fade-in">
          Learn AI in Minutes,
          <br />
          <span className="text-secondary-800">Not Months</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-secondary-600 mb-8 max-w-3xl font-inter leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
          Master artificial intelligence with bite-sized lessons, expert-led tutorials, and hands-on projects. 
          From beginners to advanced practitioners.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <button className="px-8 py-4 bg-primary-600 text-white rounded-xl text-lg font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-medium">
            Start Learning Free
          </button>
          <button className="px-8 py-4 bg-white border-2 border-primary-200 text-primary-700 rounded-xl text-lg font-semibold hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 transform hover:scale-105 shadow-soft">
            Explore Courses
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full animate-slide-up" style={{animationDelay: '0.6s'}}>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-secondary-600">Micro-lessons</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
            <div className="text-secondary-600">Expert creators</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
            <div className="text-secondary-600">Active learners</div>
          </div>
        </div>
        
        {/* Featured Creators */}
        <div className="mt-16 animate-slide-up" style={{animationDelay: '0.8s'}}>
          <p className="text-secondary-500 mb-6 font-medium">Trusted by leading AI experts</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-medium">
              AI
            </div>
            <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-medium">
              ML
            </div>
            <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-medium">
              DS
            </div>
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-medium">
              NN
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection; 