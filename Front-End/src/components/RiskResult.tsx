import React from 'react';

interface RiskProps {
  risk: string;
}

const RiskResult: React.FC<RiskProps> = ({ risk }) => {
  
  // Function to determine the border color based on the risk level
  const getBorderColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'border-danger'; // Bootstrap class for red border
      case 'Medium':
        return 'border-warning'; // Bootstrap class for yellow border
      case 'Low':
        return 'border-success'; // Bootstrap class for green border
      default:
        return 'border-secondary'; // Default border color (gray)
    }
  };

  return (
    <div className={`p-3 mb-3 border ${getBorderColor(risk)}`} style={{ borderWidth: '2px', borderRadius: '5px' }}>
      <p>{`${risk}`}</p>
    </div>
  );
};

export default RiskResult;
