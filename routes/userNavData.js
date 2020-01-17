const getUserNavData = (req) => {
  const userNavData = {
    userName: "Not Logged In",
    acessLevel: "No",
    loggedIn: false,
  }
  if (req.user) {
    userNavData.userName = req.user.username;
    userNavData.acessLevel = req.user.role;
    userNavData.loggedIn = true;
  }
  return userNavData;
}

module.exports = {getUserNavData};