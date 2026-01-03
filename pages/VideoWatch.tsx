
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Video, Comment } from '../types';

interface VideoWatchProps {
  allVideos: Video[];
}

const MOCK_COMMENTS: Comment[] = [
  { id: '1', author: 'Markus T.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark', text: 'This design is actually so much better than the current one. M3 forever!', likes: 120, time: '2 hours ago' },
  { id: '2', author: 'Sarah J.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', text: 'Can anyone tell me what song is playing at 5:30?', likes: 45, time: '5 hours ago' },
  { id: '3', author: 'Tech Enthusiast', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tech', text: 'Great content, subbed for more!', likes: 890, time: '1 day ago' },
];

const VideoWatch: React.FC<VideoWatchProps> = ({ allVideos }) => {
  const { videoId } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(MOCK_COMMENTS);

  useEffect(() => {
    const foundVideo = allVideos.find(v => v.id === videoId) || {
        id: videoId || '',
        title: 'Video Title Loading...',
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        channelName: 'Channel Name',
        channelAvatar: `https://api.dicebear.com/7.x/initials/svg?seed=${videoId}`,
        views: '1M',
        postedAt: 'Recently',
        duration: '10:00',
        description: 'No description available for this content.',
        category: 'Tech'
    } as Video;

    setVideo(foundVideo);
    window.scrollTo(0, 0);
  }, [videoId, allVideos]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'Pro User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      text: commentText,
      likes: 0,
      time: 'Just now'
    };
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  if (!video) return null;

  return (
    <div className="p-4 md:p-6 flex flex-col xl:flex-row gap-8 max-w-[1800px] mx-auto">
      <div className="flex-1 space-y-6">
        {/* PLAYER - Fixed to prevent Error 153 */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black m3-shadow-2 relative">
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="space-y-4">
          <h1 className="text-xl md:text-2xl font-bold text-[#1c1b1f] tracking-tight leading-tight">
            {video.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={video.channelAvatar} className="w-12 h-12 rounded-full m3-shadow-1 border border-white" />
              <div>
                <p className="font-bold text-[#1c1b1f]">{video.channelName}</p>
                <p className="text-xs text-[#49454f]">1.24M subscribers</p>
              </div>
              <button className="ml-4 bg-[#1c1b1f] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#49454f] transition-all">
                Subscribe
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-[#f3f0f5] rounded-full overflow-hidden border border-[#e7e0ec]">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#ece6f0] border-r border-[#e7e0ec]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.704a2 2 0 011.94 2.515l-1.203 4.812A2 2 0 0117.501 19H5a1 1 0 01-1-1v-8a1 1 0 01.447-.894l4.472-2.236L10.917 3.5a1.246 1.246 0 012.192 1.103L12.662 8H14v2z" /></svg>
                  <span className="text-sm font-bold">124K</span>
                </button>
                <button className="px-4 py-2 hover:bg-[#ece6f0]">
                  <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.704a2 2 0 011.94 2.515l-1.203 4.812A2 2 0 0117.501 19H5a1 1 0 01-1-1v-8a1 1 0 01.447-.894l4.472-2.236L10.917 3.5a1.246 1.246 0 012.192 1.103L12.662 8H14v2z" /></svg>
                </button>
              </div>
              <button className="bg-[#f3f0f5] px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#ece6f0]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Share
              </button>
            </div>
          </div>

          <div 
            onClick={() => setIsDescExpanded(!isDescExpanded)}
            className={`bg-[#f3f0f5] rounded-2xl p-4 cursor-pointer transition-all hover:bg-[#ece6f0] ${isDescExpanded ? 'h-auto' : 'h-24 overflow-hidden relative'}`}
          >
            <p className="font-bold text-sm mb-1">{video.views} views • {video.postedAt}</p>
            <p className="text-sm text-[#49454f] whitespace-pre-wrap leading-relaxed">
              {video.description}
            </p>
            {!isDescExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#f3f0f5] to-transparent flex items-end justify-center">
                <span className="font-bold text-xs uppercase text-[#6750a4]">Show More</span>
              </div>
            )}
            {isDescExpanded && (
                <button className="mt-4 text-xs font-bold uppercase text-[#6750a4] block">Show Less</button>
            )}
          </div>

          {/* COMMENTS SECTION */}
          <div className="pt-6 space-y-6">
            <div className="flex items-center gap-8">
              <h3 className="text-xl font-bold">{comments.length} Comments</h3>
              <button className="flex items-center gap-2 text-sm font-bold">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                Sort by
              </button>
            </div>

            <form onSubmit={handleAddComment} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#6750a4] flex items-center justify-center text-white font-bold shrink-0">U</div>
              <div className="flex-1 space-y-2">
                <input 
                  type="text" 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full bg-transparent border-b border-[#e7e0ec] py-1 focus:border-[#6750a4] outline-none transition-all placeholder-[#49454f]"
                />
                {commentText && (
                  <div className="flex justify-end gap-3 pt-1">
                    <button type="button" onClick={() => setCommentText('')} className="px-4 py-1.5 text-sm font-bold hover:bg-[#f3f0f5] rounded-full">Cancel</button>
                    <button type="submit" className="px-4 py-1.5 text-sm font-bold bg-[#6750a4] text-white rounded-full">Comment</button>
                  </div>
                )}
              </div>
            </form>

            <div className="space-y-6">
              {comments.map(c => (
                <div key={c.id} className="flex gap-4">
                  <img src={c.avatar} className="w-10 h-10 rounded-full shrink-0" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">@{c.author.replace(' ', '').toLowerCase()}</span>
                      <span className="text-xs text-[#49454f]">{c.time}</span>
                    </div>
                    <p className="text-sm text-[#1c1b1f] leading-normal">{c.text}</p>
                    <div className="flex items-center gap-4 pt-2">
                      <button className="flex items-center gap-1 text-xs hover:bg-[#f3f0f5] p-1 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.704a2 2 0 011.94 2.515l-1.203 4.812A2 2 0 0117.501 19H5a1 1 0 01-1-1v-8a1 1 0 01.447-.894l4.472-2.236L10.917 3.5a1.246 1.246 0 012.192 1.103L12.662 8H14v2z" /></svg>
                        {c.likes}
                      </button>
                      <button className="text-xs hover:bg-[#f3f0f5] p-1 rounded">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-[400px] space-y-4 shrink-0">
        <h3 className="font-bold text-[#1c1b1f] px-2">Up Next</h3>
        <div className="flex flex-col gap-4">
          {allVideos.filter(v => v.id !== videoId).map(v => (
            <Link 
                to={`/watch/${v.id}`} 
                key={v.id} 
                className="flex gap-3 group p-2 rounded-2xl hover:bg-[#f3f0f5] transition-all"
            >
              <div className="relative w-40 aspect-video rounded-xl overflow-hidden shrink-0 m3-shadow-1">
                <img src={v.thumbnail} className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                  {v.duration}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-bold text-[#1c1b1f] line-clamp-2 leading-tight">
                  {v.title}
                </h4>
                <p className="text-xs text-[#49454f] mt-1">{v.channelName}</p>
                <p className="text-[10px] text-[#79747e]">{v.views} views • {v.postedAt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoWatch;
