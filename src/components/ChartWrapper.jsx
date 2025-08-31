import React from 'react';

const ChartWrapper = ({ title, children, isLoading, error }) => (
  <div className="chart-wrapper">
    <h3>{title}</h3>
    <div className="chart-content min-h-[400px] min-w-[450px]">
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!isLoading && !error && children}
    </div>
  </div>
);

export default ChartWrapper;
