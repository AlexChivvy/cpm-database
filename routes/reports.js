// The EXPRESS framework is built on top of the NODE.JS framework and helps in fast-tracking development of server-based applications by using routes to divert users to different parts of the web application based on the request made / flow information through the app.

const express = require('express');
const router = express.Router();

const Student = require('../models/student.js');
const Professor = require('../models/professor.js');
const Class = require('../models/class.js');
const ClassStudentRegister = require('../models/class-student-register.js');


// ADMIN VIEW ALL STUDENTS


// REPORT ALL STUDENTS
router.get(`/student-report-all`, (req, res, next) => {
  Student.find()
    .then(result => {
      res.render('student-report-all', {
        result, 
      });
    })
    .catch(err => console.log(`Error while showing all students: ${err}`));
})

// REPORT INDIVIDUAL STUDENTS
router.get(`/student-report-individual/:id`, (req, res, next) => {
  const {
    id
  } = req.params;

  ClassStudentRegister.find({studentUniqueID: id})
    // Use populate to temporarily match within the ClassStudentRegister object the studentUniqueID variable, and replace it with the entire "student record"
    .populate ("classUniqueID") 
    .populate ("studentUniqueID")
    .then(result => {
      console.log(`Result`, result)
      res.render('student-report-individual', {
        result: result,
        summary: exportStudentData(result),
      });
    })
    .catch(err => console.log(`Error while showing all students: ${err}`));
    
    // .then (result => { 
    //   exportStudentData(result)
    // })

  // Student.findById(id)
  //   .then(result => {
  //     //Fix the date using the below formula
  //     res.render('student-report-individual', {
  //       result,
  //       fixedDate: dateSimpleConvert(result.studentBirthday).substring(0, 10)
  //     });
  //   })
  //   .catch(err => console.log(`Error while showing students: ${err}`));
});


// Date conversion function
const dateSimpleConvert = (input) => {
  return input.toISOString()
}

// Student data extract function
const exportStudentData = input => {
  let totalDays = 0;
  let historyPresent = 0;
  let historyGoodBehavior = 0;
  let historyHomework = 0;
  let historyParticipation = 0;
  let historyExam = 0;

  input.forEach(element => {
    totalDays += 1;
    historyPresent += element.factorPresent;
    historyGoodBehavior += element.factorGoodBehavior;
    historyHomework += element.gradeHomework;
    historyParticipation += element.gradeParticipation;
    if (element.gradeExam != 0) {
      historyExam = element.gradeExam;
    }
  });

  const reportedPresent = historyPresent / totalDays;
  const reportedGoodBehavior = historyGoodBehavior / totalDays;
  const reportedHomework = historyHomework / totalDays;
  const reportedParticipation = historyParticipation / totalDays;
  const reportedExam = historyExam;

  let reportedPresentText = `TBD`;
  if (reportedPresent > 0.9) {
    reportedPresentText = `Excellent`;
  } else if (reportedPresent > 0.75) {
    reportedPresentText = `Good`;
  } else if (reportedPresent > 0.66) {
    reportedPresentText = `Fair`;
  } else if (reportedPresent > 0.5) {
    reportedPresentText = `Poor`;
  } else {
    reportedPresentText = `Very Poor`;
  }

  let reportedGoodBehaviorText = `TBD`;
  if (reportedGoodBehavior > 0.9) {
    reportedGoodBehaviorText = `Excellent`;
  } else if (reportedGoodBehavior > 0.75) {
    reportedGoodBehaviorText = `Good`;
  } else if (reportedGoodBehavior > 0.66) {
    reportedGoodBehaviorText = `Fair`;
  } else if (reportedGoodBehavior > 0.5) {
    reportedGoodBehaviorText = `Poor`;
  } else {
    reportedGoodBehaviorText = `Very Poor`;
  }

  let reportedHomeworkText = `TBD`;
  if (reportedHomework > 0.9) {
    reportedHomeworkText = `Excellent`;
  } else if (reportedHomework > 0.75) {
    reportedHomeworkText = `Good`;
  } else if (reportedHomework > 0.66) {
    reportedHomeworkText = `Fair`;
  } else if (reportedHomework > 0.5) {
    reportedHomeworkText = `Poor`;
  } else {
    reportedHomeworkText = `Very Poor`;
  }

  let reportedParticipationText = `TBD`;
  if (reportedParticipation > 0.9) {
    reportedParticipationText = `Excellent`;
  } else if (reportedParticipation > 0.75) {
    reportedParticipationText = `Good`;
  } else if (reportedParticipation > 0.66) {
    reportedParticipationText = `Fair`;
  } else if (reportedParticipation > 0.5) {
    reportedParticipationText = `Poor`;
  } else {
    reportedParticipationText = `Very Poor`;
  }
  
  if (reportedExam != 0) {
    let examText = `TBD`;
    if (reportedExam > 9) {
      examText = `Excellent`;
    } else if (reportedExam > 7.5) {
      examText = `Good`;
    } else if (reportedExam > 6.66) {
      examText = `Fair`;
    } else if (reportedExam > 5) {
      examText = `Poor`;
    } else {
      examText = `Very Poor`;
    }
    } else {
      examText = `Not Applicable`;
    }

  const ExportObject = {
    totalDays: totalDays,
    historyPresent: historyPresent,
    reportedPresentText: reportedPresentText,
    historyGoodBehavior: historyGoodBehavior,
    reportedGoodBehaviorText: reportedGoodBehaviorText,
    historyHomework: historyHomework,
    reportedHomeworkText: reportedHomeworkText,
    historyParticipation: historyParticipation,
    reportedParticipationText: reportedParticipationText,
    reportedExam: reportedExam,
    examText: examText
  };
  return ExportObject;
};

// Export the module to the router
module.exports = router;




