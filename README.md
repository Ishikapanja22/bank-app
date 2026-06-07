# MERN Bank App

A full-stack banking web application built with the MERN stack. Features dual roles — User and Admin — with secure JWT authentication.

## Live Demo
(https://bank-app-je5h.vercel.app/)

## Preview
banl preview (https://github.com/Ishikapanja22/bank-app/blob/main/bank%20preview.png)

## Features

### User
-  Register & Login with JWT Auth
-  Transfer Money to other users
-  View Transaction History
-  Download PDF Bank Statement
-  Apply for Loans

###  Admin
-  Admin Dashboard
-  Manage All Users
-  View All Transactions
-  Approve / Reject Loan Requests

##  Tech Stack
- Frontend : React + Vite
- Backend : Node.js + Express
- Database : MongoDB
- Ant Design
- JWT Auth 
- Mongoose
- Tailwind CSS
- REST API
- Axios
- bcryptjs 

##  Getting Started

### Backend
```bash
cd backend
npm install
npm run dev
```
Create a `.env` file in backend:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

### Frontend
```bash
cd frontend
npm install
npm run dev
```

##  Folder Structure
mern-bank-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── frontend/
├── src/
│   ├── pages/
│   │   ├── admin/
│   │   └── user/
│   ├── layouts/
│   └── routes/
└── index.html
