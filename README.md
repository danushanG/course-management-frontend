### 📌 Frontend (`course-management-ui/README.md`)
```markdown
University Course Management System - Frontend

This is the **React frontend** for the University Course Management System.  
It connects to the Spring Boot backend via REST APIs.

## 🚀 Features
- Course Management (Add, View, Edit, Delete)
- Student Registration
- Results Management
- Modern UI with React & Bootstrap

## ⚙️ Tech Stack
- React.js
- Axios (API calls)
- Bootstrap
- Node.js

## 📂 Project Structure
course-management-ui/
├── src/
│ ├── App.js # Main app
│ ├── components/ # Course, Student, Result forms
│ └── App.css # Styling
├── package.json
└── public/

## ▶️ Run Locally
1. Clone repo  
   ```bash
   git clone <frontend-repo-link>
   cd course-management-ui

2. Install dependencies
   npm install

3. Start app
   npm start

🐳 Run with Docker

1. Build image
   docker build -t course-management-frontend

2. Run container
   docker run -p 80:80 course-management-frontend

📌 Deployment
Deployed on Railway.
https://<frontend-service>.railway.app

👨‍💻 Author
Danushan Ganeshan
CT/2019/032

