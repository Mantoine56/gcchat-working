'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { useDataset } from '../contexts/DatasetContext';

// Define the mock dataset options
const mockDatasetOptions = [
  'Travel Records (Mock)',
  'Employee Survey (Mock)',
  'Census Data (Mock)',
  'Health Statistics (Mock)',
];

export const DemoDatasetSelector = () => {
  // Get the initial dataset name from the context (e.g., "Mock Data Display")
  const { datasetName: initialDatasetName } = useDataset();
  
  // Local state for the currently displayed selected dataset name
  // Initialize with the name from context, or the first mock option if context is generic
  const [selectedOption, setSelectedOption] = useState<string>(initialDatasetName && initialDatasetName !== 'Mock Data Display' ? initialDatasetName : mockDatasetOptions[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    // In a real scenario, you might call a function here to update a context or state
    console.log(`Mock dataset selected: ${option}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/70 transition-colors border border-white/20"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>Dataset:</span>
        <span className="font-medium">{selectedOption}</span>
        <ChevronDownIcon size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gc-border text-gc-text-primary">
          <ul className="py-1">
            {mockDatasetOptions.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleOptionSelect(option)}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gc-gray focus:bg-gc-gray focus:outline-none transition-colors"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}; 