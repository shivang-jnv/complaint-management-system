import connectDB from '../../../lib/mongodb';
import Complaint from '../../../lib/models/Complaint';
import { sendStatusUpdateEmail, sendUserStatusUpdateEmail } from '../../../lib/email';
import { authenticate, authorize } from '../../../lib/auth';

const handler = async function handler(req, res) {
  const { id } = req.query;
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const complaint = await Complaint.findById(id);
        if (!complaint) {
          return res.status(404).json({ success: false, error: 'Complaint not found' });
        }
        res.status(200).json({ success: true, data: complaint });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const complaint = await Complaint.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        
        if (!complaint) {
          return res.status(404).json({ success: false, error: 'Complaint not found' });
        }

        // Send email notification if status was updated
        if (req.body.status) {
          await sendStatusUpdateEmail(complaint);
          await sendUserStatusUpdateEmail(complaint);
        }

        res.status(200).json({ success: true, data: complaint });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const complaint = await Complaint.findByIdAndDelete(id);
        if (!complaint) {
          return res.status(404).json({ success: false, error: 'Complaint not found' });
        }
        res.status(200).json({ success: true, data: {} });
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
    return authenticate(authorize(['user', 'admin'])(handler))(req, res);
  }
  if (req.method === 'PUT' || req.method === 'DELETE') {
    return authenticate(authorize(['admin'])(handler))(req, res);
  }
  return handler(req, res);
}