import SymptomGroup from "./SymptomGroup";
import SelectedSymptomGroup from "./SelectedSymptomGroup";
import DoshaResult from "./DoshaResult";
import RiskResult from "./RiskResult";
import MedicineResult from "./MedicineResult";
import PrognosisResult from "./PrognosisResult";
import { useState, useEffect, useRef } from "react";
import { ChangeEvent } from "react";
import { API_ENDPOINTS } from "../apiConfig";

interface PredictionResults {
  disease: string;
}

interface DoshaResults {
  dosha: string;
}

interface RiskResults {
  risk: string;
}

interface MedicineResults {
  medicine: string;
}

const Home = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<
    { id: number; symptom: string }[]
  >([]);
  const [predictionResults, setPredictionResults] = useState<
    PredictionResults[]
  >([]);
  const [doshaResults, setDoshaResults] = useState<DoshaResults[]>([]);
  const [riskResults, setRiskResults] = useState<RiskResults[]>([]);
  const [medicineResults, setMedicineResults] = useState<MedicineResults[]>([]);

  const handleSelectedItem = (id: number, symptom: string) => {
    const itemExists = selectedSymptoms.some(
      (item) => item.id === id && item.symptom === symptom
    );
    if (!itemExists) {
      setSelectedSymptoms((prevSelectedSymptoms) => [
        ...prevSelectedSymptoms,
        { id, symptom },
      ]);
    }
  };

  const removeDeletedItem = (id: number) => {
    setSelectedSymptoms((prevSelectedSymptoms) =>
      prevSelectedSymptoms.filter((symptom) => symptom.id !== id)
    );
  };

  const [text, setText] = useState("");
  const searchTextRef = useRef<string>("");

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    searchTextRef.current = text;
  }, [text]);

  const getPredictions = () => {
    const idList = {
      ids: selectedSymptoms.map((item) => item.id),
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idList),
    };

    // Fetch disease predictions
    fetch(API_ENDPOINTS.PREDICT_PROGNOSIS, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Directly set the prognosis from the response
        setPredictionResults([{ disease: data.prognosis }]); // Update here
      })
      .catch((error) => {
        console.error("Error fetching prognosis predictions:", error);
        // Optionally show an error message to the user
      });

    // Fetch dosha predictions
    fetch(API_ENDPOINTS.PREDICT_DOSHA, requestOptions)
      .then((response) => response.json())
      .then(({ dosha }) => setDoshaResults([{ dosha }]))
      .catch((error) =>
        console.error("Error fetching dosha predictions:", error)
      );

    // Fetch risk predictions
    fetch(API_ENDPOINTS.PREDICT_RISK, requestOptions)
      .then((response) => response.json())
      .then(({ risk }) => setRiskResults([{ risk }]))
      .catch((error) =>
        console.error("Error fetching risk predictions:", error)
      );

    // Fetch medicine predictions
    fetch(API_ENDPOINTS.PREDICT_MEDICINE, requestOptions)
      .then((response) => response.json())
      .then(({ medicine }) => setMedicineResults([{ medicine }]))
      .catch((error) =>
        console.error("Error fetching medicine predictions:", error)
      );
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
              onChange={handleTextChange}
            ></input>
            <SymptomGroup
              searchKey={text}
              onSelectItem={handleSelectedItem}
            ></SymptomGroup>
          </div>
        </div>
        <div className="col-md-6">
          <div className="col-md-12 unit form-control">
            <p className="card-heading">Selected Symptoms</p>
            {selectedSymptoms.length == 0 && <p>No symptoms selected.</p>}
            <SelectedSymptomGroup
              symptoms={selectedSymptoms}
              onDeletedItem={removeDeletedItem}
            ></SelectedSymptomGroup>
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

            {selectedSymptoms.length > 0 && selectedSymptoms.length < 3 && (
              <span className="text-primary">
                * Select at least 3 symptoms for better results.
              </span>
            )}
          </div>

          {predictionResults.length > 0 && (
            <div className="col-md-12 unit form-control mt-3">
              <p className="card-heading">Prognosis</p>
              {predictionResults.map((p, index) => (
                <PrognosisResult key={index} disease={p.disease} />
              ))}
            </div>
          )}

          {doshaResults.length > 0 && (
            <div className="col-md-12 unit form-control mt-3">
              <p className="card-heading">Dosha</p>
              {doshaResults.map((d, index) => (
                <DoshaResult key={index + 1} dosha={d.dosha} />
              ))}
            </div>
          )}

          {riskResults.length > 0 && (
            <div className="col-md-12 unit form-control mt-3">
              <p className="card-heading">Risk</p>
              {riskResults.map((r, index) => (
                <RiskResult key={index + 1} risk={r.risk} />
              ))}
              <p className="card-heading">
              *If the predicted risk is high, we recommend consulting a doctor.</p>
            </div>
          )}

          {medicineResults.length > 0 && (
            <div className="col-md-12 unit form-control mt-3">
              <p className="card-heading">Medicine</p>
              {medicineResults.map((m, index) => (
                <MedicineResult key={index + 1} medicine={m.medicine} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
