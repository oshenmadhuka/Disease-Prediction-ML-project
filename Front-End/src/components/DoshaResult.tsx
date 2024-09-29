interface DoshaProps {
    dosha: string;
  }
  
  const DoshaResult: React.FC<DoshaProps> = ({ dosha }) => {
    return (
      <>
        <p>{`${dosha}`}</p>
      </>
    );
  };
  
  export default DoshaResult;
  