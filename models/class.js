const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const classTypes = [`Normal Class`, `MidTerm Exam`, `Final Exam`, `Event Day`];

const ClassRecordSchema = new Schema({
  // STUDENT-SPECIFIC INFORMATION
  studentUniqueID: String,
  factorPresent: Boolean,
  factorGoodBehavior: Boolean,
  gradeHomework: Number,
  gradeParticipation: Number,
  gradeExam: Number,
  
  // CLASS-SPECIFIC INFORMATION
  classLevel: {
    type: [String],
    //Adults A
  },
  classSemester: String,
    //2020.1
  classType: {
    type: [String],
    enum: classTypes,
    //As per classTypes: Normal Class, Midterm Exam, etc.
  },
  classDate: Date,
  classProfessor: String,
  studentName: String,

  // ADMIN
  timestampCreated: Date,
  timestampEdited: Date,
});

//EXPORT THE MODEL
const ClassRecord = mongoose.model('ClassRecord',ClassRecordSchema);
module.exports = {ClassRecord}

