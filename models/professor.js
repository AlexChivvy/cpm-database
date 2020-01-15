const mongoose = require('mongoose');
const { Schema, model } = mongoose;

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
module.exports = model('ProfessorRecord',ProfessorRecordSchema);