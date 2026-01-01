# 🛡 Super Admin Dashboard – LiftUpLabs

A full-stack **Super Admin (Website Owner) Dashboard** built to manage and verify
**Institutions, Students, and Counselors** across the LiftUpLabs platform.

The Super Admin has **complete control** over users, verification, analytics,
and system-wide settings.

---

## 🚀 Core Features

- Super Admin authentication (JWT)
- Institution verification system
- Student verification system
- Counselor verification system
- Platform-wide user management
- Verification logs & audit trails
- Analytics & reports
- Secure role-based access

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Recharts / Chart.js

### Backend
- Node.js
- Express.js
- JWT Authentication
- REST APIs

### Database
- PostgreSQL
- ORM: Prisma / Sequelize

---

## 👤 Roles

| Role | Description |
|---|---|
| Super Admin | Website Owner / Platform Creator |
| Institution Admin | School / College Admin |
| Student | Platform Student |
| Counselor | Platform Counselor |

---



super-admin-system/
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/admin/
│ │ ├── layouts/
│ │ ├── services/
│ │ └── utils/
│
├── server/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ ├── models/
│ │ └── services/
│
├── database/
│ └── schema.sql
│
├── .env.example
└── README.md


Full System Architecture (Text Diagram)

[ Super Admin (Browser) ]
          |
          |  React Dashboard
          v
[ Frontend (React) ]
          |
          |  JWT Auth + REST APIs
          v
[ Node.js + Express API ]
          |
          |  ORM (Prisma / Sequelize)
          v
[ PostgreSQL Database ]
          |
          ├── Super Admins
          ├── Institutions
          ├── Students
          ├── Counselors
          ├── Verification Docs
          └── Verification Logs



## 📁 Project Structure

