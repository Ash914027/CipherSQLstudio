const SQLExecutor = require('../services/sqlExecutor');
const Assignment = require('../models/Assignment');

exports.executeQuery = async (req, res, next) => {
  try {
    const { query, assignmentId } = req.body;

    // Validate request
    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Query is required'
      });
    }

    // Get assignment details (for context)
    let assignment = null;
    if (assignmentId) {
      assignment = await Assignment.findById(assignmentId);
    }

    // Execute query
    const result = await SQLExecutor.executeQuery(query, assignmentId);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};