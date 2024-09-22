// API Configuration
const BASE_URL = 'https://disease-prediction-backend-c0c6fyc0ctgph8ec.eastus-01.azurewebsites.net';

export const API_ENDPOINTS = {
    SYMPTOMS: `${BASE_URL}/symptoms`,
    SYMPTOM_SEARCH: `${BASE_URL}/symptomsearch`,
    PREDICT: `${BASE_URL}/predict`,
    FEEDBACK: `${BASE_URL}/feedback`,
    MEDICAL_CENTERS: `${BASE_URL}/medicalcenters`,

     // New API endpoints for predictions
     PREDICT_DOSHA: `${BASE_URL}/predict/dosha`,
     PREDICT_RISK: `${BASE_URL}/predict/risk`,
     PREDICT_MEDICINE: `${BASE_URL}/predict/medicine`,
};
