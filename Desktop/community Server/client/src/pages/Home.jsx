// import HeroSection from '../components/HeroSection';
import TrendingPaths from '../components/TrendingPaths';
import LatestVideos from '../components/LatestVideos';
import TopPodcasts from '../components/TopPodcasts';
import RecentArticles from '../components/RecentArticles';
import SuggestedForYou from '../components/SuggestedForYou';
import CommunityFeed from '../components/CommunityFeed';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="font-playfair bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-50 to-blue-100 py-20 mb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight drop-shadow-lg">AI Minute: Learn, Grow, Connect</h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl font-inter">Your premium hub for AI learning paths, expert videos, podcasts, and a thriving community. Start your journey today!</p>
          <a href="#trending" className="inline-block px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-full shadow hover:bg-primary-700 transition-all">Explore Trending Paths</a>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-100/40 to-transparent" />
      </section>

      {/* Trending Paths */}
      <section id="trending" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-primary-500 pl-4">Trending Learning Paths</h2>
        <TrendingPaths />
      </section>

      {/* Latest Videos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-primary-500 pl-4">Latest Videos</h2>
        <LatestVideos />
      </section>

      {/* Top Podcasts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-primary-500 pl-4">Top Podcasts</h2>
        <TopPodcasts />
      </section>

      {/* Recent Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-primary-500 pl-4">Recent Articles</h2>
        <RecentArticles />
      </section>

      {/* Suggested For You */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-primary-500 pl-4">Suggested For You</h2>
        <SuggestedForYou />
      </section>

      {/* Community Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-primary-500 pl-4">Community Feed</h2>
        <CommunityFeed />
      </section>

      <Footer />
    </div>
  );
}

export default Home; 