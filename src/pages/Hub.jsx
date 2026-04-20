import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Lock, BookOpen } from 'lucide-react';
import { fetchDailyWisdom, fetchUserStreak } from '../api';
import Header from '../components/Header';
import './Hub.css';

const Hub = () => {
  const navigate = useNavigate();
  const [wisdom, setWisdom] = useState({ quote: '', source: '', loading: true });
  const [streak, setStreak] = useState({ activeStreak: 0, daysToMilestone: 0, loading: true });

  useEffect(() => {
    const loadData = async () => {
      // Fetch Daily Wisdom
      const wisdomData = await fetchDailyWisdom();
      setWisdom({ ...wisdomData, loading: false });

      // Fetch User Streak
      const streakData = await fetchUserStreak('user_123');
      setStreak({ ...streakData, loading: false });
    };

    loadData();
  }, []);

  return (
    <div className="page-container animate-fade-in">
      <Header />

      <div className="hub-content">
        {/* Daily Wisdom Card */}
        <section className="wisdom-card">
          <p className="text-xs text-accent">DAILY WISDOM</p>
          {wisdom.loading ? (
            <div className="mt-4 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : (
            <>
              <h2 className="wisdom-quote">"{wisdom.quote}"</h2>
              <p className="wisdom-source">— {wisdom.source}</p>
            </>
          )}
          <button 
            className="btn btn-primary mt-4"
            onClick={() => navigate('/reflect')}
          >
            Reflect Further
          </button>
        </section>

        {/* Active Streak Card */}
        <section className="streak-card card mt-4">
          <div className="streak-header flex justify-between items-center">
            <div className="flame-icon">🔥</div>
            <p className="text-xs text-accent">ACTIVE STREAK</p>
          </div>
          <div className="streak-stats mt-4 flex items-center gap-2">
            <span className="streak-number">
              {streak.loading ? '-' : streak.activeStreak}
            </span>
            <span className="text-body text-muted italic">Days</span>
          </div>
          <div className="progress-bar-container mt-4">
            <div 
              className="progress-bar-fill" 
              style={{ width: streak.loading ? '0%' : '70%', transition: 'width 1s ease-in-out' }}
            ></div>
          </div>
          <p className="text-xs text-muted mt-4 uppercase">
            Keep going soulseeker, you're {streak.loading ? '-' : streak.daysToMilestone} days from a milestone.
          </p>
        </section>

        {/* Your Path */}
        <section className="path-section mt-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="heading-lg italic">Your Path</h2>
              <p className="text-sm text-muted">Guided by Light, step by step.</p>
            </div>
            <button className="icon-btn">📈</button>
          </div>

          <div className="timeline mt-8">
            <div className="timeline-item completed right">
              <div className="timeline-node"><Check size={16} /></div>
              <div className="timeline-content">
                <h3 className="italic">Fajr Prayer</h3>
                <p className="text-xs text-accent">COMPLETED</p>
              </div>
            </div>

            <div className="timeline-item completed left">
              <div className="timeline-node"><Check size={16} /></div>
              <div className="timeline-content">
                <h3 className="italic">Daily Dhikr</h3>
                <p className="text-xs text-accent">COMPLETED</p>
              </div>
            </div>

            <div className="timeline-item active center cursor-pointer" onClick={() => navigate('/library')}>
              <div className="timeline-node large gold"><BookOpen size={24} color="#FFF" /></div>
              <div className="timeline-content center-content mt-4">
                <h3>Quran Reading</h3>
                <p className="text-xs text-muted">NEXT UP: 15 MINS</p>
              </div>
            </div>

            <div className="timeline-item locked right mt-8">
              <div className="timeline-node"><Lock size={16} /></div>
              <div className="timeline-content">
                <h3 className="italic text-muted">Isha Reflection</h3>
                <p className="text-xs text-muted">LOCKED</p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Cards */}
        <div className="action-cards mt-8 flex-col gap-4">
          <div className="card simple-card cursor-pointer" onClick={() => navigate('/reflect')}>
            <div className="card-icon">🤔</div>
            <h3 className="italic heading-sm mt-2">Deep Thought</h3>
            <p className="text-sm text-muted mt-2">Consider how gratitude shifts your perception of daily challenges.</p>
          </div>

          <div className="card simple-card">
            <div className="card-icon">✨</div>
            <h3 className="italic heading-sm mt-2">Focus Point</h3>
            <p className="text-sm text-muted mt-2">Concentrate on the meaning of each word during your next prayer.</p>
          </div>

          <div className="card simple-card cursor-pointer" onClick={() => navigate('/community')}>
            <div className="card-icon">💬</div>
            <h3 className="italic heading-sm mt-2">Community</h3>
            <p className="text-sm text-muted mt-2">See what fellow travelers are reflecting on today.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hub;
