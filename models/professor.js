const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const ProfessorRecordSchema = new Schema({
  professorName: String,
  professorUniqueID: String,
  professorBirthday: Date,
  professorDocumentRG: String,
  professorTelefoneCell: Number,
  professorTelefoneFixed: Number,
  emergencyContactName: String,
  emergencyContactTelephone: Number,
  timestampCreated: Date,
  timestampEdited: Date,
});

//EXPORT THE MODEL
const ProfessorRecord = mongoose.model('ProfessorRecord',ProfessorRecordSchema);
module.exports = {ProfessorRecord}