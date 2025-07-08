# Complaint Management System

A full-stack web application for managing user complaints with admin oversight, built with Next.js, React, MongoDB, and JWT authentication.

## Features

### Core Features
- **User Interface**: Submit complaints with title, description, category, and priority
- **Admin Dashboard**: View, filter, and manage all complaints
- **CRUD Operations**: Full complaint lifecycle management
- **Email Notifications**: Automated emails for new complaints and status updates
- **Responsive Design**: Works across desktop and mobile devices

### Bonus Features
- **JWT Authentication**: Secure login system for users and admins
- **Live Deployment**: Hosted on [Vercel/Heroku] (link in description)

## Tech Stack

- **Frontend**: React, Next.js
- **Backend**: Node.js, Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: NodeMailer / SendGrid
- **Styling**: CSS Modules / Tailwind CSS

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/complaint-management-system.git
   cd complaint-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/complaints
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ADMIN_EMAIL=admin@example.com
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser

## MongoDB Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Database will be created automatically

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create new cluster
3. Get connection string and update `MONGODB_URI` in `.env.local`

## Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate app password: Account Settings → Security → App Passwords
3. Use app password in `EMAIL_PASS` environment variable

### Alternative Email Services
- **SendGrid**: Replace NodeMailer configuration with SendGrid API
- **Mailgun**: Update email service configuration accordingly

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | User/Admin login | No |
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/complaints` | Create complaint | User |
| GET | `/api/complaints` | Get all complaints | Admin |
| PUT | `/api/complaints/[id]` | Update complaint | Admin |
| DELETE | `/api/complaints/[id]` | Delete complaint | Admin |

## User Roles

### Regular Users
- Register and login
- Submit complaints
- View own complaint history

### Administrators
- Access admin dashboard
- View all complaints
- Update complaint status
- Delete complaints
- Receive email notifications

## Default Admin Account

For testing purposes, create an admin account:
- Email: `admin@example.com`
- Password: `admin123`

## Project Structure

```
complaint-management-system/
├── components/
│   ├── AdminDashboard.js
│   ├── ComplaintForm.js
│   ├── LoginForm.js
│   ├── RegisterForm.js
│   └── AuthContext.js
├── lib/
│   ├── email.js
│   ├── mongodb.js
│   ├── auth.js
│   └── models/
│       ├── Complaint.js
│       └── User.js
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   ├── admin/
│   │   └── dashboard.js
│   └── api/
│       ├── hello.js
│       ├── auth/
│       │   ├── login.js
│       │   ├── register.js
│       │   └── me.js
│       └── complaints/
│           ├── [id].js
│           └── index.js
├── public/
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── styles/
│   └── globals.css
├── tailwind.config.js
├── postcss.config.mjs
├── next.config.mjs
├── jsconfig.json
├── eslint.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push

### Heroku
1. Create Heroku app
2. Set environment variables
3. Deploy using Git or GitHub integration

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/complaints` |
| `JWT_SECRET` | JWT signing secret | `your_secret_key` |
| `EMAIL_USER` | Email service username | `your_email@gmail.com` |
| `EMAIL_PASS` | Email service password | `your_app_password` |
| `ADMIN_EMAIL` | Admin notification email | `admin@example.com` |

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Live Demo

**[View Live Demo](https://complaint-management-system-tau.vercel.app)**
