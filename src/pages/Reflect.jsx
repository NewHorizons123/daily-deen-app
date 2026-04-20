import { useState } from 'react';
import { Sparkles, Lock, Globe } from 'lucide-react';
import { postReflection } from '../api';
import Header from '../components/Header';
import './Reflect.css';

const Reflect = () => {
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
        // Hide success message after 3 seconds
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save reflection:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <Header isProfileOnLeft={true} rightElement={<div className="icon-btn-small">⚙️</div>} />

      <div className="reflect-content pb-24">
        <section className="prompt-section mt-6">
          <h2 className="prompt-text">
            "What moment today brought you a sense of quiet gratitude, and how did it soften your heart?"
          </h2>
          <textarea 
            className="reflection-input mt-8" 
            placeholder="Pour your heart onto the page..."
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            disabled={isSaving}
          ></textarea>
          
          <div className="reflection-actions mt-4 flex gap-4 justify-center items-center relative">
            <button 
              className="pill-btn secondary flex items-center gap-2"
              onClick={() => setShowIntentMenu(!showIntentMenu)}
            >
              <span>{intent}</span> Current Intent
            </button>
            
            {showIntentMenu && (
              <div className="absolute top-12 left-[50%] translate-x-[-50%] bg-white border border-[#E2DBD1] rounded-lg shadow-lg p-2 flex gap-2 z-10 animate-fade-in-up">
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
            className="btn btn-primary w-full mt-6 flex justify-center"
            onClick={handleSave}
            disabled={!reflectionText.trim() || isSaving}
          >
            {isSaving ? 'Sealing...' : 'Seal Reflection'}
          </button>
          
          {savedSuccess && (
            <p className="text-accent text-sm text-center mt-4 animate-fade-in">Reflection safely stored in your sanctuary.</p>
          )}
        </section>

        <section className="growth-map mt-12">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="heading-lg">Growth Map</h2>
              <p className="text-sm text-muted">Tracking your spiritual constellations</p>
            </div>
            <div className="stage-badge">
              <Sparkles size={12} />
              <span>LUMINOUS STAGE</span>
            </div>
          </div>

          <div className="map-card mt-6">
            <div className="constellation-bg"></div>
            <div className="map-content">
              <div className="node active"></div>
              <p className="text-xs uppercase mt-2 text-gold">GRATITUDE • PATIENCE</p>
              <p className="text-xs text-muted-light mt-8">LAST PULSE: 2 HOURS | 4 REFLECTIONS THIS CYCLE</p>
            </div>
          </div>
        </section>

        <section className="past-reflections mt-12">
          <h2 className="heading-lg mb-6">Past Reflections</h2>
          
          <div className="reflection-item">
            <p className="text-xs text-accent uppercase font-bold">OCTOBER 14, 2023</p>
            <p className="text-xs text-muted mb-2">REF: D-8742-A</p>
            <h3 className="heading-sm mb-2">On the weight of stillness</h3>
            <p className="text-body text-muted line-clamp-3">
              The rain began just as the Fajr call concluded. There is a specific kind of peace in the world when it is wet and dark, and everyone else is...
            </p>
          </div>

          <div className="reflection-item mt-8">
            <p className="text-xs text-accent uppercase font-bold">OCTOBER 12, 2023</p>
            <p className="text-xs text-muted mb-2">REF: D-8739-B</p>
            <h3 className="heading-sm mb-2">Navigating the digital noise</h3>
            <p className="text-body text-muted line-clamp-3">
              Today was a challenge. The phone felt heavy. I realized how much my spiritual heart is affected by the constant stream of...
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Reflect;
