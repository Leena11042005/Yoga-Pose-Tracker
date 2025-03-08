import React, { useState, useEffect } from "react";
import PoseCard from "./components/PoseCard";
import HomePage from "./components/HomePage"; // Import HomePage
import yogaPoses from "./data/yogaPoses";
import "./styles.css";

function App() {
  const [poses, setPoses] = useState(yogaPoses);
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lastPracticeDate, setLastPracticeDate] = useState(null);
  const [trackingStarted, setTrackingStarted] = useState(false); // Track home page state

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    
    const savedStreak = parseInt(localStorage.getItem("streak")) || 0;
    const savedBestStreak = parseInt(localStorage.getItem("bestStreak")) || 0;
    const savedLastDate = localStorage.getItem("lastPracticeDate");

    setStreak(savedStreak);
    setBestStreak(savedBestStreak);
    setLastPracticeDate(savedLastDate);
  }, []);

  function startTracking() {
    setTrackingStarted(true); // Hide home page and show tracker
  }

  function updateStreak() {
    const today = new Date().toISOString().split("T")[0];
    if (lastPracticeDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const newStreak = lastPracticeDate === yesterdayStr ? streak + 1 : 1;
    setStreak(newStreak);
    setBestStreak(Math.max(newStreak, bestStreak));
    setLastPracticeDate(today);

    localStorage.setItem("streak", newStreak);
    localStorage.setItem("bestStreak", Math.max(newStreak, bestStreak));
    localStorage.setItem("lastPracticeDate", today);
  }

  function toggleLearned(id) {
    setPoses(poses.map(pose =>
      pose.id === id ? { ...pose, learned: !pose.learned } : pose
    ));
    updateStreak();
  }

  function toggleDarkMode() {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  }

  const filteredPoses = filter === "All" ? poses : poses.filter(pose => pose.difficulty === filter);
  const totalPoses = poses.length;
  const completedPoses = poses.filter(pose => pose.learned).length;
  const progress = (completedPoses / totalPoses) * 100;

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      {!trackingStarted ? ( 
        <HomePage startTracking={startTracking} />
      ) : (
        <>
          <h1>Yoga Pose Tracker 🧘‍♂</h1>

          {/* ✅ Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="toggle-btn">
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* ✅ Streak Tracking */}
          <div className="streak-container">
            <h3>🔥 Current Streak: {streak} days</h3>
            <h3>🏆 Best Streak: {bestStreak} days</h3>
          </div>

          {/* ✅ Progress Bar */}
          <div className="progress-container">
            <h3>📊 Progress: {completedPoses} / {totalPoses} Poses Completed</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          {/* ✅ Filter Dropdown */}
          <div className="filter-container">
            <label>Filter by difficulty:</label>
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="All">All</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* ✅ Yoga Poses Grid */}
          <div className="pose-container">
            {filteredPoses.map(pose => (
              <PoseCard key={pose.id} pose={pose} toggleLearned={toggleLearned} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
