import React, { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  activeQuery: string;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  activeQuery,
  isLoading
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync input with active query when it changes externally (e.g., clearing)
  useEffect(() => {
    if (!activeQuery) {
      setInputValue('');
    }
  }, [activeQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className="search-bar">
      <form className="search-form" onSubmit={handleSubmit}>
        <span className="search-icon">🔍</span>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search events..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
        />
        {inputValue && (
          <button
            type="button"
            className="search-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
        <button
          type="submit"
          className="search-submit"
          disabled={isLoading || !inputValue.trim()}
          aria-label="Search"
        >
          {isLoading ? '...' : 'Go'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
