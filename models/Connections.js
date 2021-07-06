const mongoose = require('mongoose');

const ConnectionsSchema = new mongoose.Schema({
	connection: {
		type: String,
		required: [true]
	},
    attempt: {
        type: Number,
        required: [true]
    },
    date: {
        type: Date,
        required: [true]
    }
})

module.exports = mongoose.models.Connections || mongoose.model('Connections', ConnectionsSchema);
