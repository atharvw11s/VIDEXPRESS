
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import VideoWatch from './pages/VideoWatch';
import Shorts from './pages/Shorts';
import { Video } from './types';
import { fetchYouTubeContent } from './services/youtube';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);

  const loadContent = useCallback(async (query: string) => {
    setIsLoading(true);
    // Explicitly ask for videos and channels in the prompt via the service
    const data = await fetchYouTubeContent(query || "trending today");
    setVideos(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadContent("");
  }, [loadContent]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    loadContent(query);
  };

  const handleSignIn = () => {
    setUser({
      name: "Pro User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    });
  };

  return (
    <HashRouter>
      <div className="flex flex-col h-screen overflow-hidden bg-[#fdfbff] selection:bg-[#e8def8] selection:text-[#1d192b]">
        <Header 
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
          onSearch={handleSearch}
          user={user}
          onSignIn={handleSignIn}
        />
        
        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar isOpen={isSidebarOpen} />
          
          <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
            <Routes>
              <Route path="/" element={<Home videos={videos} isLoading={isLoading} onCategoryChange={loadContent} />} />
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/subs" element={user ? <Home videos={videos.slice().reverse()} isLoading={isLoading} onCategoryChange={loadContent} title="Subscriptions" /> : <Navigate to="/" />} />
              <Route path="/library" element={user ? <Home videos={videos.slice(0, 4)} isLoading={isLoading} onCategoryChange={loadContent} title="Your Library" /> : <Navigate to="/" />} />
              <Route path="/watch/:videoId" element={<VideoWatch allVideos={videos} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
