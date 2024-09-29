from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import numpy as np
import json
from sklearn.ensemble import RandomForestClassifier
import  googlemaps
import pandas as pd
import csv
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)  # Allow all origin

# Load all models and Encoders
prognosis_model = joblib.load('model/Prognosis/Prognosis_Prediction_Model.pkl')
dosha_model = joblib.load('model/Dosha/Dosha_Prediction_Model.pkl')
risk_model = joblib.load('model/Risk/Risk_Prediction_Model.pkl')
medicine_model = joblib.load('model/Medicine/Medicine_Prediction_Model.pkl')


# Load encoders if needed 
prognosis_encoder = joblib.load('model/Prognosis/Prognosis_LabelEncoder.pkl')
dosha_encoder = joblib.load('model/Dosha/Dosha_LabelEncoder.pkl')
risk_encoder = joblib.load('model/Risk/Risk_LabelEncoder.pkl')
medicine_encoder = joblib.load('model/Medicine/Medicine_LabelEncoder.pkl')

@app.route('/')
def home():
    return "Welcome to the Disease Prediction API!"

@app.route('/symptoms', methods=['GET'])
def symptomDetails():
    file_path = 'db/symptomsnew.json'
    with open(file_path, 'r') as symptom_json:
        symptoms = json.load(symptom_json)
    return jsonify(symptoms)

@app.route('/symptomsearch', methods=['POST'])
def symptomSearch():
    request_data = request.get_json()

    if 'search_key' in request_data:
        search_key = request_data['search_key'].lower()

        file_path = 'db/symptomsnew.json'
        with open(file_path, 'r') as symptom_json:
            symptoms = json.load(symptom_json)

        filtered_symptoms = [symptom for symptom in symptoms if search_key in symptom['symptom'].lower() or search_key in symptom['description'].lower()]
        return jsonify(filtered_symptoms), 200
    
    return jsonify({'message': 'Please provide a search_key in the request body.'}), 400

@app.route('/feedback', methods=['POST'])
def saveFeedback():
    request_data = request.get_json()
    
    # Create a dictionary to hold the feedback data
    feedback_data = {
        'name': request_data.get('name'),
        'email': request_data.get('email'),
        'message': request_data.get('message'),
        'rating': request_data.get('rating')
    }

    # Save the feedback data to a CSV file
    with open('db/feedback.csv', 'a', newline='') as file:
        fieldnames = ['name', 'email', 'message', 'rating']
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        # Write the header if the file is empty
        if file.tell() == 0:
            writer.writeheader()

        writer.writerow(feedback_data)

    return jsonify({'message': 'Feedback saved successfully.'}), 200

# Route for Prognosis prediction
@app.route('/predict/prognosis', methods=['POST'])
def getPredictions():
    # Get the number of features in the prognosis model
    num_features = prognosis_model.n_features_in_
    # Create a custom array with zeroes for the input
    custom_array = np.zeros(num_features)

    # Extract symptom ids from the POST request and set corresponding indices to 1
    symptom_ids = [int(x) for x in request.json['ids']]
    for id in symptom_ids:
        custom_array[id] = 1

    # Make prediction using the prognosis model
    prognosis_prediction = prognosis_model.predict([custom_array])[0]

    # Decode the predicted prognosis using the label encoder
    prognosis_label = prognosis_encoder.inverse_transform([prognosis_prediction])[0]

    # Return the decoded prognosis label
    return jsonify({'prognosis': prognosis_label}), 200

# Route for Dosha Prediction
@app.route('/predict/dosha', methods=['POST'])
def predictDosha():
    num_features = dosha_model.n_features_in_
    custom_array = np.zeros(num_features)
    symptom_ids = [int(x) for x in request.json['ids']]

    for id in symptom_ids:
        custom_array[id] = 1

    # Make prediction and decode result
    dosha_prediction = dosha_model.predict([custom_array])[0]
    dosha_label = dosha_encoder.inverse_transform([dosha_prediction])[0]

    return jsonify({'dosha': dosha_label}), 200

# Route for Risk Prediction
@app.route('/predict/risk', methods=['POST'])
def predictRisk():
    num_features = risk_model.n_features_in_
    custom_array = np.zeros(num_features)
    symptom_ids = [int(x) for x in request.json['ids']]

    for id in symptom_ids:
        custom_array[id] = 1

    # Make prediction and decode result
    risk_prediction = risk_model.predict([custom_array])[0]
    risk_label = risk_encoder.inverse_transform([risk_prediction])[0]

    return jsonify({'risk': risk_label}), 200

# Route for Medicine Prediction
@app.route('/predict/medicine', methods=['POST'])
def predictMedicine():
    num_features = medicine_model.n_features_in_
    custom_array = np.zeros(num_features)
    symptom_ids = [int(x) for x in request.json['ids']]

    for id in symptom_ids:
        custom_array[id] = 1

    # Make prediction and decode result
    medicine_prediction = medicine_model.predict([custom_array])[0]
    medicine_label = medicine_encoder.inverse_transform([medicine_prediction])[0]

    return jsonify({'medicine': medicine_label}), 200
# Google maps API
# def miles_to_meter(miles):
#     try:
#         return miles * 1_609.
#     except:
#         return 0

# load_dotenv()

# MAPS_API_KEY = os.getenv('MAPS_API_KEY')

# map_client = googlemaps.Client(key=MAPS_API_KEY)

# @app.route('/medicalcenters', methods=['POST'])
# def getNearbyMedicalCenters():
#     request_data = request.get_json()

#     if 'lat' and 'lng' in request_data:
#         lat = request_data.get('lat')
#         lng = request_data.get('lng')
#         location = {'lat': lat, 'lng': lng}
#         search_string = 'ayurveda'
#         distance = miles_to_meter(10)
#         medical_centers = []

#         response = map_client.places_nearby(
#             location=location,
#             keyword=search_string,
#             radius=distance
#         )

#         for place in response.get('results', []):
#             # Get the first photo reference if available
#             photo_reference = place.get('photos', [{}])[0].get('photo_reference', '')

#             # Build the photo URL using the first photo reference
#             photo_url = ''
#             if photo_reference:
#                 photo_url = f'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={MAPS_API_KEY}'

            
#             medical_centers.append({
#                 'name': place['name'],
#                 'address': place.get('vicinity', ''),
#                 'icon': photo_url,
#                 'url': f"https://www.google.com/maps/place/?q=place_id:{place['place_id']}"
#             })

#         return jsonify(medical_centers)
#     return jsonify({'message': 'Please provide valid request body.'}), 400


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)  
