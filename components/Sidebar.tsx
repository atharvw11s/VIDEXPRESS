
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: '/' },
    { name: 'Shorts', icon: 'M13 10V3L4 14h7v7l9-11h-7z', path: '/shorts' },
    { name: 'Subscriptions', icon: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2', path: '/subs' },
    { name: 'Library', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', path: '/library' },
  ];

  if (!isOpen) {
    return (
      <aside className="w-24 hidden md:flex flex-col items-center pt-4 gap-6 bg-[#fdfbff] border-r border-[#f3f0f5]">
        {menuItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center p-3 rounded-[1.5rem] w-16 transition-all active:scale-90
              ${isActive ? 'bg-[#e8def8] text-[#1d192b] m3-shadow-1' : 'hover:bg-[#f3f0f5] text-[#49454f]'}
            `}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={item.icon} />
            </svg>
            <span className="text-[10px] mt-1.5 font-black uppercase tracking-tighter">{item.name}</span>
          </NavLink>
        ))}
      </aside>
    );
  }

  return (
    <aside className="w-72 hidden lg:flex flex-col pt-4 bg-[#fdfbff] px-4 gap-2 border-r border-[#f3f0f5]">
      {menuItems.map((item) => (
        <NavLink 
          key={item.name} 
          to={item.path}
          className={({ isActive }) => `
            flex items-center gap-5 px-6 py-4 rounded-full transition-all text-sm font-black tracking-tight
            ${isActive ? 'bg-[#e8def8] text-[#1d192b] m3-shadow-1' : 'hover:bg-[#f3f0f5] text-[#49454f] active:scale-95'}
          `}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={item.icon} />
          </svg>
          {item.name}
        </NavLink>
      ))}
      <hr className="my-6 border-[#e7e0ec] mx-4" />
      <div className="px-6 py-2">
        <h3 className="text-xs font-black text-[#49454f] mb-6 uppercase tracking-[0.2em] opacity-60">Trending Hub</h3>
        <div className="flex flex-col gap-2">
          {['Music', 'Gaming', 'Tech', 'Fashion', 'News'].map(tag => (
             <button key={tag} className="flex items-center gap-5 px-6 py-3.5 rounded-full hover:bg-[#f3f0f5] transition-all text-sm font-bold text-[#49454f] active:scale-95">
                <div className="w-2 h-2 rounded-full bg-[#6750a4]"></div>
                {tag}
             </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
