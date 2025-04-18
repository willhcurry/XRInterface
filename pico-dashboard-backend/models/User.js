const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  displayName: {
    type: String,
    trim: true,
    default: function() {
      return this.username;
    }
  },
  avatar: {
    type: String,
    default: 'default-avatar' // We'll replace this with actual avatars later
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  status: {
    online: {
      type: Boolean,
      default: false
    },
    lastActive: {
      type: Date,
      default: Date.now
    },
    currentActivity: {
      type: String,
      default: ''
    }
  },
  vrSettings: {
    playerHeight: {
      type: Number,
      default: 1.7 // Default height in meters
    },
    handedness: {
      type: String,
      enum: ['left', 'right'],
      default: 'right'
    },
    movementType: {
      type: String,
      enum: ['smooth', 'teleport', 'mixed'],
      default: 'smooth'
    },
    comfortSettings: {
      reducedMotion: {
        type: Boolean,
        default: false
      },
      vignette: {
        type: Boolean,
        default: true
      },
      snapTurning: {
        type: Boolean,
        default: false
      },
      turnAngle: {
        type: Number,
        default: 45
      }
    }
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password using the new salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
