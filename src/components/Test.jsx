import React from "react";
import SearchBar from "./search-bar/SearchBar";
import SemSelector from "./sem-selector/SemSelector";

export default function Test() {
  return (
    <div className="dummy flex">
      <SemSelector />
      <SearchBar />
    </div>
  );
}
