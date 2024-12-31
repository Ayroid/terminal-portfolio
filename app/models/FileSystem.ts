// models/FileSystem.ts
import mongoose from 'mongoose';

const fileSystemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
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
  path: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for children
fileSystemSchema.virtual('children', {
  ref: 'FileSystem',
  localField: 'id',
  foreignField: 'parentId',
  justOne: false
});

// Indexes for better query performance
fileSystemSchema.index({ id: 1, owner: 1 }, { unique: true });
fileSystemSchema.index({ path: 1, owner: 1 }, { unique: true });
fileSystemSchema.index({ parentId: 1 });

const FileSystem = mongoose.models.FileSystem || mongoose.model('FileSystem', fileSystemSchema);
export default FileSystem;