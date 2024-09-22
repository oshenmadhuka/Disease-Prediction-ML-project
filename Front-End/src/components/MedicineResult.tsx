interface MedicineProps {
    id: number;
    medicine: string;
  }
  
  const MedicineResult: React.FC<MedicineProps> = ({ id, medicine }) => {
    return (
      <>
        <p>{`${id}. Medicine: ${medicine}`}</p>
      </>
    );
  };
  
  export default MedicineResult;
  