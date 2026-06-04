# 🚀 Link-O-Pilot

## Smart URL Management & Analytics Platform

Link-O-Pilot is a modern full-stack URL shortening and analytics platform that enables users to create, manage, monitor, and analyze shortened links through an intuitive dashboard. The platform provides real-time analytics, QR code generation, trending link discovery, user feedback management, and a dedicated admin control panel.

---

# 📌 Problem Statement

Managing and tracking URLs efficiently is an important requirement for individuals, creators, marketers, and businesses. Traditional URL shortening services often lack analytics, user management, and actionable insights.

Link-O-Pilot solves this by combining:

* URL shortening
* Click analytics
* QR code generation
* Trending content discovery
* User management
* Administrative controls

into a single modern platform.

---

# 🏗️ AI Planning Document

## Step 1: Requirement Analysis

The application requirements were analyzed and divided into two major modules:

### User Module

* Authentication
* Link Management
* Analytics Dashboard
* QR Code Generation
* Trending Links
* Feedback System
* Profile Management

### Admin Module

* Admin Authentication
* Platform Analytics
* User Monitoring
* Top Links Analysis
* Top Users Analysis
* Feedback Resolution

---

## Step 2: Feature Planning

The application was planned using a modular architecture.

### Authentication System

* User Registration
* User Login
* Protected Routes
* Admin Login
* JWT Authentication

### Link Management

* Create Link
* Edit Link
* Delete Link
* Custom Alias
* Public / Private Links
* Expiration Date Support
* QR Code Generation

### Analytics

* Total Click Tracking
* Device Analytics
* Browser Analytics
* Visitor Tracking
* Last Visit Monitoring
* Link Performance Trends

### Trending Module

* Top Performing Links
* Category Filtering
* Trending Leaderboard

### Feedback Module

* User Suggestions
* Admin Resolution Workflow

### Admin Dashboard

* Total Users
* Total Links
* Total Clicks
* Total Feedback
* Top Users
* Top Links
* Feedback Management

---

## Step 3: Architecture Planning

Frontend and backend were separated to improve scalability and maintainability.

### Frontend

React + Vite

### Backend

Node.js + Express.js

### Database

MongoDB Atlas

### Authentication

JWT

---

# 🏛️ Architecture Diagram

```text
┌────────────────────┐
│     React App      │
│     (Frontend)     │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│     Express API    │
│      Backend       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│    MongoDB Atlas   │
│      Database      │
└────────────────────┘
```

---

# ✨ Features

## User Features

### Authentication

* User Registration
* User Login
* Session Management

### Dashboard

* Total Links
* Total Clicks
* Active Links
* Recent Activity

### Link Management

* Create Short Links
* Edit Existing Links
* Delete Links
* Generate QR Codes
* Custom Alias Support
* Public / Private Links

### Analytics

* Click Tracking
* Browser Statistics
* Device Statistics
* Visitor Monitoring
* Performance Charts

### Trending

* Trending Public Links
* Category Filtering

### Feedback

* Submit Suggestions
* Product Improvement Requests

### Profile

* User Information
* Profile Editing

---

## Admin Features

### Admin Login

### Admin Command Center

View:

* Total Users
* Total Links
* Total Clicks
* Total Feedback

### User Monitoring

View:

* User Name
* Email

### Top Links

Monitor:

* Most Clicked Links
* Performance Ranking

### Top Users

Monitor:

* Most Active Users
* Total Links
* Total Clicks

### Feedback Resolution

* View Feedback
* Mark Suggestions as Resolved

---

# 🧰 Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Recharts
* React Icons
* React Hot Toast
* Tailwind CSS
* GSAP

## Backend

* Node.js
* Express.js
* JWT
* bcryptjs
* Mongoose

## Database

* MongoDB Atlas

---

# 📂 Project Structure

```text
Link-O-Pilot

├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   ├── routes
│   └── context
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── config
│
└── README.md
```

---

# ⚙️ Setup Instructions

## Clone Repository

```bash
git clone <your-github-url>
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

BASE_URL=http://localhost:5000
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

# 📋 Assumptions Made

* Users have unique email addresses.
* JWT is used for authentication.
* MongoDB Atlas is available.
* Public links can appear in Trending.
* Admin credentials are seeded manually.
* QR codes are generated during link creation.
* Analytics are based on recorded click events.

---

# 🧪 Sample Outputs

## Links Management:
<img width="1558" height="861" alt="image" src="https://github.com/user-attachments/assets/2b1a1d62-4c05-4d89-a595-d647ac7a4e4f" />


## User Dashboard:
<img width="1549" height="952" alt="image" src="https://github.com/user-attachments/assets/9c443d2f-ef7d-47da-90cf-94ad9088e7fe" />

## Mongo Atlas DataBase:
<img width="1918" height="801" alt="image" src="https://github.com/user-attachments/assets/957ed167-6da0-4390-aa52-0aa51342c07f" />


## User Dashboard

Displays:

* Total Links
* Total Clicks
* Active Links
* Recent Activity

---

## Analytics Dashboard

Displays:

* Browser Analytics
* Device Analytics
* Click Trends
* Visitor Tracking

---

## Admin Dashboard

Displays:

* Total Users
* Total Links
* Total Clicks
* Total Feedback
* Top Links
* Top Users

---

## Database Collections

### Users

```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Links

```json
{
  "_id": "...",
  "title": "Portfolio",
  "shortCode": "abc123",
  "clicks": 42
}
```

### Feedback

```json
{
  "_id": "...",
  "message": "Add export feature",
  "status": "resolved"
}
```

---

# 🤖 AI Usage

AI tools were used throughout development for:

* Application Planning
* UI Design Iterations
* Architecture Discussions
* Component Generation
* Refactoring
* Documentation

All generated code was reviewed, modified, tested, and understood before integration.

---

# 🎥 Project Demonstration Video

YouTube / Loom Link:


https://youtu.be/5xb3LXQ0ar8

The demonstration video includes:

* Application Overview
* User Flow
* Admin Flow
* Database Demonstration
* API Demonstration
* Analytics Demonstration

---

# 🚀 Future Improvements

* CSV Analytics Export
* Avatar Upload
* Password Reset
* Admin User Management
* Admin Link Management
* Advanced Analytics
* Team Collaboration Features

---

# 👨‍💻 Developer

Sudharshan R

Full Stack Developer-MERN

---

This project is a part of a hackathon run by https://katomaran.com
