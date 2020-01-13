const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const StudentRecordSchema = new Schema({
  studentName: String,
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
const StudentRecord = mongoose.model('StudentRecord',StudentRecordSchema);
module.exports = {StudentRecord}