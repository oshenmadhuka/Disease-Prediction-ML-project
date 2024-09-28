// PrognosisResult.tsx
import React from "react";

interface PrognosisProps {
  disease: string;
}

const PrognosisResult: React.FC<PrognosisProps> = ({ disease }) => {
  return (
    <div className="result-item">
      <p>{`${disease}`}</p>
    </div>
  );
};

export default PrognosisResult;
