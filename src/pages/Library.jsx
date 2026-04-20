import { useState, useRef, useEffect } from 'react';
import { Search, Send, Settings, ShieldQuestion, ChevronRight } from 'lucide-react';
import { fetchAIResponse } from '../api';
import Header from '../components/Header';
import './Library.css';

const Library = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: 'Asalamu alaikum. I am looking for guidance on ethical investment practices in modern finance. Where should I begin?',
      time: '10:12 AM'
    },
    {
      id: 2,
      sender: 'ai',
      text: 'Wa Alaikum Asalam. Welcome to the sanctuary of knowledge. Regarding modern finance, the tradition emphasizes three core pillars: avoidance of Riba (usury), clarity in contracts, and ethical social utility.',
      quote: '"O you who have believed, fear Allah and give up what remains [due to you] of interest, if you should be believers." — Surah Al-Baqarah 2:278',
      recommendation: 'I recommend beginning with the works of Mufti Taqi Usmani, particularly "An Introduction to Islamic Finance." This text bridges classical jurisprudence with contemporary economic structures.',
      followUp: 'Would you like me to summarize the principles of Shariah-compliant equity screening or delve into the concept of purification of earnings?'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  
  const RESOURCE_DETAILS = {
    book: {
      summary: "This foundational text covers the Islamic perspective comprehensively, drawing from the Quran, authentic Sunnah, and classical scholarly opinion. It provides a structured approach to understanding the rulings, ethics, and wisdom behind this pillar of Islamic life.",
      keyPoints: ["Grounded in Quran & Sunnah", "Classical scholarly consensus", "Modern application"],
      readTime: "~45 min read"
    },
    fatwa: {
      summary: "This contemporary fatwa addresses the modern context with nuance and rigor, examining evidence from across the four madhabs. It provides clear, actionable guidance for Muslims navigating this issue today.",
      keyPoints: ["Comparative madhab analysis", "Contemporary relevance", "Scholarly consensus"],
      readTime: "~15 min read"
    },
    lecture: {
      summary: "In this lecture, the scholar draws on deep classical learning to illuminate this topic for a modern audience. Using stories and practical wisdom, the content brings centuries of Islamic scholarship alive in a compelling and accessible way.",
      keyPoints: ["Engaging storytelling", "Classical wisdom applied", "Q&A included"],
      readTime: "~60 min listen"
    }
  };
  
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsAiTyping(true);

    try {
      // Call Scholar AI
      const aiRes = await fetchAIResponse(text);
      
      const newAiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiRes.response,
        quote: aiRes.relatedVerses ? `Related reference: ${aiRes.relatedVerses.join(', ')}` : null
      };

      setMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
      console.error("AI Error", error);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleSearch = (queryStr) => {
    // If called without string argument (e.g. from onClick without arrow func), use searchQuery state
    const query = typeof queryStr === 'string' ? queryStr : searchQuery;
    if (!query || !query.trim()) return;
    
    setSearchQuery(query);
    setIsSearching(true);
    // Simulate searching the library with dynamic mock data
    setTimeout(() => {
      const mockResults = [
        { id: 1, title: `Introduction to Islamic ${query}`, scholar: "Mufti Taqi Usmani", type: "Book", icon: "📖", detailKey: 'book' },
        { id: 2, title: `Contemporary rulings on ${query}`, scholar: "Dr. Hatem al-Haj", type: "Fatwa", icon: "⚖️", detailKey: 'fatwa' },
        { id: 3, title: `The Ethics of ${query} in the Modern Age`, scholar: "Shaykh Hamza Yusuf", type: "Lecture", icon: "🎧", detailKey: 'lecture' }
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleDomainClick = (domain) => {
    handleSearch(domain);
    // Scroll to top so user sees the results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="page-container animate-fade-in">
        <Header 
          isProfileOnLeft={true} 
          rightElement={<div className="icon-btn-small"><Settings size={24} color="#123735" /></div>} 
        />

        <div className="library-content pb-24">
          <section className="wisdom-header mt-6">
            <h2 className="heading-lg">Seek Wisdom</h2>
            <p className="text-body text-muted mt-2">
              Explore the vast landscape of Islamic knowledge with scholarly precision.
            </p>
            
            <div className="search-bar mt-6">
              <Search size={20} color="#727B79" />
              <input 
                type="text" 
                placeholder="Search the library..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="search-btn" onClick={() => handleSearch()} disabled={isSearching}>
                {isSearching ? '...' : 'Search'}
              </button>
            </div>
            
            {searchResults && searchResults.length > 0 && (
              <div className="mt-8 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-primary font-bold">Results for "{searchQuery}"</h3>
                  <button className="text-xs text-accent uppercase font-bold" onClick={() => setSearchResults(null)}>Clear</button>
                </div>
                
                <div className="resource-cards-list">
                  {searchResults.map(result => (
                    <div 
                      key={result.id} 
                      className="resource-card"
                      onClick={() => setSelectedResource(result)}
                    >
                      <div className="resource-icon">{result.icon}</div>
                      <div className="resource-info">
                        <h4 className="resource-title">{result.title}</h4>
                        <p className="resource-scholar">{result.scholar}</p>
                        <span className="resource-tag">{result.type}</span>
                      </div>
                      <ChevronRight size={18} color="#B8965B" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="consultation mt-12">
            <div className="flex justify-between items-end">
              <h2 className="heading-md italic">Spiritual Consultation</h2>
              <p className="text-xs text-accent uppercase font-bold">SCHOLAR AI BETA</p>
            </div>

            <div className="chat-interface mt-6">
              <div className="chat-history" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {messages.map((msg) => (
                  <div key={msg.id}>
                    {msg.sender === 'user' ? (
                      <div className="chat-bubble user-bubble mb-4">
                        <p>{msg.text}</p>
                        <span className="timestamp">{msg.time}</span>
                      </div>
                    ) : (
                      <div className="chat-bubble ai-bubble mb-4 mt-4">
                        <div className="ai-header">
                          <div className="ai-icon"><ShieldQuestion size={16} /></div>
                          <span className="ai-name">The Librarian</span>
                        </div>
                        <h3 className="heading-sm mt-4">Wa Alaikum Asalam.</h3>
                        <p className="mt-2 text-body" dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                        
                        {msg.quote && (
                          <div className="quote-box mt-4">
                            <p className="italic text-muted">{msg.quote}</p>
                          </div>
                        )}

                        {msg.recommendation && (
                          <p className="mt-4 text-body" dangerouslySetInnerHTML={{ __html: msg.recommendation }}></p>
                        )}
                        
                        {msg.followUp && (
                          <p className="mt-4 text-body">{msg.followUp}</p>
                        )}

                        {msg.id === 2 && (
                          <div className="chat-actions mt-6 flex gap-2">
                            <button 
                              className="pill-btn primary"
                              onClick={() => handleSendMessage("Please summarize Shariah-compliant equity screening.")}
                            >
                              Shariah Screening
                            </button>
                            <button 
                              className="pill-btn secondary"
                              onClick={() => handleSendMessage("Tell me about Zakat on Stocks.")}
                            >
                              Zakat on Stocks
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {isAiTyping && (
                  <div className="chat-bubble ai-bubble mb-4 mt-4 animate-pulse">
                    <div className="ai-header">
                      <div className="ai-icon"><ShieldQuestion size={16} /></div>
                      <span className="ai-name">The Librarian is writing...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="chat-input-container mt-6">
                <div className="chat-input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Inquire with the Librarian..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <button 
                    className="send-btn" 
                    onClick={() => handleSendMessage()} 
                    disabled={isAiTyping || !inputValue.trim()}
                  >
                    <Send size={18} color="#FFF" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="domains mt-12">
            <h2 className="heading-md italic mb-6">Knowledge Domains</h2>
            
            <div className="domain-cards flex-col gap-4">
              <div className="domain-card dark cursor-pointer" onClick={() => handleDomainClick('Family')}>
                <div className="domain-icon">👥</div>
                <h3 className="heading-sm mt-4">Family</h3>
                <p className="text-sm mt-2">Nurturing the foundational unit of the Ummah with prophetic compassion.</p>
              </div>

              <div className="domain-card light cursor-pointer" onClick={() => handleDomainClick('Ethics')}>
                <div className="domain-icon">⚖️</div>
                <h3 className="heading-sm mt-4">Ethics</h3>
                <p className="text-sm mt-2">Moral philosophy and the refinement of character in daily conduct.</p>
              </div>

              <div className="domain-card gold cursor-pointer" onClick={() => handleDomainClick('Finance')}>
                <div className="domain-icon">💰</div>
                <h3 className="heading-sm mt-4">Finance</h3>
                <p className="text-sm mt-2">Sovereign wealth, ethical commerce, and the purification of earnings.</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {selectedResource && (
        <div 
          className="overlay" 
          onClick={() => setSelectedResource(null)}
          style={{ alignItems: 'flex-end' }}
        >
          <div 
            className="resource-modal animate-slide-up" 
            onClick={e => e.stopPropagation()}
          >
            <div className="resource-modal-handle"></div>
            
            <div className="resource-modal-header">
              <div className="resource-icon-lg">{selectedResource.icon}</div>
              <div>
                <span className="resource-tag">{selectedResource.type}</span>
                <h3 className="resource-modal-title mt-2">{selectedResource.title}</h3>
                <p className="resource-scholar mt-1">{selectedResource.scholar}</p>
              </div>
            </div>

            <div className="resource-modal-body">
              <p className="text-body">
                {RESOURCE_DETAILS[selectedResource.detailKey]?.summary}
              </p>

              <div className="key-points mt-6">
                <h4 className="text-xs uppercase font-bold text-muted tracking-wide mb-3">Key Themes</h4>
                {RESOURCE_DETAILS[selectedResource.detailKey]?.keyPoints.map((point, i) => (
                  <div key={i} className="key-point-row">
                    <span className="key-point-dot"></span>
                    <span className="text-sm text-primary">{point}</span>
                  </div>
                ))}
              </div>

              <div className="resource-meta mt-6">
                <span className="text-xs text-muted">{RESOURCE_DETAILS[selectedResource.detailKey]?.readTime}</span>
              </div>
            </div>

            <div className="resource-modal-actions">
              <button 
                className="btn btn-primary w-full"
                onClick={() => setSelectedResource(null)}
              >
                Begin Reading
              </button>
              <button 
                className="btn btn-outline w-full mt-3"
                onClick={() => setSelectedResource(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Library;
