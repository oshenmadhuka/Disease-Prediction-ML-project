interface DoshaProps {
    dosha: string;
  }
  
  const DoshaResult: React.FC<DoshaProps> = ({ dosha }) => {
    return (
      <>
        <p>{` Dosha: ${dosha}`}</p>
      </>
    );
  };
  
  export default DoshaResult;
  