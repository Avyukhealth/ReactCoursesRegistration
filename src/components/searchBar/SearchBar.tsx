import React from "react";
import "./SearchBar.css";
import SearchBarProps from '../../models/searchBarProps';

export default function SearchBar({ handleInputChange }: SearchBarProps) {
  return (
    <div className="input-div">
      <input name="searchbar" onChange={handleInputChange} placeholder="Search..." />
    </div>
  );
} 
