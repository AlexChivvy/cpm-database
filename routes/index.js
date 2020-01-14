// The EXPRESS framework is built on top of the NODE.JS framework and helps in fast-tracking development of server-based applications by using routes to divert users to different parts of the web application based on the request made / flow information through the app.

const express = require('express');
const router  = express.Router();

// Link the models to this index



// HOME PAGE
router.get('/', (req, res, next) => {
  res.render('index');
});



// STUDENT ADMIN RELEVANT INFORMATION
const Student = require('../models/student.js');

router.get('/student-register', (req, res, next) => {
    res.render('admin-student');
  });

router.post('/student-record-form', (req, res, next) => {
    //first instantiate a new object on the basis of your existing model
    const newStudent = new Student(req.body)
    newStudent.timestampCreated = Date.now();
    //then save the new object in your database
    newStudent
    .save()
    .then(newStudentCreated => res.send(`A new student is created: ${newStudentCreated}!`))
    .catch(err => console.log(`Error while creating a new student: ${err}`)); 
});



// PROFESSOR ADMIN RELEVANT INFORMATION
const Professor = require('../models/professor.js');

router.get('/professor-register', (req, res, next) => {
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
const Class = require('../models/class.js');

router.get('/class-register', (req, res, next) => {
    res.render('admin-class');
  });

router.post('/class-record-form', (req, res, next) => {
    //first instantiate a new object on the basis of your existing model
    const newProfessor = new Professor(req.body)
    newProfessor.timestampCreated = Date.now();
    //then save the new object in your database
    newProfessor
    .save()
    .then(newProfessorCreated => res.send(`A new professor is created: ${newProfessorCreated}!`))
    .catch(err => console.log(`Error while creating a new professor: ${err}`)); 
});



// CLASS PROFESSOR INPUT RELEVANT INFORMATION
router.get('/class-input-report', (req, res, next) => {
    res.render('professor-input');
  });



// REPORT ALL STUDENTS
router.get(`/student-report-all`, (req, res, next) => {
    Student.find()
        .then(result => {
        res.render('student-report-all',{result});
        })
        .catch(err => console.log(`Error while showing all students: ${err}`)); 
})



// REPORT ONE STUDENT
router.get(`/student-report-individual`, (req, res, next) => {
    Student.find()
        .then(result => {
        res.render('student-report-individual',{result});
        })
        .catch(err => console.log(`Error while showing all students: ${err}`)); 
})



// Export the module to the router
module.exports = router;