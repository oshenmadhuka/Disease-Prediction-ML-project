interface DoshaProps {
    id: number;
    dosha: string;
  }
  
  const DoshaResult: React.FC<DoshaProps> = ({ id, dosha }) => {
    return (
      <>
        <p>{`${id}. Dosha: ${dosha}`}</p>
      </>
    );
  };
  
  export default DoshaResult;
  