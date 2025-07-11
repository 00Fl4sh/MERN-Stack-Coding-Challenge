import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import LearningPaths from './pages/LearningPaths';
import Videos from './pages/Videos';
import Podcasts from './pages/Podcasts';
import Articles from './pages/Articles';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import LearningPathDetails from './pages/LearningPathDetails';
import VideoPlayerPage from './pages/VideoPlayer';
import PodcastDetails from './pages/PodcastDetails';
import ArticleDetails from './pages/ArticleDetails';

// 404 Page Component
function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Go Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/learning-paths" element={<LearningPaths />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/paths/:id" element={<LearningPathDetails />} />
          <Route path="/video/:id" element={<VideoPlayerPage />} />
          <Route path="/podcast/:id" element={<PodcastDetails />} />
          <Route path="/article/:id" element={<ArticleDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
