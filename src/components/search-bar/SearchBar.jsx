import React from "react";
import "./SearchBar.css";

export default function SearchBar({ input, handleInputChange }) {
  return (
    <div className="input-div">
      <input onChange={handleInputChange} placeholder="Search..." />
    </div>
  );
} 
