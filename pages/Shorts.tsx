
import React, { useEffect, useState } from 'react';
import { fetchYouTubeContent } from '../services/youtube';
import { Video } from '../types';

const Shorts: React.FC = () => {
  const [shorts, setShorts] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShorts = async () => {
      const data = await fetchYouTubeContent("youtube shorts trend 2025", true);
      setShorts(data);
      setLoading(false);
    };
    loadShorts();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className="w-16 h-16 border-8 border-[#6750a4] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xl font-black expressive-serif italic text-[#6750a4] animate-pulse">Loading Vertical Hub...</p>
    </div>
  );

  return (
    <div className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar flex flex-col items-center bg-[#0a0a0a]">
      {shorts.length > 0 ? shorts.map(short => (
        <div key={short.id} className="snap-start flex items-center justify-center min-h-screen w-full py-8">
          <div className="relative aspect-[9/16] h-[calc(100vh-64px)] rounded-[3.5rem] overflow-hidden m3-shadow-2 bg-black border-[12px] border-[#1d1b20] group">
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${short.id}?autoplay=0&controls=0&loop=1&playlist=${short.id}&modestbranding=1`}
              title={short.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            
            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
              <div className="flex items-center gap-4 mb-6 pointer-events-auto">
                <img src={short.channelAvatar} className="w-12 h-12 rounded-2xl border-2 border-white m3-shadow-1" />
                <div className="flex flex-col">
                  <span className="text-white font-black text-lg">@{short.channelName}</span>
                  <span className="text-xs text-white/70 font-bold uppercase tracking-widest">Trending</span>
                </div>
                <button className="ml-4 bg-white text-black px-6 py-2 rounded-full text-xs font-black hover:scale-105 transition-transform">Subscribe</button>
              </div>
              <h3 className="text-white text-xl font-bold line-clamp-2 leading-tight pr-12">{short.title}</h3>
            </div>

            <div className="absolute right-6 bottom-32 flex flex-col gap-8 items-center">
              <div className="flex flex-col items-center gap-2">
                <button className="p-4 bg-white/10 hover:bg-white/25 rounded-[1.5rem] text-white transition-all backdrop-blur-xl border border-white/20 active:scale-90">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
                </button>
                <span className="text-white text-xs font-black uppercase tracking-tighter">Like</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button className="p-4 bg-white/10 hover:bg-white/25 rounded-[1.5rem] text-white transition-all backdrop-blur-xl border border-white/20 active:scale-90">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg>
                </button>
                <span className="text-white text-xs font-black uppercase tracking-tighter">Share</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button className="p-4 bg-white/10 hover:bg-white/25 rounded-[1.5rem] text-white transition-all backdrop-blur-xl border border-white/20 active:scale-90">
                   <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
                <span className="text-white text-xs font-black uppercase tracking-tighter">Save</span>
              </div>
            </div>
          </div>
        </div>
      )) : (
        <div className="flex flex-col items-center justify-center h-full text-white gap-4">
           <h2 className="text-2xl font-black expressive-serif italic">No Shorts found in the orbit.</h2>
           <button onClick={() => window.location.reload()} className="bg-white text-black px-8 py-3 rounded-full font-bold">Retry Fetch</button>
        </div>
      )}
    </div>
  );
};

export default Shorts;
