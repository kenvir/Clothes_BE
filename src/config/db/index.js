const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/clothes');
    console.log('Connect Successfully !!!');
  } catch (error) {
    console.log('Connect Error !!!');
  }
}

module.exports = { connect };
