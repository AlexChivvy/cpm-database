// The EXPRESS framework is built on top of the NODE.JS framework and helps in fast-tracking development of server-based applications by using routes to divert users to different parts of the web application based on the request made / flow information through the app.

const express = require('express');
const router  = express.Router();

// Link the models to this index
const Professor = require('../models/professor.js');
const Class = require('../models/class.js');
const Student = require('../models/student.js');


// Get the home page
router.get('/', (req, res, next) => {
  res.render('index');
});

// Get the student input page
router.get('/student-register', (req, res, next) => {
  res.render('adminstudent');
});


// Get information from input page
router.post('/student-register/student-record-form', (req, res, next) => {
  //first instantiate a new object on the basis of your existing model
  const newStudent = new Student(req.body)
  newStudent.timestampCreated = Date.now();
  //then save the new object in your database
  newStudent
  .save()
  .then(newStudentCreated => res.send(`A new student is created: ${newStudentCreated}!`))
  .catch(err => console.log(`Error while creating a new place: ${err}`)); 
});

// Export the module to the router
module.exports = router;