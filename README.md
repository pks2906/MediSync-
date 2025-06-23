

# MediSync — Medical Resource Coordination Platform

MediSync is a full-stack, real-time web platform that helps hospitals coordinate and manage critical medical resources efficiently. Built with Express, PostgreSQL, Prisma, and React, MediSync enables seamless registration, live inventory sharing, inter-hospital requests, and real-time updates.

---

##  Features

```
Hospital Management
✓ Register hospitals
✓ View list of registered hospitals

Resource Inventory
✓ Add/update resource data (oxygen, beds, etc.)
✓ View real-time hospital inventories

Resource Requests
✓ Send resource requests between hospitals
✓ Approve or decline incoming requests

Real-time Communication
✓ Live updates via Socket.IO
✓ Instant notifications on request activity

Responsive Frontend
✓ Built with basic CSS and React
✓ Mobile-friendly tables and forms
```

---

##  Tech Stack

| Layer      | Tech Used                                |
| ---------- | ---------------------------------------- |
| Backend    | Node.js, Express, Prisma ORM, PostgreSQL |
| Database   | Supabase (PostgreSQL) or NeonDB          |
| Realtime   | Socket.IO                                |
| Frontend   | React (CRA), Axios, Basic CSS            |
| Deployment | Backend (Render), Frontend (Vercel)      |

---



---

##  Project Structure

```
medisync/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── index.js
│   ├── prisma/
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── socket.js
│   │   ├── App.js
│   │   ├── index.css
└── README.md
```

---

##  API Endpoints Summary

| Method | Endpoint        | Description                   |
| ------ | --------------- | ----------------------------- |
| POST   | `/hospitals`    | Register a hospital           |
| GET    | `/hospitals`    | List all hospitals            |
| POST   | `/resources`    | Add/update hospital inventory |
| GET    | `/resources`    | View all hospital resources   |
| POST   | `/requests`     | Send resource request         |
| GET    | `/requests`     | List all requests             |
| PUT    | `/requests/:id` | Approve or decline a request  |

---

##  How to Run Locally

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

> Add your `.env` based on `.env.example`

---

### Frontend

```bash
cd frontend
npm install
npm start
```

> Socket.IO client auto-connects to backend running at `http://localhost:5000`

---

##  `.env.example`

```env
# backend/.env.example
DATABASE_URL=postgresql://user:password@host:port/dbname
PORT=5000
```

---

##  Security Note

This project contains `.env` files and private credentials.
→ All secrets are excluded using `.gitignore`
→ When sharing code, create a `.env.example` instead.

---

##  Postman Collection

```
All major API routes tested using Postman with deployed backend URL.
Screenshots are attached in submission zip file.
```

---



