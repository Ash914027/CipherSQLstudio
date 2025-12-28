const { pgPool } = require('../config/database');

class SQLExecutor {
  // Dangerous keywords that should be blocked
  static FORBIDDEN_KEYWORDS = [
    'DROP', 'DELETE', 'TRUNCATE', 'ALTER', 'CREATE', 
    'INSERT', 'UPDATE', 'GRANT', 'REVOKE', 'EXECUTE'
  ];

  // Validate SQL query for security
  static validateQuery(query) {
    const normalizedQuery = query.trim().toUpperCase();

    // Check if query starts with SELECT
    if (!normalizedQuery.startsWith('SELECT')) {
      return {
        isValid: false,
        error: 'Only SELECT queries are allowed'
      };
    }

    // Check for forbidden keywords
    for (const keyword of this.FORBIDDEN_KEYWORDS) {
      if (normalizedQuery.includes(keyword)) {
        return {
          isValid: false,
          error: `Query contains forbidden keyword: ${keyword}`
        };
      }
    }

    // Check for semicolons (prevent multiple statements)
    const semicolonCount = (query.match(/;/g) || []).length;
    if (semicolonCount > 1) {
      return {
        isValid: false,
        error: 'Multiple SQL statements are not allowed'
      };
    }

    return { isValid: true };
  }

  // Execute SQL query with timeout and row limit
  static async executeQuery(query, assignmentId) {
    const validation = this.validateQuery(query);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const client = await pgPool.connect();
    
    try {
      // Set query timeout
      await client.query(`SET statement_timeout = ${process.env.MAX_QUERY_EXECUTION_TIME || 5000}`);

      // Execute query
      const startTime = Date.now();
      const result = await client.query(query);
      const executionTime = Date.now() - startTime;

      // Limit rows returned
      const maxRows = parseInt(process.env.MAX_RESULT_ROWS || 1000);
      const rows = result.rows.slice(0, maxRows);

      return {
        success: true,
        data: rows,
        rowCount: result.rowCount,
        executionTime,
        columns: result.fields.map(f => f.name),
        truncated: result.rowCount > maxRows
      };

    } catch (error) {
      // Handle specific PostgreSQL errors
      let errorMessage = 'Query execution failed';
      
      if (error.code === '42P01') {
        errorMessage = 'Table does not exist';
      } else if (error.code === '42703') {
        errorMessage = 'Column does not exist';
      } else if (error.code === '42601') {
        errorMessage = 'Syntax error in SQL query';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Query execution timeout. Please optimize your query.';
      } else {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage,
        code: error.code
      };

    } finally {
      client.release();
    }
  }
}

module.exports = SQLExecutor;