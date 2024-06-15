from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)

# Load models
stroke_model = load_model('models/stroke-model.h5')
diabetes_model = load_model('models/diabetes-model.h5')
heart_disease_model = load_model('models/heart-model.h5')

@app.route('/predict_stroke', methods=['POST'])
def predict_stroke():
    data = request.json

    input_data = np.array([[
        data['age'],
        data['avg_glucose_level'],
        data['bmi'],
        data['hypertension'],
        data['heart_disease'],
        data['smoking_status']
    ]])

    prediction = stroke_model.predict(input_data)
    stroke_risk = float(prediction[0][0]) * 100
    
    if stroke_risk > 50:
        label = 'Hasil prediksi diatas 50, Anda berpotensi terkena stroke'
        suggestion = 'Segera periksa ke dokter!'
    else:
        label = 'Hasil prediksi dibawah 50, Anda tidak berpotensi terkena stroke'
        suggestion = 'Tetap jaga kesehatan!'

    return jsonify({'stroke_risk': stroke_risk, 'label': label, 'suggestion': suggestion})

@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    data = request.json

    input_data = np.array([[
        data['ffpg'],  # Ubah ke data['FFPG'] jika diinput dengan huruf kapital
        data['fpg'],
        data['age'],
        data['hdl'],
        data['ldl'],
        data['sbp']
    ]])
    
    prediction = diabetes_model.predict(input_data)
    diabetes_risk = float(prediction[0][0]) * 100
    
    if diabetes_risk > 50:
        label = 'Hasil prediksi diatas 50, Anda berpotensi terkena diabetes'
        suggestion = 'Segera periksa ke dokter!'
    else:
        label = 'Hasil prediksi dibawah 50, Anda tidak berpotensi terkena diabetes'
        suggestion = 'Tetap jaga kesehatan!'

    return jsonify({'diabetes_risk': diabetes_risk, 'label': label, 'suggestion': suggestion})

@app.route('/predict_heart_disease', methods=['POST'])
def predict_heart_disease():
    data = request.json

    input_data = np.array([[
        data['age'],
        data['troponin'],
        data['kcm'],
        data['glucose'],
        data['pressureheight'],
        data['presurelow']
    ]])

    prediction = heart_disease_model.predict(input_data)
    heart_disease_risk = float(prediction[0][0]) * 100
    
    if heart_disease_risk > 50:
        label = 'Hasil prediksi diatas 50, Anda berpotensi terkena penyakit jantung'
        suggestion = 'Segera periksa ke dokter!'
    else:
        label = 'Hasil prediksi dibawah 50, Anda tidak berpotensi terkena penyakit jantung'
        suggestion = 'Tetap jaga kesehatan!'

    return jsonify({'heart_disease_risk': heart_disease_risk, 'label': label, 'suggestion': suggestion})

if __name__ == '__main__':
    app.run(debug=True)
