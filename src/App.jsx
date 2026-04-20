import { Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Hub from './pages/Hub';
import Reflect from './pages/Reflect';
import Journey from './pages/Journey';
import Library from './pages/Library';
import Community from './pages/Community';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Top Header Placeholder (could be global or per page) */}
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/reflect" element={<Reflect />} />
          <Route path="/library" element={<Library />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </main>
      
      <BottomNav />
    </div>
  );
}

export default App;
