const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  buildingname: String,
  buildingadress: String,
  roomquantity: Number,
  ownername: String,
  ownerphonenumber: String,
  managername: String,
  managerphonenumber: String,
  roomquantity: Number,
});

const buildingTable = mongoose.model('building', buildingSchema);
module.exports = buildingTable;
