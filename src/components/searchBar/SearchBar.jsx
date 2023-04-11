import "./SearchBar.css";

export default function SearchBar({  handleInputChange }) {
  return (
    <div className="input-div">
      <input name="searchbar" onChange={handleInputChange} placeholder="Search..." />
    </div>
  );
} 
