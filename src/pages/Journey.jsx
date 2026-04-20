import { useState } from 'react';
import { Settings, Sparkles, Book, Lock, Globe, ArrowDownCircle, TreePine } from 'lucide-react';
import { postReflection } from '../api';
import Header from '../components/Header';
import './Journey.css';

const Journey = () => {
  const [reflectionText, setReflectionText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [isPrivate, setIsPrivate] = useState(true);
  const [intent, setIntent] = useState('😊');
  const [showIntentMenu, setShowIntentMenu] = useState(false);

  const intents = ['😊', '🙏', '🤲', '✨', '🤍', '🌙'];

  const handleSave = async () => {
    if (!reflectionText.trim()) return;
    
    setIsSaving(true);
    try {
      const response = await postReflection('user_123', reflectionText);
      if (response.status === 'success') {
        setSavedSuccess(true);
        setReflectionText('');
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <Header 
        rightElement={
          <div className="icon-btn-gray" style={{ backgroundColor: '#2A3634', color: 'white' }}>
            <ArrowDownCircle size={20} />
          </div>
        } 
      />

      <div className="journey-content pb-24">
        {/* Header Section */}
        <section className="sanctuary-header">
          <p className="text-xs text-muted uppercase font-bold tracking-wide">Sanctuary of the Soul</p>
          <h2 className="font-serif italic">Quiet your heart, trace your light.</h2>
          <p className="text-sm text-muted mt-2">
            A private space to witness your growth and nurture the seeds of faith planted within.
          </p>
        </section>

        {/* Growth Map Section */}
        <section className="mt-12">
          <div className="flex justify-between items-end mb-4">
            <h3 className="heading-md italic">Your Growth Map</h3>
            <p className="text-xs text-accent uppercase font-bold cursor-pointer">View Journey Details</p>
          </div>

          <div className="growth-hero-card">
            <div className="hero-circle">
              <div className="badge-top-left"><Sparkles size={16} /></div>
              {/* Using TreePine as a proxy for the 'person under tree' icon from the design */}
              <div className="hero-icon"><TreePine size={48} strokeWidth={1.5} /></div>
              <div className="badge-bottom-right"><Book size={14} /></div>
            </div>
            <h4 className="heading-sm italic mt-2">The Tree of Sincerity</h4>
            <p className="text-xs text-muted mt-1">Level 12 • 48 Days of Mindfulness</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card light">
              <div><Sparkles size={20} color="#A88647" /></div>
              <div>
                <div className="stat-value text-primary">84%</div>
                <div className="text-xs text-muted uppercase tracking-wide mt-1">Consistency</div>
              </div>
            </div>
            <div className="stat-card dark">
              <div>🔥</div>
              <div>
                <div className="stat-value">12</div>
                <div className="text-xs uppercase tracking-wide text-gray-300 mt-1">Day Streak</div>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Reflection Section */}
        <section className="mt-12">
          <div className="flex justify-between items-end mb-4">
            <h3 className="heading-md italic">Daily Reflection</h3>
            <p className="text-xs text-muted italic">October 24th, 2023</p>
          </div>

          <div className="reflection-card">
            <h4 className="font-serif text-xl italic text-primary leading-snug">
              "What is one small blessing today that felt like a quiet conversation with the Divine?"
            </h4>
            
            <textarea 
              className="reflection-input w-full mt-12" 
              placeholder="Pour your heart onto the page..."
              rows={4}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              disabled={isSaving}
            ></textarea>

            <div className="flex gap-4 justify-between items-center mt-6 relative">
              <button 
                className="pill-btn secondary flex items-center gap-2"
                onClick={() => setShowIntentMenu(!showIntentMenu)}
              >
                <span>{intent}</span> Current Intent
              </button>
              
              {showIntentMenu && (
                <div className="absolute top-12 left-0 bg-white border border-[#E2DBD1] rounded-lg shadow-lg p-2 flex gap-2 z-10 animate-fade-in-up">
                  {intents.map(emoji => (
                    <button 
                      key={emoji} 
                      className="p-2 hover:bg-[#F8F5EF] rounded text-lg transition-colors"
                      onClick={() => { setIntent(emoji); setShowIntentMenu(false); }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              <button 
                className="icon-btn-gray" 
                onClick={() => setIsPrivate(!isPrivate)}
                title={isPrivate ? "Private Reflection" : "Shared to Community"}
              >
                {isPrivate ? <Lock size={16} /> : <Globe size={16} color="#1B4341" />}
              </button>
            </div>

            <button 
              className="btn btn-primary w-full mt-6"
              onClick={handleSave}
              disabled={!reflectionText.trim() || isSaving}
            >
              {isSaving ? 'Sealing...' : 'Seal Reflection'}
            </button>
            
            {savedSuccess && (
              <p className="text-accent text-sm text-center mt-4 animate-fade-in">Stored in your sanctuary.</p>
            )}
          </div>
        </section>

        {/* Echoes of Insight */}
        <section className="mt-12">
          <h3 className="heading-md italic mb-4">Echoes of Insight</h3>
          
          <div className="echo-card">
            <div className="quote-mark">"</div>
            <p className="echo-text text-primary">
              The stillness I found during Fajr today was a reminder that the world can wait, but my soul cannot.
            </p>
            <div className="flex justify-between mt-6">
              <span className="text-xs text-muted uppercase">3 Days Ago</span>
              <span className="text-xs text-muted">—</span>
            </div>
          </div>

          <div className="echo-card">
            <div className="quote-mark">"</div>
            <p className="echo-text text-primary">
              Patience isn't just waiting; it's how I behave while I am waiting. Grateful for the lesson in the traffic jam.
            </p>
            <div className="flex justify-between mt-6">
              <span className="text-xs text-muted uppercase">Last Week</span>
              <span className="text-xs text-muted">—</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Journey;
