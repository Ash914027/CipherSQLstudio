import React, { useState } from 'react';
import SQLEditor from './SQLEditor';
import ResultsTable from './ResultsTable';
import SchemaViewer from './SchemaViewer';

const AttemptView = ({ assignment, onBack, executeSQLQuery }) => {
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResults, setQueryResults] = useState(null);
  const [queryError, setQueryError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState('');

  const handleExecuteQuery = () => {
    setIsLoading(true);
    setQueryError(null);

    setTimeout(() => {
      const result = executeSQLQuery(sqlQuery, assignment.tables);

      if (result.success) {
        setQueryResults(result.data);
        setQueryError(null);
      } else {
        setQueryResults(null);
        setQueryError(result.error);
      }

      setIsLoading(false);
    }, 500);
  };

  const handleGetHint = () => {
    setIsLoading(true);

    // Simulate LLM hint generation
    setTimeout(() => {
      const hints = [
        "Think about which columns you need to filter. Look at the WHERE clause syntax.",
        "Remember that comparison operators in SQL include >, <, >=, <=, and =.",
        "The SELECT statement structure is: SELECT columns FROM table WHERE condition.",
        "Check if you're comparing the right column with the right value.",
        "Make sure your column names match exactly with the schema provided."
      ];

      const randomHint = hints[Math.floor(Math.random() * hints.length)];
      setHint(randomHint);
      setShowHint(true);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="attempt-view">
      <div className="attempt-view__header">
        <button
          className="btn btn--back"
          onClick={onBack}
        >
          ← Back to Assignments
        </button>
        <h2>{assignment.title}</h2>
      </div>

      <div className="attempt-layout">
        <aside className="attempt-sidebar">
          <div className="question-panel">
            <h3 className="question-panel__title">Question</h3>
            <p className="question-panel__text">{assignment.question}</p>
          </div>

          <SchemaViewer tables={assignment.tables} />
        </aside>

        <div className="attempt-main">
          <div className="editor-section">
            <div className="editor-section__header">
              <h3>SQL Query Editor</h3>
              <div className="editor-actions">
                <button
                  className="btn btn--secondary"
                  onClick={handleGetHint}
                  disabled={isLoading}
                >
                  💡 Get Hint
                </button>
                <button
                  className="btn btn--primary"
                  onClick={handleExecuteQuery}
                  disabled={isLoading || !sqlQuery.trim()}
                >
                  {isLoading ? 'Executing...' : '▶ Execute Query'}
                </button>
              </div>
            </div>

            <SQLEditor value={sqlQuery} onChange={setSqlQuery} />

            {showHint && (
              <div className="hint-box">
                <div className="hint-box__header">
                  <strong>💡 Hint:</strong>
                  <button
                    className="hint-box__close"
                    onClick={() => setShowHint(false)}
                  >
                    ×
                  </button>
                </div>
                <p>{hint}</p>
              </div>
            )}
          </div>

          <div className="results-section">
            <h3 className="results-section__title">Query Results</h3>
            <ResultsTable data={queryResults} error={queryError} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttemptView;