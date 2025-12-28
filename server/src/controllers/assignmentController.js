const Assignment = require('../models/Assignment');

exports.getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find().sort({ difficulty: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    next(error);
  }
};

exports.getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }

    res.json({
      success: true,
      data: assignment
    });
  } catch (error) {
    next(error);
  }
};

exports.createAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.create(req.body);
    
    res.status(201).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    next(error);
  }
};