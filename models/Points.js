const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
	points: {
		type: Number,
		required: [true, 'Please set point amount']
	},
	date: {
        type: Date,
        required: [true]
    },
	signature: {
		type: String,
		required: [true, 'Please provide a signature']
	}
})

module.exports = mongoose.models.Points || mongoose.model('Points', PointSchema);
