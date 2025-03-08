import React from "react";

function FilterBar({ selectedDifficulty, setSelectedDifficulty }) {
  return (
    <div className="mb-4">
      <label className="mr-2">Filter by Difficulty:</label>
      <select
        value={selectedDifficulty}
        onChange={(e) => setSelectedDifficulty(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="All">All</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  );
}

export default FilterBar;
