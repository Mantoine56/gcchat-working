'use client';

import React, { createContext, useContext, ReactNode } from 'react';

/**
 * DatasetType defines the available datasets that can be used for RAG
 * - 'travel': The existing travel data from Open Government GC
 * - 'pses': Public Service Employee Survey data to be added in the future
 */
export type DatasetType = 'mockDataset'; // Simplified for frontend demo

/**
 * DatasetContextType defines the shape of our context
 * - currentDataset: Currently selected dataset for RAG
 * - setDataset: Function to change the active dataset
 * - datasetName: Human-readable name of the current dataset
 */
interface DatasetContextType {
  currentDataset: DatasetType;
  // setDataset: (dataset: DatasetType) => void; // Removed: no longer need to set dataset
  datasetName: string;
}

// Create context with default values
const DatasetContext = createContext<DatasetContextType>({
  currentDataset: 'mockDataset', // Default to mock data
  // setDataset: () => {}, // Removed
  datasetName: 'Mock Data Display',
});

/**
 * Custom hook to easily access dataset context from any component
 * @returns The dataset context values and functions
 */
export const useDataset = () => useContext(DatasetContext);

/**
 * DatasetProvider component manages which dataset is currently active
 * Wraps the application to provide dataset context to all child components
 * 
 * @param children - React components that will have access to dataset context
 */
export function DatasetProvider({ children }: { children: ReactNode }) {
  // State to track which dataset is currently selected
  const currentDataset: DatasetType = 'mockDataset'; // Always mockDataset
  
  /**
   * Maps dataset IDs to human-readable names for display in the UI
   * This can be expanded as more datasets are added
   */
  const datasetNames: Record<DatasetType, string> = {
    mockDataset: 'Mock Data Display', // Simplified
  };

  /**
   * Changes the active dataset used for RAG queries
   * @param dataset - The dataset to switch to
   */
  // const setDataset = (dataset: DatasetType) => { // Removed setDataset function
  //   setCurrentDataset(dataset);
  //   // You could add analytics tracking here
  //   console.log(`Dataset changed to: ${dataset}`);
  // };

  // Get the human-readable name of the current dataset
  const datasetName = datasetNames[currentDataset];

  return (
    <DatasetContext.Provider value={{ currentDataset, datasetName }}> {/* Removed setDataset from value */}
      {children}
    </DatasetContext.Provider>
  );
}
