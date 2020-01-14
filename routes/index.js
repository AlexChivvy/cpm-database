// The EXPRESS framework is built on top of the NODE.JS framework and helps in fast-tracking development of server-based applications by using routes to divert users to different parts of the web application based on the request made / flow information through the app.

const express = require('express');
const router  = express.Router();

// Link the models to this index



// HOME PAGE
router.get('/', (req, res, next) => {
  res.render('index');
});


// STUDENT INPUT RELEVANT INFORMATION
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


// PROFESSOR INPUT RELEVANT INFORMATION
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

// CLASS INPUT RELEVANT INFORMATION
const Class = require('../models/class.js');

router.get('/class-register', (req, res, next) => {
    res.render('admin-class');
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



// REPORT ALL STUDENTS
router.get(`/all-students`, (req, res, next) => {
    Student.find()
        .then(result => {
        res.render('all-students',{result});
        })
        .catch(err => console.log(`Error while showing all students: ${err}`)); 
})

// REPORT ALL PROFESSORS
router.get(`/all-students`, (req, res, next) => {
    Student.find()
        .then(result => {
        res.render('all-students',{result});
        })
        .catch(err => console.log(`Error while showing all students: ${err}`)); 
})

// Export the module to the router
module.exports = router;