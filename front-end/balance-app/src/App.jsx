import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateBalance from './components/create-balance';
import ListBalances from './components/list-balances';
import './App.css'; // CSS file for overall app styling

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Balance Management System</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Create Balance</Link>
              </li>
              <li>
                <Link to="/list">List Balances</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<CreateBalance />} />
            <Route path="/list" element={<ListBalances />} />
          </Routes>
        </main>
        <footer className="app-footer">© 2024 Balance Management System</footer>
      </div>
    </Router>
  );
}

export default App;
