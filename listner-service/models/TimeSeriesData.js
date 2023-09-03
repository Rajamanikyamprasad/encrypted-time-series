// models/TimeSeriesData.js
const mongoose = require('mongoose');

const timeSeriesDataSchema = new mongoose.Schema({
  name: String,
  origin: String,
  destination: String,
  secretKey: String,
  timestamp: { type: Date, default: Date.now },
});

// Create an index on the 'timestamp' field for efficient querying
timeSeriesDataSchema.index({ timestamp: 1 });

module.exports = mongoose.model('TimeSeriesData', timeSeriesDataSchema);
