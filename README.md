# Contract Management Platform (Full Stack)

## Overview
This project is a full-stack Contract Management Platform that allows users to:
- Create reusable contract blueprints
- Generate contracts from blueprints
- Manage contracts through a controlled lifecycle
- View and manage contracts from a dashboard

The system demonstrates backend lifecycle enforcement, clean API design,
data modeling, and frontend–backend integration.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- REST APIs

### Frontend
- React
- TypeScript
- Vite
- Axios

Authentication is mocked as allowed by the assignment.

---

## Architecture Overview
Frontend (React)
|
| REST APIs
v
Backend (Express + Prisma)
|
v
MySQL Database


- Backend enforces all business rules and lifecycle transitions
- Frontend only reflects allowed actions from backend state

---

## Data Models

### Blueprint
A reusable contract template.

- id
- name
- fields (type, label, position)
- createdAt

### Contract
An instance created from a blueprint.

- id
- name
- blueprintId
- status
- fields (values inherited from blueprint)
- createdAt

---

## Contract Lifecycle
CREATED → APPROVED → SENT → SIGNED → LOCKED
CREATED → REVOKED
SENT → REVOKED


Rules:
- Invalid transitions are rejected by the backend
- Locked contracts are immutable
- Revoked contracts cannot move forward

Lifecycle enforcement is implemented at the service layer.

---

## API Design Summary

### Blueprint APIs
- POST /blueprints
- GET /blueprints
- GET /blueprints/:id
- DELETE /blueprints/:id

### Contract APIs
- POST /contracts
- GET /contracts
- GET /contracts/:id
- PATCH /contracts/:id/status

---

## Frontend Features

- Contract dashboard with table view
- Filters: Pending, Active, Signed
- Lifecycle action buttons based on current status
- Real-time updates after state changes

UI focuses on clarity and workflow correctness.

---

## Setup Instructions

### Backend Installations
```bash
cd backend
npm install
npx prisma migrate dev
npx prisma generate
npx ts-node src/index.ts

## Backend runs on:
http://localhost:4000

## Frontend Installations
cd frontend
npm install
npm run dev

## Frontend runs on:
http://localhost:5173

## Assumptions & Trade-offs

Authentication is mocked to focus on core workflow
No role separation (approver/signer) implemented
UI prioritizes usability over visual polish
Lifecycle rules are centralized in backend logic