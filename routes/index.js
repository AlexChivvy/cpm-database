// The EXPRESS framework is built on top of the NODE.JS framework and helps in fast-tracking development of server-based applications by using routes to divert users to different parts of the web application based on the request made / flow information through the app.

const express = require('express');
const router = express.Router();

// Link the models to this index

//check permissions
const {
  checkRoles,
  checkAdmin,
  checkProfessor,
  checkStudent,
  checkAdminProfessor,
  checkAdminProfessorStudent
} = require("../middlewares/roles");

const Student = require('../models/student.js');
const Professor = require('../models/professor.js');
const Class = require('../models/class.js');
const ClassStudentRegister = require('../models/class-student-register.js');
const {getUserNavData} = require('./userNavData');

// HOME PAGE usar checkAdminProfessorStudent,
router.get('/app',  (req, res, next) => {
  const userNavData = getUserNavData(req);
  res.render("index", {userNavData});
});

// ACCESS DENIED

router.get('/access-denied', (req, res, next) => {
  res.render("access-denied");
});

// MOUNT AUTH ROUTES
router.use('/', require('./authentication'))

// STUDENT ADMIN RELEVANT INFORMATION

//checkAdmin only the director has access
router.get('/student-register', checkAdmin, (req, res, next) => {
  res.render('admin-student');
});

router.post('/student-record-form', (req, res, next) => {
  //first instantiate a new object on the basis of your existing model
  const newStudent = new Student(req.body)
  newStudent.timestampCreated = Date.now();
  //then save the new object in your database
  newStudent
    .save()
    .then(newStudentCreated => res.render('admin-student', {successMessage: "Student sucessfully created!"}))
    .catch(err => console.log(`Error while creating a new student: ${err}`));
});

// PROFESSOR ADMIN RELEVANT INFORMATION

router.get('/professor-register', checkAdmin, (req, res, next) => {
  res.render('admin-professor');
});


router.post('/professor-record-form', (req, res, next) => {
  //first instantiate a new object on the basis of your existing model
  const newProfessor = new Professor(req.body)
  newProfessor.timestampCreated = Date.now();
  //then save the new object in your database
  newProfessor
    .save()
    .then(newProfessorCreated => res.send(`A new professor is created: ${newProfessorCreated}!`))
    .catch(err => console.log(`Error while creating a new professor: ${err}`));
});

// CLASS ADMIN RELEVANT INFORMATION

router.get('/class-register', checkAdmin, (req, res, next) => {
  res.render('admin-class');
});

// router.post('/class-record-form', (req, res, next) => {
//   //first instantiate a new object on the basis of your existing model
//   const newProfessor = new Professor(req.body)
//   newProfessor.timestampCreated = Date.now();
//   //then save the new object in your database
//   newProfessor
//     .save()
//     .then(newProfessorCreated => res.send(`A new professor is created: ${newProfessorCreated}!`))
//     .catch(err => console.log(`Error while creating a new professor: ${err}`));
// });

//limite juliane

// CLASS PROFESSOR INPUT RELEVANT INFORMATION
// router.get(`/class-input-report`, checkAdminProfessor, (req, res, next) => {
//   Student.find()
//     .then(result => {
//       res.render('professor-input', {
//         result
//       });
//     })
//     .catch(err => console.log(`Error while showing all students: ${err}`));
// });

router.get('/class-register', (req, res, next) => {
  res.render('admin-class');
});

router.post('/class-record-form', (req, res, next) => {
  //first instantiate a new object on the basis of your existing model
  const newClass = new Class(req.body)
  newClass.classDateDeepFixed = dateSimpleConvert(newClass.classDate).substring(0, 10);
  newClass.timestampCreated = Date.now();
  //then save the new object in your database
  newClass
    .save()
    .then(newClassCreated => res.render('admin-class', {successMessage: "Class sucessfully created!"}))
    .catch(err => console.log(`Error while creating a new class: ${err}`));
});


