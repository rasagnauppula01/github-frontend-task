import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import UserPage from './pages/UserPage';
import RepositoryPage from './pages/RepositoryPage';
import FollowersPage from './pages/FollowersPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/user/:username/repo/:repo" element={<RepositoryPage />} />
          <Route path="/user/:username/followers" element={<FollowersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;