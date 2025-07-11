import { useNavigate } from 'react-router-dom';
import { getAllLearningPaths } from '../data/learningPaths';

function TrendingPaths() {
  const navigate = useNavigate();
  const trendingPaths = getAllLearningPaths();

  return (
    <section className="py-16 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        {/* <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary-900 mb-4 font-playfair">
            Trending Learning Paths
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto font-inter">
            Master AI with structured learning paths created by industry experts
          </p>
        </div> */}

        {/* Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingPaths.map((path) => (
            <div key={path.id} className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 transform hover:-translate-y-2 border border-secondary-100 overflow-hidden">
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {path.title}
                    </h3>
                    <p className="text-secondary-600 mb-3">by {path.creator}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium text-secondary-700">{path.rating}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                    {path.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    path.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    path.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {path.difficulty}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-secondary-600 mb-2">
                    <span>{path.steps} steps</span>
                    <span>{path.progress}% complete</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{width: `${path.progress}%`}}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-secondary-500">
                  <span>{path.students} students enrolled</span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    {path.duration}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gradient-to-r from-secondary-50 to-white border-t border-secondary-100">
                <button
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-soft"
                  onClick={() => navigate(`/paths/${path.id}`)}
                >
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 bg-white border-2 border-primary-200 text-primary-700 rounded-xl font-semibold hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 transform hover:scale-105 shadow-soft">
            View All Learning Paths
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default TrendingPaths; 