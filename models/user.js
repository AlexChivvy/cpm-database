

const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;



const studentSchema = new Schema({
  studentName: {
    type: [String],
  },
  studentUniqueID: {
    type: [String],
  },
  studentBirthday: {
    type: [Date],
  },
  studentDocumentRG: {
    type: [String],
  },
  studentTelefoneCell: {
    type: [Number],
  },
  studentTelefoneFixed: {
    type: [Number],
  },
  responsibleAdultName: {
    type: [String],
  },
  responsibleAdultTelephone: {
    type: [Number],
  },
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
  timestampCreated: {
    type: [Date],
  },
  timestampEdited: {
    type: [Date],
  }
});


//For Class Documents

const classTypes = [`Normal Class`, `MidTerm Exam`, `Final Exam`, `Event Day`];

class studentClassRecord {
  constructor(name,ID,present,behavior,homework,participation, examGrade){
  this.studentName = name;
  this.studentUniqueID = ID;
  this.factorPresent = present;
  this.factorGoodBehavior = behavior;
  this.gradeHomework = homework;
  this.gradeParticipation = participation;
  this.examGrade = examGrade;
}
}

const classSchema = new Schema({
  classLevel: {
    type: [String],
    enum: classTypes,
    //Adults A
  },
  classSemester: {
    type: [String],
    //2020.1
  },
  classType: {
    type: [String],
    enum: classTypes,
    //As per classTypes: Normal Class, Midterm Exam, etc.
  },
  classDate: {
    type: [Date],
  },
  classProfessor: {
    type: [String],
  },
  classStudentRecords: {
    type: [Array]
    //As per studentClassRecord, an array of objects
  },  
  timestampCreated: {
    type: [Date],
  },
  timestampEdited: {
    type: [Date],
  }
});