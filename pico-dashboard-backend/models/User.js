const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now },
  // XR specific settings
  vrSettings: {
    playerHeight: { type: Number, default: 1.7 },
    controllerHandedness: { type: String, default: 'right' },
    movementPreference: { type: String, default: 'smooth' },
    comfortMode: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model('User', UserSchema);
