import React from 'react';

const SchemaViewer = ({ tables }) => {
  return (
    <div className="schema-viewer">
      <h3 className="schema-viewer__title">Available Tables</h3>
      {tables.map(table => (
        <div key={table.name} className="schema-table">
          <h4 className="schema-table__name">{table.name}</h4>
          <table className="schema-table__structure">
            <thead>
              <tr>
                <th>Column</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {table.schema.map(col => (
                <tr key={col.name}>
                  <td>{col.name}</td>
                  <td>{col.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <details className="schema-table__sample">
            <summary>View Sample Data</summary>
            <table className="sample-data-table">
              <thead>
                <tr>
                  {table.schema.map(col => (
                    <th key={col.name}>{col.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.sampleData.slice(0, 3).map((row, idx) => (
                  <tr key={idx}>
                    {table.schema.map(col => (
                      <td key={col.name}>{row[col.name]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>
      ))}
    </div>
  );
};

export default SchemaViewer;