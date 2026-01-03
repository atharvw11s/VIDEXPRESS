
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
  onSearch: (query: string) => void;
  user: { name: string; avatar: string } | null;
  onSignIn: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, onSearch, user, onSignIn }) => {
  const [localQuery, setLocalQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localQuery.trim()) return;
    onSearch(localQuery);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <header className="h-16 md:h-20 flex items-center justify-between px-4 md:px-6 z-50 bg-[#fdfbff]/95 backdrop-blur-md sticky top-0 border-b border-[#f3f0f5]">
      <div className="flex items-center gap-2 md:gap-6">
        <button 
          onClick={toggleSidebar}
          className="p-2 md:p-3 hover:bg-[#f3f0f5] rounded-full transition-all active:scale-90"
        >
          <svg className="w-6 h-6 text-[#1c1b1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div 
          onClick={() => {
            setLocalQuery('');
            onSearch('');
            navigate('/');
          }} 
          className="flex items-center gap-2 md:gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 md:w-10 md:h-10 bg-[#6750a4] rounded-[0.75rem] flex items-center justify-center m3-shadow-2">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3L10 15z" />
            </svg>
          </div>
          <span className="hidden sm:block text-xl font-bold text-[#1c1b1f] expressive-serif italic">VidExpress</span>
        </div>
      </div>

      <form 
        onSubmit={handleSearchSubmit}
        className="flex-1 max-w-2xl mx-4 md:mx-12 group"
      >
        <div className="flex items-center w-full bg-[#f3f0f5] border-2 border-transparent group-focus-within:border-[#6750a4] group-focus-within:bg-white m3-shadow-1 rounded-full px-4 md:px-6 py-2 md:py-2.5 transition-all">
          <input 
            type="text" 
            placeholder="Search videos or channels..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[#1c1b1f] placeholder-[#49454f] font-medium"
          />
          <button type="submit" className="p-1 hover:bg-[#ece6f0] rounded-full ml-2">
            <svg className="w-5 h-5 text-[#49454f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2 md:gap-4">
        {user ? (
          <div className="flex items-center gap-3">
             <button className="hidden sm:block p-2 hover:bg-[#f3f0f5] rounded-full text-[#1c1b1f]">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
             </button>
             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#6750a4] cursor-pointer hover:scale-105 transition-all">
               <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
             </div>
          </div>
        ) : (
          <button 
            onClick={onSignIn}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#e7e0ec] text-[#6750a4] font-bold text-sm hover:bg-[#f3f0f5] transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
