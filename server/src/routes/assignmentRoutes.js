const express = require('express');
const router = express.Router();
const {
  getAllAssignments,
  getAssignmentById,
  createAssignment
} = require('../controllers/assignmentController');

router.get('/', getAllAssignments);
router.get('/:id', getAssignmentById);
router.post('/', createAssignment);

module.exports = router;