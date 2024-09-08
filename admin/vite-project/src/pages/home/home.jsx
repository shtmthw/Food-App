import React from 'react';
import { assets } from '../../../../../vite-project/src/assets/assets';
import './home.css'; // Import the CSS file

function Home() {
  return (
    <div className='home_cnt'>
      <img className='admin-logo' src={assets.logo} alt="Admin Logo" />
      <h1>Welcome To The Admin Panel.</h1>
      <h2>Use The Sidebar To Do What You Prefer!!</h2>
    </div>
  );
}

export default Home;