// CLASS PROFESSOR INPUT FIRST LIST
router.get(`/class-list`, checkAdminProfessor, (req, res, next) => {
  Class.find()
    .then(result => {
      res.render('professor-class-list', {
        result
      });
    })
    .catch(err => console.log(`Error while showing all classes: ${err}`));
})

// CLASS PROFESSOR INPUT RELEVANT INFORMATION

router.get(`/class-input-report/:id`, checkAdminProfessor, (req, res, next) => {
  const {
    id
  } = req.params;
  Student.find()
    .then(result => {
      res.render('professor-input', {
        result,
        id
      });
    })
    .catch(err => console.log(`Error while showing all students: ${err}`));
})

router.post(`/class-input-report/:id`, (req, res, next) => {
  const idClass = req.params.id;
  const {
    factorPresent,
    factorGoodBehavior,
    gradeHomework,
    gradeParticipation,
    gradeExam,
    studentUniqueID
  } = req.body;
  console.log(req.body)
  //req.body passes a series of arrays which must be separated
  for (let i = 0; i < req.body.studentUniqueID.length; i += 1) {
    const newInput = {};
    for (const property in req.body) {
      newInput[property] = req.body[property][i]
    }
    //save the separate arrays into separate documents
    const newClassStudentRegister = new ClassStudentRegister({
      classUniqueID: idClass,
      factorPresent: parseFloat(newInput.factorPresent),
      factorGoodBehavior: parseFloat(newInput.factorGoodBehavior),
      gradeHomework: parseFloat(newInput.gradeHomework),
      gradeParticipation: parseFloat(newInput.gradeParticipation),
      gradeExam: parseFloat(newInput.gradeExam),
      studentUniqueID: newInput.studentUniqueID
    })
    newClassStudentRegister
      .save()
      .then(newClassStudentRegisterCreated => res.render('professor-class-list', {successMessage: "Record sucessfully created!"}))
      .catch(err => console.log(`Error while creating a new class student register: ${err}`));
  }
});

// ADMIN EDIT OR DELETE STUDENTS
router.get(`/edit-students`, checkAdmin, (req, res, next) => {
  Student.find()
    .then(result => {
      res.render('admin-edit-students', {
        result
      });
    })
    .catch(err => console.log(`Error while showing all students: ${err}`));
})

// ADMIN EDIT ONE STUDENT ONLY
router.get(`/edit-student-form/:id`, checkAdmin, (req, res, next) => {
  const {
    id
  } = req.params;
  Student.findById(id)
    .then(result => {
      //Fix the date using the below formula
      res.render('admin-edit-students-form', {
        result,
        fixedDate: dateSimpleConvert(result.studentBirthday).substring(0, 10)
      });
    })
    .catch(err => console.log(`Error while showing all students: ${err}`));
})

router.post(`/edit-student-form`, (req, res, next) => {
  const {
    id
  } = req.body;
  Student.findByIdAndUpdate(id, req.body)
    .then(updatedStudent => res.redirect(`/edit-students`))
    .catch(err => console.log(`Error while creating a new student: ${err}`));
});

// ADMIN DELETE ONE STUDENT ONLY
router.get(`/delete-student-refresh/:id`, checkAdmin, (req, res, next) => {
  const {
    id
  } = req.params;
  Student.findByIdAndDelete(id)
    .then(updatedStudent => res.redirect(`/edit-students`))
    .catch(err => console.log(`Error while creating a new student: ${err}`));
})

// // REPORT ALL STUDENTS
// router.get(`/student-report-all`, (req, res, next) => {
//   Student.find()
//     .then(result => {
//       res.render('student-report-all', {
//         result
//       });
//     })
//     .catch(err => console.log(`Error while showing all students: ${err}`));
// })

// REPORT ONE STUDENT
router.get(`/student-report-individual`, (req, res, next) => {
  Student.find()
    .then(result => {
      res.render('student-report-individual', {
        result
      });
    })
    .catch(err => console.log(`Error while showing all students: ${err}`));
})

// Formula to fix date

const dateSimpleConvert = (input) => {
  return input.toISOString()
}

// Export the module to the router
module.exports = router;