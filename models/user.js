const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  googleID: String,
  role: {
    type: String,
    enum: ['STUDENT', 'TEACHER', 'DIRECTOR'],
    default: 'STUDENT'
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;