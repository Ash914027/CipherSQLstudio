import React from 'react';

const AssignmentCard = ({ assignment, onSelect }) => {
  const difficultyColors = {
    Easy: '#10b981',
    Medium: '#f59e0b',
    Hard: '#ef4444'
  };

  return (
    <div className="assignment-card" onClick={() => onSelect(assignment)}>
      <div className="assignment-card__header">
        <h3 className="assignment-card__title">{assignment.title}</h3>
        <span
          className="assignment-card__difficulty"
          style={{ backgroundColor: difficultyColors[assignment.difficulty] }}
        >
          {assignment.difficulty}
        </span>
      </div>
      <p className="assignment-card__description">{assignment.description}</p>
    </div>
  );
};

export default AssignmentCard;