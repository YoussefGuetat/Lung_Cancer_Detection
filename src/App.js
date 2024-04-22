import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/signup';
import Team from './Components/Team/team';
import Chatbot from './Components/ChatBot/chatbot';

function IndexHtml() {
  return (
    <div>
      {/* Content from public/index.html */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<IndexHtml />} />
        <Route path="/team" element={<Team />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
