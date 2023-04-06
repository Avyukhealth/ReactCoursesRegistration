import "./SearchBar.css";

export default function SearchBar({  handleInputChange }) {
  return (
    <div className="input-div">
      <input onChange={handleInputChange} placeholder="Search..." />
    </div>
  );
} 
