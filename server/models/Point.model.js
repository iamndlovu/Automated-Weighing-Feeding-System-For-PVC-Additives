const { Schema, model } = require('mongoose');

const PointSchema = new Schema(
  {
    pointName: { type: String, required: true, unique: true },
    status: { type: Number, default: 0 },
    routes: { type: Array, required: true },
    safeRoute: { type: Number },
    requestedRoute: { type: Number },
    prevSafe: { type: Number },
    lastFault: { type: Date },
    faulted: { type: Boolean, default: false },
    changeTimes: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Point = model('Point', PointSchema);

module.exports = Point;
