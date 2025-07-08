import connectDB from '../../../lib/mongodb';
import Complaint from '../../../lib/models/Complaint';
import { sendNewComplaintEmail } from '../../../lib/email';
import { authenticate, authorize } from '../../../lib/auth';

const handler = async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const { status, priority } = req.query;
        let filter = {};
        
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        const complaints = await Complaint.find(filter).sort({ dateSubmitted: -1 });
        res.status(200).json({ success: true, data: complaints });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const complaint = await Complaint.create({ ...req.body, user: req.user._id });
        
        // Send email notification
        await sendNewComplaintEmail(complaint);
        
        res.status(201).json({ success: true, data: complaint });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
};

export default function main(req, res) {
  if (req.method === 'GET') {
    return authenticate(authorize(['admin'])(handler))(req, res);
  }
  if (req.method === 'POST') {
    return authenticate(authorize(['user', 'admin'])(handler))(req, res);
  }
  return handler(req, res);
}