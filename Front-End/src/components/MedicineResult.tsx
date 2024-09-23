interface MedicineProps {
    medicine: string;
  }
  
  const MedicineResult: React.FC<MedicineProps> = ({ medicine }) => {
    return (
      <>
        <p>{` Medicine: ${medicine}`}</p>
      </>
    );
  };
  
  export default MedicineResult;
  