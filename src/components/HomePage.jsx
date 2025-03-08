import React from "react";

function HomePage({ startTracking }) {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to Yoga Pose Tracker 🧘‍♂️</h1>
        <p>Track your yoga journey, improve flexibility, and build a daily habit.</p>

        {/* ✅ Motivational Quote */}
        <blockquote>
          "Yoga is the journey of the self, through the self, to the self." - The Bhagavad Gita
        </blockquote>

        {/* ✅ Feature Highlights */}
        <ul className="features-list">
          <li>🔥 Track your daily streaks</li>
          <li>📊 Monitor your progress & completion</li>
          <li>⏳ Custom timer for each pose</li>
          <li>🎯 Daily challenge mode</li>
          <li>💬 Join the yoga community</li>
        </ul>

        {/* ✅ Start Tracking Button */}
        <button onClick={startTracking} className="start-btn">Start Tracking</button>
      </div>
    </div>
  );
}

export default HomePage;
