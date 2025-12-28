const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  schema: [{
    name: String,
    type: String
  }],
  sampleData: [mongoose.Schema.Types.Mixed]
});

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  tables: [tableSchema],
  expectedColumns: [String],
  hints: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assignment', assignmentSchema);