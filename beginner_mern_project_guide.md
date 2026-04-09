# Beginner MERN Stack Project Guide

This guide walks you through building a beginner-friendly MERN (MongoDB, Express, React, Node.js) project with:
- Authentication (JWT-based)
- File Upload
- CRUD Operations
- React UI with Context API and Custom Hooks

---

## 1. Project Setup

### 1.1 Create Project Structure
```
mern-app/
  backend/
  frontend/
```

---

## 2. Backend Setup (Node.js + Express)

### 2.1 Initialize Backend
```
cd backend
npm init -y
npm install express mongoose cors dotenv jsonwebtoken bcrypt multer
npm install nodemon --save-dev
```

### 2.2 Basic Server Setup
Create `server.js`
```js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on port 5000'));
```

---

## 3. Authentication (JWT)

### 3.1 User Model
```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
```

### 3.2 Register API
```js
const bcrypt = require('bcrypt');

const hashedPassword = await bcrypt.hash(password, 10);
```

### 3.3 Login API
```js
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
```

### 3.4 Auth Middleware
```js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).send('Invalid Token');
  }
};
```

---

## 4. CRUD Operations

### 4.1 Create Model (Example: Post)
```js
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: String
});
```

### 4.2 CRUD APIs
- Create
- Read
- Update
- Delete

Example:
```js
app.post('/posts', authMiddleware, async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.send(post);
});
```

---

## 5. File Upload (Multer)

### 5.1 Setup Multer
```js
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });
```

### 5.2 Upload API
```js
app.post('/upload', upload.single('file'), (req, res) => {
  res.send({ file: req.file });
});
```

---

## 6. Frontend Setup (React)

### 6.1 Create React App
```
npx create-react-app frontend
cd frontend
npm install axios react-router-dom
```

---

## 7. React UI Structure

```
src/
  components/
  pages/
  context/
  hooks/
  services/
```

---

## 8. Context API for Auth State

### 8.1 Create Auth Context
```js
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 9. Custom Hook

### 9.1 useAuth Hook
```js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => useContext(AuthContext);
```

---

## 10. API Service Layer

```js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000'
});

export const login = (data) => API.post('/login', data);
```

---

## 11. Pages

- Login Page
- Register Page
- Dashboard
- CRUD Page (Posts)
- File Upload Page

---

## 12. Routing

```js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
```

---

## 13. Protected Routes

```js
if (!user) return <Navigate to="/login" />;
```

---

## 14. UI Suggestions

- Use Material UI / Tailwind CSS
- Add Navbar + Sidebar
- Form validation
- Toast notifications

---

## 15. Final Features Checklist

✔ User Authentication (Register/Login)
✔ JWT Authorization
✔ CRUD APIs
✔ File Upload
✔ React Context State Management
✔ Custom Hooks
✔ Clean UI

---

## 16. Bonus Improvements

- Add Pagination
- Add Search & Filters
- Use Redux Toolkit (optional)
- Deploy (Render / Vercel)

---

## 17. Run Project

### Backend
```
npm run dev
```

### Frontend
```
npm start
```

---

## Done 🎉

You now have a complete beginner MERN project with authentication, file upload, and CRUD functionality.

