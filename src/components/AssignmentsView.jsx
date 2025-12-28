import React from 'react';
import AssignmentCard from './AssignmentCard';

const AssignmentsView = ({ assignments, onSelectAssignment }) => {
  return (
    <div className="assignments-view">
      <div className="assignments-view__header">
        <h2>Available Assignments</h2>
        <p>Select an assignment to start practicing SQL</p>
      </div>
      <div className="assignments-grid">
        {assignments.map(assignment => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            onSelect={onSelectAssignment}
          />
        ))}
      </div>
    </div>
  );
};

export default AssignmentsView;