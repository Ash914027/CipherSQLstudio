import React from 'react';

const ResultsTable = ({ data, error }) => {
  if (error) {
    return (
      <div className="results-error">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>{error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="results-empty">
        <p>No results to display. Execute a query to see results.</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="results-table-container">
      <table className="results-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => (
                <td key={col}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="results-info">
        {data.length} row{data.length !== 1 ? 's' : ''} returned
      </div>
    </div>
  );
};

export default ResultsTable;