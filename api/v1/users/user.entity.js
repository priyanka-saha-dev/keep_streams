const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId : {
    type: String,
    unique: true,
    require: true
  },
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

// userSchema.pre('save', function (next) {
//   let user = this;
//   if (this.isModified('password') || this.isNew) {
//     bcrypt.genSalt(10, function (err, salt) {
//       if (err) {
//         next(err);
//       }
//       bcrypt.hash(user.password, salt, function (error, hash) {
//         if (error) {
//           next(error);
//         }
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     next();
//   }
// });

module.exports = mongoose.model('user', userSchema);