# 🎯 EVENTIFY – Student Event Discovery Platform

---

## 📌 Basic Details

| Field | Details |
|-------|---------|
| **Project Name** | EVENTIFY |
| **Team Name** | [CodeStorm] |

---

## 👥 Team Members

| Member | College |
|--------|---------|
| [Janvi Ravindra Jadav] | [ASIET] |
| [Lakshmipriya K J] | [ASIET] |

---

## 🌐 Hosted Project Link

- 🔗 **Live Demo:** [eventify-sooty-eight.vercel.app]
- 🔗 **GitHub Repository:** [https://github.com/Janvi-jadhav/Eventify.git]

---

## 📖 Project Description

**EVENTIFY** is a modern, animated, and student-friendly web platform that helps college students discover hackathons, workshops, cultural events, sports competitions, and more — personalized based on their interests and preferences.

The platform provides intelligent filtering, wishlist management, calendar tracking, and an achievement-driven profile system in a vibrant, engaging UI.

---

## ❗ Problem Statement

Students often miss valuable opportunities such as hackathons, workshops, cultural & sports events, internships, and college fests because information is scattered across multiple platforms like WhatsApp, Telegram, notice boards, and social media.

There is no centralized, personalized platform tailored specifically for students.

---

## 💡 The Solution

EVENTIFY solves this by:

- Providing a **centralized event discovery platform**
- Allowing **preference-based filtering**
- Enabling **wishlist and bookmarking**
- Showing registered events in a **calendar view**
- Providing an **achievement-oriented profile dashboard**

It ensures students never miss opportunities relevant to their interests.

---

## 🛠 Technical Details

### Languages Used
- JavaScript
- HTML5
- CSS3

### Frameworks Used
- React.js
- Node.js
- Express.js

### Libraries Used
- Axios
- Framer Motion
- React Router DOM
- Tailwind CSS

### Tools Used
- VS Code
- Git & GitHub
- Vercel / Render
- Postman

---

## ✨ Features

### 1️⃣ Personalized Preferences
Students can select categories like Tech, Non-Tech, Cultural, and Sports.

### 2️⃣ Trending Events Dashboard
Modern animated cards displaying event details with filters.

### 3️⃣ Wishlist System
Bookmark events and manage saved opportunities.

### 4️⃣ Smart Filtering
Filter by College, Date, Mode (Online/Offline), and Fee (Free/Paid).

### 5️⃣ Calendar Integration
Monthly view showing registered events and deadlines.

### 6️⃣ Achievement Profile
Track participation, certificates, and event history.

---

## 🚀 Implementation

### 📦 Installation

**Backend**
```bash
cd server
npm install
```

**Frontend**
```bash
cd client
npm install
```

### ▶️ Run

**Backend**
```bash
npm start
# Runs on http://localhost:5000
```

**Frontend**
```bash
npm start
# Runs on http://localhost:3000
```

---

## 📸 Project Documentation

### Screenshots

| Page | Description |
|------|-------------|
| 🔐 **Login Page** | Animated login screen with gradient background and glassmorphism card |
| 🏠 **Dashboard** | Trending events with animated hover effects and wishlist option |
| 🎯 **Preferences Page** | Interactive category selection with animated cards |

---

## 🧩 System Architecture

```
Frontend (React + Tailwind + Framer Motion)
              ⬇
     REST API (Node.js + Express)
              ⬇
     Database (MongoDB / Firebase)
```

### Data Flow
1. User logs in
2. Preferences saved to database
3. Events fetched via API
4. Filters applied dynamically
5. User interactions update database (wishlist, registrations)

---

## 🔄 Application Workflow

```
Login → Select Preferences → Dashboard → Browse / Filter Events
     → Save or Register → Calendar View → Track Achievements
```

---

## 📡 API Documentation

**Base URL:** `https://api.eventify.com`

### `GET /api/events`
Fetch all events.

**Response:**
```json
{
  "status": "success",
  "data": []
}
```

### `POST /api/register`
Register user for an event.

**Request Body:**
```json
{
  "userId": "123",
  "eventId": "456"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Registration successful"
}
```

---

## 🎥 Project Demo

🎬 **Demo Video:** [Add YouTube / Drive link here]

This video demonstrates:
- Login flow
- Preference selection
- Event filtering
- Wishlist interaction
- Calendar functionality
- Profile achievements

---

## 🤖 AI Tools Used *(Transparency Bonus)*

| Tool | Purpose |
|------|---------|
| ChatGPT | UI prompt engineering, component structure, API guidance, debugging |

- **Approximate AI-generated code:** ~30%
- **Human Contributions:** Architecture design, UI customization, business logic, integration & testing, deployment

---

## 👨‍💻 Team Contributions

| Member | Contributions |
|--------|--------------|
| [Janvi Ravindra Jadav] | Frontend development, UI/UX design, animation implementation,database integration |
| [Lakshmipriya K J] | Backend development, API creation, Testing, documentation, deployment  |

---

## 📜 License

This project is licensed under the **MIT License**.

---

