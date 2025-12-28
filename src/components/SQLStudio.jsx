import React, { useState, useEffect } from 'react';
import AssignmentCard from './AssignmentCard';
import SQLEditor from './SQLEditor';
import ResultsTable from './ResultsTable';
import SchemaViewer from './SchemaViewer';

// Mock data for assignments
const mockAssignments = [
  {
    id: 1,
    title: "Basic SELECT Query",
    difficulty: "Easy",
    description: "Learn to retrieve data from a single table using SELECT statements",
    question: "Write a query to select all columns from the 'employees' table where the salary is greater than 50000.",
    tables: [
      {
        name: "employees",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "name", type: "VARCHAR(100)" },
          { name: "department", type: "VARCHAR(50)" },
          { name: "salary", type: "INTEGER" },
          { name: "hire_date", type: "DATE" }
        ],
        sampleData: [
          { id: 1, name: "John Doe", department: "Engineering", salary: 75000, hire_date: "2020-01-15" },
          { id: 2, name: "Jane Smith", department: "Marketing", salary: 45000, hire_date: "2021-03-20" },
          { id: 3, name: "Bob Johnson", department: "Engineering", salary: 82000, hire_date: "2019-07-10" },
          { id: 4, name: "Alice Williams", department: "HR", salary: 55000, hire_date: "2022-02-01" }
        ]
      }
    ],
    expectedColumns: ["id", "name", "department", "salary", "hire_date"]
  },
  {
    id: 2,
    title: "JOIN Operations",
    difficulty: "Medium",
    description: "Practice combining data from multiple tables using JOIN clauses",
    question: "Write a query to display employee names along with their department names by joining the employees and departments tables.",
    tables: [
      {
        name: "employees",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "name", type: "VARCHAR(100)" },
          { name: "dept_id", type: "INTEGER" }
        ],
        sampleData: [
          { id: 1, name: "John Doe", dept_id: 1 },
          { id: 2, name: "Jane Smith", dept_id: 2 },
          { id: 3, name: "Bob Johnson", dept_id: 1 }
        ]
      },
      {
        name: "departments",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "dept_name", type: "VARCHAR(50)" }
        ],
        sampleData: [
          { id: 1, dept_name: "Engineering" },
          { id: 2, dept_name: "Marketing" },
          { id: 3, dept_name: "HR" }
        ]
      }
    ],
    expectedColumns: ["name", "dept_name"]
  },
  {
    id: 3,
    title: "Aggregate Functions",
    difficulty: "Medium",
    description: "Master GROUP BY and aggregate functions like COUNT, SUM, AVG",
    question: "Write a query to find the average salary for each department, showing department name and average salary.",
    tables: [
      {
        name: "employees",
        schema: [
          { name: "id", type: "INTEGER" },
          { name: "name", type: "VARCHAR(100)" },
          { name: "department", type: "VARCHAR(50)" },
          { name: "salary", type: "INTEGER" }
        ],
        sampleData: [
          { id: 1, name: "John Doe", department: "Engineering", salary: 75000 },
          { id: 2, name: "Jane Smith", department: "Marketing", salary: 45000 },
          { id: 3, name: "Bob Johnson", department: "Engineering", salary: 82000 },
          { id: 4, name: "Alice Williams", department: "HR", salary: 55000 },
          { id: 5, name: "Charlie Brown", department: "Marketing", salary: 48000 }
        ]
      }
    ],
    expectedColumns: ["department", "avg_salary"]
  }
];

// SQL Query Executor (Client-side simulation)
const executeSQLQuery = (query, tables) => {
  try {
    // Basic SQL parser simulation
    const normalizedQuery = query.trim().toUpperCase();
    
    // Security check for dangerous operations
    const dangerousKeywords = ['DROP', 'DELETE', 'TRUNCATE', 'ALTER', 'CREATE', 'INSERT', 'UPDATE'];
    for (const keyword of dangerousKeywords) {
      if (normalizedQuery.includes(keyword)) {
        return { 
          success: false, 
          error: `Query contains forbidden keyword: ${keyword}. Only SELECT queries are allowed.` 
        };
      }
    }

    if (!normalizedQuery.startsWith('SELECT')) {
      return { success: false, error: 'Only SELECT queries are allowed.' };
    }

    // Simple execution simulation for basic queries
    // In production, this would call the backend API
    const table = tables[0];
    let results = [...table.sampleData];

    // Basic WHERE clause handling
    if (normalizedQuery.includes('WHERE')) {
      const whereMatch = query.match(/WHERE\s+(\w+)\s*([><=]+)\s*(\d+)/i);
      if (whereMatch) {
        const [, column, operator, value] = whereMatch;
        results = results.filter(row => {
          const rowValue = row[column.toLowerCase()];
          const compareValue = parseInt(value);
          
          switch (operator) {
            case '>': return rowValue > compareValue;
            case '<': return rowValue < compareValue;
            case '>=': return rowValue >= compareValue;
            case '<=': return rowValue <= compareValue;
            case '=': return rowValue === compareValue;
            default: return true;
          }
        });
      }
    }

    return { success: true, data: results };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const SQLStudio = ({ user, onLogout }) => {
  const [view, setView] = useState('assignments');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResults, setQueryResults] = useState(null);
  const [queryError, setQueryError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState('');

  const handleSelectAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setView('attempt');
    setSqlQuery('');
    setQueryResults(null);
    setQueryError(null);
    setShowHint(false);
    setHint('');
  };

  const handleBackToAssignments = () => {
    setView('assignments');
    setSelectedAssignment(null);
  };

  const handleExecuteQuery = () => {
    setIsLoading(true);
    setQueryError(null);
    
    setTimeout(() => {
      const result = executeSQLQuery(sqlQuery, selectedAssignment.tables);
      
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
    <div className="app">
      <header className="app-header">
        <div className="app-header__content">
          <h1 className="app-header__title">
            <span className="app-header__icon">⚡</span>
            CipherSQLStudio
          </h1>
          <div className="app-header__user">
            <span>Welcome, {user.name}</span>
            <button className="btn btn--secondary" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {view === 'assignments' && (
          <div className="assignments-view">
            <div className="assignments-view__header">
              <h2>Available Assignments</h2>
              <p>Select an assignment to start practicing SQL</p>
            </div>
            <div className="assignments-grid">
              {mockAssignments.map(assignment => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  onSelect={handleSelectAssignment}
                />
              ))}
            </div>
          </div>
        )}

        {view === 'attempt' && selectedAssignment && (
          <div className="attempt-view">
            <div className="attempt-view__header">
              <button 
                className="btn btn--back"
                onClick={handleBackToAssignments}
              >
                ← Back to Assignments
              </button>
              <h2>{selectedAssignment.title}</h2>
            </div>

            <div className="attempt-layout">
              <aside className="attempt-sidebar">
                <div className="question-panel">
                  <h3 className="question-panel__title">Question</h3>
                  <p className="question-panel__text">{selectedAssignment.question}</p>
                </div>
                
                <SchemaViewer tables={selectedAssignment.tables} />
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
        )}
      </main>
    </div>
  );
};

export default SQLStudio;