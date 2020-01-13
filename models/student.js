const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Above is the deconstructed version of the below code
// const Schema = mongoose.Schema;
// Which in turn would correspond to the following export structure.
// module.exports = mongoose.model('ProfessorRecord',ProfessorRecordSchema);

const StudentRecordSchema = new Schema({
  studentName: String,
  studentCurrentClassGroup: String,
  studentUniqueID: String,
  studentBirthday: Date,
  studentDocumentRG: String,
  studentTelefoneCell: Number,
  studentTelefoneFixed: Number,
  responsibleAdultName: String,
  responsibleAdultTelephone: Number,
  timestampCreated: Date,
  timestampEdited: Date,
  
// Additional factors for later use
//   factorOnlinePreMatricula: {
//     type: [Boolean],
//   },
//   factorConfirmedMatriculaInPerson: {
//     type: [Boolean],
//   },
//   factorPendingDocuments: {
//     type: [Boolean],
//   },
//   factorImageUseAuthorization: {
//     type: [Boolean],
//   },
//   factorOnWaitlist: {
//     type: [Boolean],
//   },
//   waitlistPosition: {
//     type: [Number],
//   },
});

//EXPORT THE MODEL
module.exports = model('StudentRecord',StudentRecordSchema);