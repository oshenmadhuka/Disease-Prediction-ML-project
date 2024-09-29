interface MedicineProps {
    medicine: string;
  }
  
  const MedicineResult: React.FC<MedicineProps> = ({ medicine }) => {
    return (
      <>
        <p>{`${medicine}`}</p>
      </>
    );
  };
  
  export default MedicineResult;
  