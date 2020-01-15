const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const StudentClassRecordSchema = new Schema({
  // STUDENT-SPECIFIC INFORMATION
  studentUniqueID: {
    type: Schema.Types.ObjectId,
    ref: `StudentRecord`
  },
  classUniqueID: {
    type: Schema.Types.ObjectId,
    ref: `ClassRecord`
  },
  factorPresent: Number,
  factorGoodBehavior: Number,
  gradeHomework: Number,
  gradeParticipation: Number,
  gradeExam: Number,
  
  // ADMIN
  timestampCreated: Date,
  timestampEdited: Date,
});

//EXPORT THE MODEL
module.exports = model('StudentClassRecord',StudentClassRecordSchema);