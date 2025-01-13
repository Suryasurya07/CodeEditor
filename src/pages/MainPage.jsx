import React, { useState } from 'react';
import ConfettiEffect from '../components/ConfettiEffect';
import Header from '../components/Header';
import Editor from '../components/Editor';

const MainPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); 
  const [isConfettiVisible, setConfettiVisible] = useState(false);
  const [code, setCode] = useState('');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); 
  };

  const handleRunClick = () => {
    
    setConfettiVisible(true);
    setTimeout(() => setConfettiVisible(false), 3000);
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen`}>
      
      <Editor theme={theme} onCodeChange={setCode} onRunClick={handleRunClick} />
    </div>
  );
};

export default MainPage;
