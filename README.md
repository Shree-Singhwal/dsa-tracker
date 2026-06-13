# DSA Tracker 🚀

A full-stack EdTech platform for students and teachers to track DSA practice across LeetCode, Codeforces, CodeChef, and GeeksForGeeks.

🌐 **Live Demo:** [dsa-tracker-ten-khaki.vercel.app](https://dsa-tracker-ten-khaki.vercel.app)

---

## 📌 Problem Statement

Students preparing for placements struggle to track their DSA progress across multiple platforms. Teachers have no way to assign questions or monitor student progress remotely. This app solves both problems with a unified classroom-based tracker.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS |
| Database | Firebase Firestore |
| Authentication | Firebase Auth, Google OAuth 2.0 |
| Charts | Recharts |
| Deployment | Vercel |

---

## ✨ Features

### 🔐 Authentication & Role-Based Access
- Google OAuth 2.0 login
- Role selection at signup: **Student** or **Teacher**
- Protected routes — app inaccessible without login
- User data stored in Firestore with role metadata

### 🏫 Classroom System
- Teacher creates a classroom and gets a unique **Class Code** (e.g. `TCH-WUFN`)
- Students enter the code to join their teacher's class
- Complete separation of data between different classrooms
- Teacher sees all questions with purple "Assigned" badge

### 📋 Question Management
- Add questions manually (CodeChef, GFG)
- **Auto-fetch** from LeetCode via GraphQL API (title + difficulty)
- **Auto-fetch** from Codeforces via official API (title + rating)
- Clickable links — opens original platform in new tab
- Platform-specific difficulty display:
  - LeetCode → Easy / Medium / Hard
  - Codeforces → Rating (800, 1200, 1600…)
  - CodeChef → Easy / Medium / Hard
  - GFG → School / Basic / Easy / Medium / Hard

### 📊 Progress Tracking
- Question status: **Todo → Attempted → Solved**
- Status updates saved in real-time to Firestore
- Per-question notes with save functionality
- Streak counter (consecutive days with solved questions)

### 📈 Analytics Dashboard
- Solved / Attempted / Todo counters
- Bar chart — question distribution by status
- Pie chart — visual breakdown
- GitHub-style activity heatmap

### 🔍 Filtering & Search
- Filter by status: All / Todo / Attempted / Solved
- Filter by platform: LeetCode / Codeforces / CodeChef / GFG
- Real-time search by question title

### 📱 Responsive Design
- Full desktop layout with sidebar
- Mobile-first bottom navigation bar
- Platform filter drawer on mobile (⚙️ button)
- Works seamlessly on both phone and laptop

---

## 🗂️ Project Structure
dsa-tracker/

└── frontend/

├── src/

│   ├── components/

│   │   ├── Navbar.jsx          # Top navigation with user info

│   │   ├── Sidebar.jsx         # Desktop filter sidebar

│   │   ├── BottomNav.jsx       # Mobile bottom navigation

│   │   ├── Dashboard.jsx       # Stats, bar chart, pie chart

│   │   ├── Heatmap.jsx         # GitHub-style activity heatmap

│   │   ├── QuestionCard.jsx    # Individual question card

│   │   ├── AddQuestion.jsx     # Add question form with auto-fetch

│   │   ├── Login.jsx           # Role-based login page

│   │   ├── TeacherSetup.jsx    # Classroom creation for teachers

│   │   └── StudentJoin.jsx     # Classroom join for students

│   ├── App.jsx                 # Main app with routing logic

│   └── firebase.js             # Firebase config & exports

└── package.json

---

## 🗄️ Database Schema (Firestore)

### `users` collection
```json
{
  "uid": "firebase_user_id",
  "name": "Shree Singhwal",
  "email": "user@gmail.com",
  "photo": "url",
  "role": "teacher | student",
  "classroomId": "classroom_doc_id",
  "code": "TCH-XXXX",
  "createdAt": "ISO timestamp"
}
```

### `classrooms` collection
```json
{
  "teacherId": "uid",
  "teacherName": "Teacher Name",
  "className": "DSA Batch 2025",
  "code": "TCH-XXXX",
  "createdAt": "ISO timestamp"
}
```

### `questions` collection
```json
{
  "title": "Two Sum",
  "platform": "LeetCode",
  "difficulty": "Easy",
  "link": "https://leetcode.com/...",
  "status": "Todo | Attempted | Solved",
  "classroomId": "classroom_doc_id",
  "note": "optional note",
  "solvedAt": "ISO timestamp | null"
}
```

---

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/Shree-Singhwal/dsa-tracker.git
cd dsa-tracker/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

> Add your own Firebase config in `src/firebase.js`

---

## 🔄 Development Phases

### Phase 1 — Foundation
- React + Vite + Tailwind CSS setup
- Firebase Firestore integration
- Basic question CRUD operations

### Phase 2 — Core Features
- Question cards with status buttons
- Platform + status filters
- LeetCode GraphQL auto-fetch
- Codeforces API auto-fetch

### Phase 3 — Analytics
- Dashboard with stats counters
- Recharts bar chart + pie chart
- GitHub-style activity heatmap
- Streak counter

### Phase 4 — Authentication
- Google OAuth via Firebase Auth
- Role-based login (Student/Teacher)
- Protected routes

### Phase 5 — Classroom System
- Teacher classroom creation with unique code
- Student classroom join flow
- Per-classroom question isolation
- Teacher assign/delete controls

### Phase 6 — Polish & Deploy
- Mobile responsive layout
- Bottom navigation for mobile
- Platform filter drawer
- Deployed on Vercel

---

## 👩‍💻 Author

**Shree Singhwal**
- GitHub: [@Shree-Singhwal](https://github.com/Shree-Singhwal)
- LinkedIn: [shree-singhwal](https://linkedin.com/in/shree-singhwal)