const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
	points: {
		type: Number,
		required: [true, 'Please set point amount']
	}
})

module.exports = mongoose.models.Points || mongoose.model('Points', PointSchema);
