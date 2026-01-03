
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="group flex flex-col gap-3">
      <div className="relative aspect-video rounded-[2rem] overflow-hidden m3-shadow-1 group-hover:m3-shadow-2 transition-all group-hover:scale-[1.02] duration-300">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-lg font-medium">
          {video.duration}
        </div>
      </div>
      
      <div className="flex gap-3 px-1">
        <img 
          src={video.channelAvatar} 
          alt={video.channelName} 
          className="w-10 h-10 rounded-2xl object-cover shrink-0"
        />
        <div className="flex flex-col">
          <h3 className="text-base font-bold text-[#1c1b1f] line-clamp-2 leading-tight group-hover:text-[#6750a4] transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-[#49454f] mt-1 flex items-center gap-1">
            {video.channelName}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </p>
          <p className="text-xs text-[#79747e] font-medium">
            {video.views} views • {video.postedAt}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
