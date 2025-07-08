import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendNewComplaintEmail = async (complaint) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Complaint Submitted: ${complaint.title}`,
    html: `
      <h2>New Complaint Received</h2>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>Category:</strong> ${complaint.category}</p>
      <p><strong>Priority:</strong> ${complaint.priority}</p>
      <p><strong>Description:</strong></p>
      <p>${complaint.description}</p>
      <p><strong>Date Submitted:</strong> ${new Date(complaint.dateSubmitted).toLocaleString()}</p>
      <p>Please log in to the admin dashboard to manage this complaint.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('New complaint email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendStatusUpdateEmail = async (complaint) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `Complaint Status Updated: ${complaint.title}`,
    html: `
      <h2>Complaint Status Updated</h2>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>New Status:</strong> ${complaint.status}</p>
      <p><strong>Category:</strong> ${complaint.category}</p>
      <p><strong>Priority:</strong> ${complaint.priority}</p>
      <p><strong>Date Updated:</strong> ${new Date(complaint.dateUpdated).toLocaleString()}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Status update email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendUserStatusUpdateEmail = async (complaint) => {
  if (!complaint.email) return;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: complaint.email,
    subject: `Your Complaint Status Updated: ${complaint.title}`,
    html: `
      <h2>Your Complaint Status Has Been Updated</h2>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>New Status:</strong> ${complaint.status}</p>
      <p><strong>Category:</strong> ${complaint.category}</p>
      <p><strong>Priority:</strong> ${complaint.priority}</p>
      <p><strong>Date Updated:</strong> ${new Date(complaint.dateUpdated).toLocaleString()}</p>
      <p>If you have further questions, please reply to this email.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('User status update email sent successfully');
  } catch (error) {
    console.error('Error sending user status update email:', error);
  }
};
