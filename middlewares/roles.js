//function to check on diretor, teacher and students.
const checkRoles = (role) => {
  return function (req, res, next) { 
    // console.log(req.isAuthenticated());
    // console.log(req.user.role);
    
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}

const checkDirector = checkRoles('DIRECTOR');
const checkTeacher = checkRoles('TEACHER');
const checkStudent = checkRoles('STUDENT');

module.exports = {
  checkRoles,
  checkDirector,
  checkTeacher,
  checkStudent
}