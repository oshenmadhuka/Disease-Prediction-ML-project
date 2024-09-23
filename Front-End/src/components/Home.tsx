import SymptomGroup from "./SymptomGroup";
import SelectedSymptomGroup from "./SelectedSymptomGroup";
import PredictionResult from "./PredictionResult";
import DoshaResult from "./DoshaResult";
import RiskResult from "./RiskResult";
import MedicineResult from "./MedicineResult";
import { useState, useEffect, useRef } from "react";
import { ChangeEvent } from "react";
import { API_ENDPOINTS } from '../apiConfig';

interface PredictionResults {
  disease: string,
  probability: number
}

interface DoshaResults {
  dosha: string
}

interface RiskResults {
  risk: string
}

interface MedicineResults {
  medicine: string
}

const Home = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<{ id: number; symptom: string }[]>([]);
  const [predictionResults, setPredictionResults] = useState<PredictionResults[]>([]);
  const [doshaResults, setDoshaResults] = useState<DoshaResults[]>([]);
  const [riskResults, setRiskResults] = useState<RiskResults[]>([]);
  const [medicineResults, setMedicineResults] = useState<MedicineResults[]>([]);

  const handleSelectedItem = (id: number, symptom: string) => {
    const itemExists = selectedSymptoms.some(item => item.id === id && item.symptom === symptom);
    if (!itemExists) {
      setSelectedSymptoms(prevSelectedSymptoms => [...prevSelectedSymptoms, { id, symptom }]);
    }
  };

  const removeDeletedItem = (id: number) => {
    setSelectedSymptoms(prevSelectedSymptoms => prevSelectedSymptoms.filter(symptom => symptom.id !== id));
  };

  const [text, setText] = useState('');
  const searchTextRef = useRef<string>('');

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    searchTextRef.current = text;
  }, [text]);

  // const getPredictions = () => {
  //   const idList = {
  //     ids: selectedSymptoms.map(item => item.id)
  //   };
    
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(idList)
  //   };
    
  //   fetch(API_ENDPOINTS.PREDICT, requestOptions)
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }
  //   return response.json();
  // })
  // .then((data) => {
  //   setPredictionResults(data.diseasePredictions || []);
  //   setDoshaResults(data.doshaPredictions || []);
  //   setRiskResults(data.riskPredictions || []);
  //   setMedicineResults(data.medicinePredictions || []);
  // })
  // .catch(error => console.error('Error:', error));

  // }

  const getPredictions = () => {
    const idList = {
      ids: selectedSymptoms.map(item => item.id)
    };
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(idList)
    };
  
    // Fetch disease predictions
    // fetch(API_ENDPOINTS.PREDICT, requestOptions)
    //   .then(response => response.json())
    //   .then(data => setPredictionResults(data.diseasePredictions || []))
    //   .catch(error => console.error('Error fetching disease predictions:', error));
  
    // Fetch dosha predictions
    fetch(API_ENDPOINTS.PREDICT_DOSHA, requestOptions)
      .then(response => response.json())
      .then(data => setDoshaResults([data]))
      .catch(error => console.error('Error fetching dosha predictions:', error));
  
    // Fetch risk predictions
    fetch(API_ENDPOINTS.PREDICT_RISK, requestOptions)
      .then(response => response.json())
      .then(data => setRiskResults([data]))
      .catch(error => console.error('Error fetching risk predictions:', error));
  
    // Fetch medicine predictions
    fetch(API_ENDPOINTS.PREDICT_MEDICINE, requestOptions)
      .then(response => response.json())
      .then(data => setMedicineResults([data]))
      .catch(error => console.error('Error fetching medicine predictions:', error));
  };
  
  
  return (
    <div className="container section">
      <div className="row">
        <div className="col-md-6">
          <div className="col-md-12 unit form-control">
            <p className="card-heading">Select Symptoms</p>
            <input
              className="form-control me-2 mb-4"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange = {handleTextChange}>
            </input>
            <SymptomGroup searchKey={text} onSelectItem={handleSelectedItem}></SymptomGroup>
          </div>
        </div>
        <div className="col-md-6">
          <div className="col-md-12 unit form-control">
            <p className="card-heading">Selected Symptoms</p>
            { selectedSymptoms.length == 0 && <p>No symptoms selected.</p>}
            <SelectedSymptomGroup symptoms={selectedSymptoms} onDeletedItem={removeDeletedItem} ></SelectedSymptomGroup>
          </div>
          <div className="btn-inline">
          <button
            type="button"
            onClick={getPredictions}
            disabled={selectedSymptoms.length < 3}
            className="btn btn-success"
          >
            Predict
          </button>

            { selectedSymptoms.length > 0 && selectedSymptoms.length < 3 && <span className="text-primary">* Select at least 3 symptoms for better results.</span>}
          </div>

          {predictionResults.length > 0 && (
            <div className="col-md-12 unit form-control mt-3">
              <p className="card-heading">Prediction Results</p>
              {predictionResults.map((p, index) => (
                <PredictionResult key={index + 1} id={index + 1} disease={p.disease} probability={p.probability} />
              ))}
            </div>
          )}

          {doshaResults.length > 0 && (
            <div className="col-md-12 unit form-control mt-3">
              <p className="card-heading">Dosha Results</p>
              {doshaResults.map((d, index) => (
                <DoshaResult key={index + 1}  dosha={d.dosha} />
              ))}
            </div>
          )}

          {riskResults.length > 0 && (
            <div className="col-md-12 unit form-control mt-3">
              <p className="card-heading">Risk Results</p>
              {riskResults.map((r, index) => (
                <RiskResult key={index + 1}  risk={r.risk} />
              ))}
            </div>
          )}

          {medicineResults.length > 0 && (
            <div className="col-md-12 unit form-control mt-3">
              <p className="card-heading">Medicine Results</p>
              {medicineResults.map((m, index) => (
                <MedicineResult key={index + 1}  medicine={m.medicine} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
