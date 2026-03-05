import React, { useState, useRef, useEffect } from 'react';
import './FilterBar.css';

export type DateFilter = 'all' | 'today' | 'tomorrow' | 'thisWeekend' | 'thisWeek' | 'nextWeek' | 'thisMonth' | 'nextMonth';

export interface FilterOptions {
  dateFilter: DateFilter;
  isFree: boolean | null;
  isFamilyFriendly: boolean | null;
  categories: string[];
  location: string;
}

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  activeSearchQuery?: string;
  onClearSearch?: () => void;
  onLocationChange?: (location: string) => void;
}

const CATEGORIES = [
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'food', label: 'Food & Drink', icon: '🍽️' },
  { id: 'arts', label: 'Arts & Culture', icon: '🎨' },
  { id: 'sports', label: 'Sports & Fitness', icon: '⚽' },
  { id: 'festivals', label: 'Festivals', icon: '🎪' },
  { id: 'nightlife', label: 'Nightlife', icon: '🌙' },
  { id: 'family', label: 'Family & Kids', icon: '👨‍👩‍👧' },
  { id: 'outdoor', label: 'Outdoor', icon: '🌳' },
  { id: 'comedy', label: 'Comedy', icon: '😂' },
  { id: 'theatre', label: 'Theatre', icon: '🎭' },
  { id: 'workshops', label: 'Workshops', icon: '📚' },
  { id: 'community', label: 'Community', icon: '🤝' },
];

const DATE_OPTIONS: { value: DateFilter; label: string }[] = [
  { value: 'all', label: 'Any Date' },
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'thisWeekend', label: 'This Weekend' },
  { value: 'thisWeek', label: 'This Week' },
  { value: 'nextWeek', label: 'Next Week' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'nextMonth', label: 'Next Month' },
];

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  activeSearchQuery,
  onClearSearch,
  onLocationChange
}) => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [locationInput, setLocationInput] = useState(filters.location);

  // Sync when the map drag updates the location externally
  useEffect(() => {
    setLocationInput(filters.location);
  }, [filters.location]);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const dateDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setIsDateDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateFilterChange = (value: DateFilter) => {
    onFilterChange({ ...filters, dateFilter: value });
    setIsDateDropdownOpen(false);
  };

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = filters.categories;
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(c => c !== categoryId)
      : [...currentCategories, categoryId];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleClearCategories = () => {
    onFilterChange({ ...filters, categories: [] });
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, location: locationInput });
    if (onLocationChange) {
      onLocationChange(locationInput);
    }
  };

  const clearFilters = () => {
    onFilterChange({
      dateFilter: 'all',
      isFree: null,
      isFamilyFriendly: null,
      categories: [],
      location: filters.location
    });
  };

  const handleClearAll = () => {
    clearFilters();
    if (onClearSearch) {
      onClearSearch();
    }
  };

  const hasActiveFilters =
    filters.dateFilter !== 'all' ||
    filters.isFree !== null ||
    filters.isFamilyFriendly !== null ||
    filters.categories.length > 0 ||
    !!activeSearchQuery;

  const selectedCategories = CATEGORIES.filter(c => filters.categories.includes(c.id));
  const selectedDateLabel = DATE_OPTIONS.find(d => d.value === filters.dateFilter)?.label || 'Any Date';

  return (
    <div className="filter-bar">
      <div className="filter-bar-main">
        <div className="filter-quick-actions">
          {/* Location Input */}
          <form className="location-form" onSubmit={handleLocationSubmit}>
            <span className="location-icon">📍</span>
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Enter location"
              className="location-input"
            />
          </form>

          {/* Date Dropdown */}
          <div className="date-dropdown" ref={dateDropdownRef}>
            <button
              className={`filter-quick-btn date-dropdown-trigger ${filters.dateFilter !== 'all' ? 'active' : ''}`}
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            >
              📅 {selectedDateLabel}
              <span className="dropdown-arrow">{isDateDropdownOpen ? '▲' : '▼'}</span>
            </button>

            {isDateDropdownOpen && (
              <div className="date-dropdown-menu">
                {DATE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    className={`date-dropdown-item ${filters.dateFilter === option.value ? 'selected' : ''}`}
                    onClick={() => handleDateFilterChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="category-dropdown" ref={categoryDropdownRef}>
            <button
              className={`filter-quick-btn category-dropdown-trigger ${filters.categories.length > 0 ? 'active' : ''}`}
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            >
              Categories
              {filters.categories.length > 0 && (
                <span className="category-count">{filters.categories.length}</span>
              )}
              <span className="dropdown-arrow">{isCategoryDropdownOpen ? '▲' : '▼'}</span>
            </button>

            {isCategoryDropdownOpen && (
              <div className="category-dropdown-menu">
                <div className="category-dropdown-header">
                  <span>Select Categories</span>
                  {filters.categories.length > 0 && (
                    <button className="clear-categories-btn" onClick={handleClearCategories}>
                      Clear
                    </button>
                  )}
                </div>
                <div className="category-dropdown-list">
                  {CATEGORIES.map((category) => (
                    <label key={category.id} className="category-dropdown-item">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                      />
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-label">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="filter-active-badges">
          {activeSearchQuery && (
            <span className="filter-active-badge search-badge">
              🔍 "{activeSearchQuery}"
              <button onClick={onClearSearch}>×</button>
            </span>
          )}
          {filters.dateFilter !== 'all' && (
            <span className="filter-active-badge date-badge">
              📅 {selectedDateLabel}
              <button onClick={() => handleDateFilterChange('all')}>×</button>
            </span>
          )}
          {selectedCategories.map(category => (
            <span key={category.id} className="filter-active-badge">
              {category.icon} {category.label}
              <button onClick={() => handleCategoryToggle(category.id)}>×</button>
            </span>
          ))}
          <button className="clear-all-btn" onClick={handleClearAll}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
