import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/signup';

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
      </Routes>
    </Router>
  );
}

export default App;
