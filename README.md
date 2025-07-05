# 🎓 College Portal

A full-stack college portal application where students can access notes and question papers (QPs), with a "Starred" feature for saving important files. The app supports login via password or email-based OTP.

[🔗 Visit the live project](https://hiethub.netlify.app
)

## 🚀 Features

- 📚 **Notes & Question Papers**: Browse and download academic resources.
- ⭐ **Starred Files**: Save important notes/QPs to view under one section.
- 🔐 **Login System**:
  - Password-based login
  - OTP-based login via email
- 🧠 **React Frontend**
- ⚙️ **Express Backend**
- 🗃️ **MongoDB Database**

## 🛠️ Tech Stack

| Layer     | Technology             |
|-----------|------------------------|
| Frontend  | React.js               |
| Backend   | Node.js, Express.js    |
| Database  | MongoDB + Mongoose     |
| Auth      | Nodemailer for OTP     |
|Deployment | Netlify (Frontend), Render(Backend)|



## 📦 Project Structure

### Frontend
- `/src`
  - `/components`: Navbar,Notes, QPs, Login, Starred
  - `/css` : For all css files
  - `/assets`: Connection strings such as backend
  - `App.jsx`, `main.jsx`

### Backend

  - `/routes`: API endpoints
  - `/notes` : Notes directory
  - `/qps` : Previous Year Question Papers
  - `/models`: MongoDB schemas (User, File)
  - `server.js`

## 🔐 Authentication

- On login page, users can:
  - Enter username (email) & password
  - Request OTP via registered email (via Nodemailer)

    (Both methods use Server-side Sessions )

## 📁 Starred Functionality

- Every file (note or QP) has a ⭐ toggle
- Starred items appear under the `Starred` tab
- Saved in user's profile in MongoDB

## ⚙️ Getting Started

### Terminal commands

```bash
# Backend
cd backend
npm install
nodemon server.js

# Frontend
cd frontend
npm install
npm run dev
```

### Frontend .env Structure
```env  
VITE_BACKEND_URL="http://localhost:5000"  //Specify backend URL here
```
 ### Backend .env Structure

 ```env
 SESSION_SECRET="Store Session Secret here"
EMAIL_PASS="abcdefghijklmnop"
EMAIL_USER="abc123@gmail.com"
FRONT_END="http://localhost:5173"
MONGO_DATABASE="mongodb://localhost:27017/notesApp"
 ```
