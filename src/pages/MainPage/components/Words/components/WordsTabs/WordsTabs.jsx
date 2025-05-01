import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import "./WordsTabs.style.css";

const WordsTabs = ({ tabValue, onTabChange }) => {
  return (
    <Tabs 
      value={tabValue} 
      onChange={onTabChange} 
      className="words-tabs"
      variant="fullWidth"
      TabIndicatorProps={{ 
        sx: { 
          backgroundColor: 'var(--color-primary)',
          height: 3
        } 
      }}
    >
      <Tab 
        label="단어" 
        className={`word-tab ${tabValue === 0 ? 'active-tab' : ''}`}
        sx={{
          '&.Mui-selected': {
            color: 'var(--color-primary)',
            fontWeight: 600
          },
          textTransform: 'none',
          fontSize: 16,
          color: 'var(--color-text-secondary)',
          minWidth: 100
        }}
      />
      <Tab 
        label="숙어" 
        className={`word-tab ${tabValue === 1 ? 'active-tab' : ''}`}
        sx={{
          '&.Mui-selected': {
            color: 'var(--color-primary)',
            fontWeight: 600
          },
          textTransform: 'none',
          fontSize: 16,
          color: 'var(--color-text-secondary)',
          minWidth: 100
        }}
      />
    </Tabs>
  );
};

export default WordsTabs; 