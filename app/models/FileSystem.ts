// models/FileSystem.ts
import mongoose from 'mongoose';

const fileSystemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['directory', 'file'],
    required: true,
  },
  parentId: {
    type: String,
    default: '',
  },
  childrenId: [{
    id: String,
    type: String,
  }],
  content: {
    type: String,
    default: '',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Add indexes for better query performance
fileSystemSchema.index({ id: 1, owner: 1 }, { unique: true });
fileSystemSchema.index({ parentId: 1 });

export default mongoose.models.FileSystem || mongoose.model('FileSystem', fileSystemSchema);