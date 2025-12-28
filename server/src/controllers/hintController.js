const LLMService = require('../services/llmService');
const Assignment = require('../models/Assignment');

exports.getHint = async (req, res, next) => {
  try {
    const { question, userQuery, assignmentId } = req.body;

    if (!assignmentId) {
      return res.status(400).json({
        success: false,
        error: 'Assignment ID is required'
      });
    }

    // Get assignment details
    const assignment = await Assignment.findById(assignmentId);
    
    if (!assignment) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }

    // Generate hint using LLM
    const hint = await LLMService.generateHint(
      assignment.question,
      userQuery || '',
      assignment
    );

    res.json({
      success: true,
      hint: hint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate hint'
    });
  }
};