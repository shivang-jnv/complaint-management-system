import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a complaint title'],
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a complaint description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Product', 'Service', 'Support', 'Billing', 'Other']
  },
  priority: {
    type: String,
    required: [true, 'Please select a priority'],
    enum: ['Low', 'Medium', 'High']
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'In Progress', 'Resolved']
  },
  dateSubmitted: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  }
});

// Update dateUpdated on save
ComplaintSchema.pre('save', function(next) {
  this.dateUpdated = Date.now();
  next();
});

export default mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);