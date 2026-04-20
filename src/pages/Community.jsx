import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageCircle, User, PenTool, Share2 } from 'lucide-react';
import Header from '../components/Header';
import './Community.css';

const MOCK_POSTS = [
  {
    id: 1,
    author: "Anonymous Traveler",
    time: "2 hours ago",
    content: "The stillness I found during Fajr today was a reminder that the world can wait, but my soul cannot. The hardest part is maintaining this peace when the emails start coming in.",
    likes: 24,
    comments: 3,
    isLiked: false
  },
  {
    id: 2,
    author: "Soulseeker",
    time: "5 hours ago",
    content: "Patience isn't just waiting; it's how I behave while I am waiting. Grateful for the lesson in the traffic jam today. Sometimes delays are protections.",
    likes: 89,
    comments: 12,
    isLiked: true
  },
  {
    id: 3,
    author: "Anonymous Traveler",
    time: "1 day ago",
    content: "I finally finished the chapter I started three weeks ago. Consistency > Intensity. May Allah accept our small, persistent efforts.",
    likes: 156,
    comments: 8,
    isLiked: false
  }
];

const Community = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(MOCK_POSTS);

  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="page-container animate-fade-in">
      <Header />

      <div className="community-content pb-24">
        {/* Header Section */}
        <section className="community-header">
          <p className="text-xs text-muted uppercase font-bold tracking-wide">The Ummah</p>
          <h2 className="italic">Global Sanctuary</h2>
          <p className="text-sm text-muted mt-2 max-w-[300px] mx-auto">
            Read the echoes of insight from fellow travelers on the path.
          </p>
        </section>

        {/* Call to Action */}
        <section className="mt-8">
          <div className="share-cta-card cursor-pointer" onClick={() => navigate('/reflect')}>
            <div>
              <h3 className="text-primary font-medium">Add Your Echo</h3>
              <p className="text-xs text-muted mt-1">Share a reflection anonymously</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <PenTool size={18} color="#FFF" />
            </div>
          </div>
        </section>

        {/* Feed */}
        <section className="community-feed mt-8">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-author">
                  <div className="author-avatar">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary">{post.author}</h4>
                    <span className="text-xs text-muted">{post.time}</span>
                  </div>
                </div>
                <button className="icon-btn-clear"><Share2 size={16} color="#C4C9C8" /></button>
              </div>

              <p className="post-text italic">
                "{post.content}"
              </p>

              <div className="post-footer">
                <button 
                  className={`action-btn ${post.isLiked ? 'liked animate-pulse-quick' : 'unliked'}`}
                  onClick={() => toggleLike(post.id)}
                >
                  <Sparkles size={18} />
                  <span>{post.likes}</span>
                </button>

                <button className="action-btn unliked">
                  <MessageCircle size={18} />
                  <span>{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Community;
