# Todo List App - Setup Guide 📝

This is a full-stack **Todo List App** built with **React (frontend)** and **Node.js with Express (backend)**, using a **mock JSON file** as a database.

---

## 🚀 Features
✅ User Authentication (Login/Register)  
✅ Add, Update, Delete Todos  
✅ Fetch Todos for Specific Users  
✅ Redux for State Management  
✅ Backend with Node.js & Express  
✅ Mock JSON File as Data Storage  

---

# 🛠️ Installation Guide

## 📌 Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v16+ recommended) → [Download](https://nodejs.org/)
- **Git** (For version control) → [Download](https://git-scm.com/)

---

## 📂 Packages installed

For frontend - 
1. bootstrap
2. react-redux
3. react-router-dom

For backend - 
1. express
2. express-session
3. cors

# Todo List App - How It Works 📝

This document explains the **flow of the application**, from user authentication to managing todos.

---

## 🚀 Steps to Use the Application

### **1️⃣ Start the Application**
1. Open a terminal and navigate to the src/backend (`server`) folder.
- This will start the backend on `http://localhost:5000` after running command as node server.

2. Open a new terminal and navigate to the frontend (`todo-list-app`) folder.
- This will start the frontend on `http://localhost:3000`.

---

### **2️⃣ User Authentication (Login)**
- On the homepage, **enter your username** to log in.
- This username is stored in the application state.
- If no username is provided, you won’t be able to add or view todos.

---

### **3️⃣ Adding a New Todo**
1. After logging in, go to the **Todo Input Field**.
2. Type your task and click the **"Add Todo"** button.
3. The todo will be saved in the **mock database (db.json)** and displayed in the list.

---

### **4️⃣ Viewing Todos**
- On login, the app fetches todos **specific to the logged-in user**.
- The todos are retrieved from `http://localhost:5000/api/todos?user=username`.

---

### **5️⃣ Updating a Todo**
1. Click on a todo item to **toggle its completion status**.
2. The updated todo will be saved in `db.json`.

---

### **6️⃣ Deleting a Todo**
1. Click the **Delete** button next to a todo item.
2. The todo will be removed from `db.json`.

---

### **7️⃣ How Data is Stored**
- The todos are stored in a **mock JSON file (db.json)** instead of a database.
- Example JSON structure:
```json
"users": {
    "bruce34": {
      "password": "Bruce@3456",
      "todos": [
        {
          "id": 1740291668789,
          "text": "sdfsdv",
          "completed": false
        },
        {
          "id": 1740291672334,
          "text": "efcdsf",
          "completed": false
        },
        {
          "id": 1740291676016,
          "text": "wedwdwe",
          "completed": false
        },
        {
          "id": 1740479563915,
          "text": "tertgfd",
          "completed": false
        }
      ]
    }
}

# Todo List App - API Endpoints  

## Authentication APIs  
POST /api/register  
POST /api/login  
GET /api/verify-session  
POST /api/logout  

## Todo APIs  
GET /api/todos/:username  
POST /api/todos/:username  
PUT /api/todos/:username/:todoId  
PUT /api/todos/:username/:todoId/edit  
DELETE /api/todos/:username/:todoId 


