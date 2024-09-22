interface RiskProps {
    id: number;
    risk: string;
  }
  
  const RiskResult: React.FC<RiskProps> = ({ id, risk }) => {
    return (
      <>
        <p>{`${id}. Risk: ${risk}`}</p>
      </>
    );
  };
  
  export default RiskResult;
  