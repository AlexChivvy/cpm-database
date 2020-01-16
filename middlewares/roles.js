//function to check on diretor, teacher and students.
const checkRoles = (role) => {
  return function (req, res, next) { 
    // console.log(req.isAuthenticated());
    // console.log(req.user.role);
    
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      // next()
      res.redirect('/login')
    }
  }
}

const checkTwoRoles = (admin, professor) => {
  return function (req, res, next) { 
    
    if (req.isAuthenticated() && (req.user.role === admin || req.user.role === professor)) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}

const checkThreeRoles = (admin, professor, student) => {
  return function (req, res, next) {
    
    if (req.isAuthenticated() && (req.user.role === admin || req.user.role === professor || req.user.role === student)) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}

const checkAdmin = checkRoles('ADMIN');
const checkProfessor = checkRoles('PROFESSOR');
const checkStudent = checkRoles('STUDENT');
const checkAdminProfessor = checkTwoRoles('ADMIN', 'PROFESSOR');
const checkAdminProfessorStudent = checkThreeRoles('ADMIN', 'PROFESSOR','STUDENT'); 

module.exports = {
  checkRoles,
  checkAdmin,
  checkProfessor,
  checkStudent,
  checkAdminProfessor,
  checkAdminProfessorStudent
}