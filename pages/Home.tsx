
import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import { Video } from '../types';

interface HomeProps {
  videos: Video[];
  isLoading: boolean;
  onCategoryChange: (cat: string) => void;
  title?: string;
}

const CATEGORIES = ['All', 'Music', 'Gaming', 'Tech', 'Design', 'AI', 'Coding', 'News', 'Movies', 'Fashion'];

const Home: React.FC<HomeProps> = ({ videos, isLoading, onCategoryChange, title }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    onCategoryChange(cat === 'All' ? 'trending' : cat);
  };

  return (
    <div className="p-4 md:p-8 pb-24 max-w-[2000px] mx-auto">
      {title && (
        <h1 className="text-3xl font-black text-[#1c1b1f] expressive-serif italic mb-8 px-2 tracking-tight">
          {title}
        </h1>
      )}
      
      <div className="flex gap-3 overflow-x-auto no-scrollbar mb-10 pb-2 sticky top-0 z-20 bg-[#fdfbff]/80 backdrop-blur-xl py-4 -mx-4 px-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`
              px-6 py-2.5 rounded-[1.25rem] text-sm font-bold whitespace-nowrap transition-all active:scale-90 m3-shadow-1
              ${selectedCategory === cat 
                ? 'bg-[#6750a4] text-white' 
                : 'bg-[#f3f0f5] text-[#49454f] hover:bg-[#ece6f0] border border-transparent hover:border-[#d0bcff]'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8 gap-y-12">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-5">
              <div className="aspect-video bg-[#f3f0f5] rounded-[2.5rem] m3-shadow-1"></div>
              <div className="flex gap-4 px-2">
                <div className="w-12 h-12 bg-[#f3f0f5] rounded-2xl shrink-0"></div>
                <div className="flex-1 space-y-3 pt-1">
                  <div className="h-4 bg-[#f3f0f5] rounded-full w-full"></div>
                  <div className="h-3 bg-[#f3f0f5] rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8 gap-y-12">
          {videos.length > 0 ? (
            videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-24 h-24 bg-[#f3f0f5] rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-[#49454f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-[#1c1b1f] expressive-serif italic">No content found</h2>
              <p className="text-[#49454f] font-medium max-w-xs mx-auto">Gemini couldn't find videos for this category. Try searching for something specific!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
