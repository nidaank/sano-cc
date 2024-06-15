const axios = require("axios");
const prisma = require("../config/databaseConnection");

const predictStroke = async (req, res) => {
	const { age, avg_glucose_level, bmi, hypertension, heart_disease, smoking_status } = req.body;
	const { userId } = req.user;
	//prisma.strokeprediction.insert
	try {
		const response = await axios.post(`${process.env.FLASK_URL}/predict_stroke`, {
			age, 
			avg_glucose_level,
			bmi,
			hypertension,
			heart_disease,
			smoking_status
		})

		const stroke_risk = response.data;

		await prisma.strokePrediction.create({
			data: {
			  idUser: userId,
			  age,
			  avg_glucose_level,
			  bmi,
			  hypertension,
			  heart_disease,
			  smoking_status,
			  label: stroke_risk.label,
			  stroke_risk: stroke_risk.stroke_risk,
			  suggestion: stroke_risk.suggestion
			},
		  });

		res.json({ stroke_risk });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

const predictDiabetes = async (req, res) => {
	const { ffpg, fpg, age, hdl, ldl, sbp } = req.body;
	const { userId } = req.user;
	try {
		const response = await axios.post(`${process.env.FLASK_URL}/predict_diabetes`, {
			ffpg, fpg, age, hdl, ldl, sbp
		})

		const diabetes_risk = response.data;

		await prisma.diabetesPrediction.create({
			data: {
			  idUser: userId,
			  ffpg, 
			  fpg, 
			  age, 
			  hdl, 
			  ldl, 
			  sbp,
			  label: diabetes_risk.label,
			  diabetes_risk: diabetes_risk.diabetes_risk,
			  suggestion: diabetes_risk.suggestion
			},
		  });

		res.json({ diabetes_risk });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

const predictHeartDisease = async (req, res) => {
	const { age, troponin, kcm, glucose, pressureheight, presurelow } = req.body;
	const { userId } = req.user;
	try {
		const response = await axios.post(`${process.env.FLASK_URL}/predict_heart_disease`, {
			age, troponin, kcm, glucose, pressureheight, presurelow
		})

		const heart_disease_risk = response.data;

		await prisma.heartDiseasePrediction.create({
			data: {
			  idUser: userId,
			  age, 
			  troponin, 
			  kcm, 
			  glucose, 
			  pressureheight, 
			  presurelow,
			  label: heart_disease_risk.label,
			  heart_disease_risk: heart_disease_risk.heart_disease_risk,
			  suggestion: heart_disease_risk.suggestion
			},
		  });

    res.json({ heart_disease_risk });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	predictDiabetes,
	predictHeartDisease,
	predictStroke,
}