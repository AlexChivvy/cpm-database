const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const classTypes = [`Normal`, `Midterm`, `Final Exam`, `Event Day`];

const ClassRecordSchema = new Schema({
  
  // CLASS-SPECIFIC INFORMATION
  classUniqueID: String,
  classGroup: {
    type: String,
    //Adults A
  },
  classSemester: String,
    //2020.1
  classType: {
    type: String,
    enum: classTypes,
    //As per classTypes: Normal Class, Midterm Exam, etc.
  },
  classDate: Date,
  classProfessor: String,
  classDateDeepFixed: String,
  // ADMIN
  timestampCreated: Date,
  timestampEdited: Date,
});

//EXPORT THE MODEL
module.exports = model('ClassRecord',ClassRecordSchema);