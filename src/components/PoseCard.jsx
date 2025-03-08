import React, { useState } from "react";

function PoseCard({ pose, toggleLearned }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [customTime, setCustomTime] = useState(30);
  const [notes, setNotes] = useState("");

  // ✅ Function to Generate a Beep Sound
  const playBeep = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine"; // You can change to "square", "sawtooth", etc.
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frequency in Hz
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Volume

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 500); // Beep duration (milliseconds)
  };

  // ✅ Timer Function with Sound Alert
  const startTimer = () => {
    if (timerActive) return;
    setTimerActive(true);
    let time = customTime;
    setTimeLeft(time);

    const countdown = setInterval(() => {
      time--;
      setTimeLeft(time);
      if (time === 0) {
        clearInterval(countdown);
        setTimerActive(false);
        playBeep(); // 🔊 Play beep when timer ends
        alert("⏳ Time's up! Move to the next pose.");
      }
    }, 1000);
  };

  // ✅ Voice Instruction Function
  const speakPose = () => {
    if (!window.speechSynthesis) {
      alert("Sorry, your browser does not support voice guidance.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      `${pose.name}. Difficulty level: ${pose.difficulty}. ${pose.description}`
    );
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="pose-card">
      <img
        src={pose.img}
        alt={pose.name}
        className="pose-image"
        onError={(e) => {
          e.target.src = "/images/default.jpg";
        }}
      />
      <h2>{pose.name}</h2>
      <p>Difficulty: {pose.difficulty}</p>

      {/* ✅ Voice Guidance Button */}
      <button onClick={speakPose} className="voice-btn">
        🔊 Hear Instructions
      </button>

      {/* ✅ Set Custom Timer */}
      <div className="timer-settings">
        <label>Set Timer (seconds): </label>
        <input
          type="number"
          value={customTime}
          onChange={(e) => setCustomTime(Number(e.target.value))}
          min="10"
        />
      </div>
      <button onClick={startTimer} className="timer-btn">
        {timerActive ? `⏳ Hold for ${timeLeft}s` : "Start Timer"}
      </button>

      {/* ✅ Mark as Completed */}
      <button
        onClick={() => toggleLearned(pose.id)}
        className={pose.learned ? "completed" : ""}
      >
        {pose.learned ? "✔ Completed" : "Mark as Completed"}
      </button>

      {/* ✅ Notes Section */}
      <div className="notes-section">
        <textarea
          placeholder="Write your notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
}

export default PoseCard;
