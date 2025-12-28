# 🧠 CipherSQLStudio – SQL Learning Platform 🚀

A **browser-based SQL learning platform** where students can practice SQL queries against **pre-configured assignments** with **real-time execution** and **AI-powered intelligent hints** 🤖.

---

## 📋 Table of Contents
- ✨ Features
- 🛠 Technology Stack
- 🏗 Architecture Overview
- 📦 Prerequisites
- 🚀 Installation
- 🔐 Environment Variables
- ▶️ Running the Application
- 📁 Project Structure
- 🔄 Data Flow
- 📘 API Documentation
- 🔐 Security Features
- 🧠 Technology Choices Explanation
- 🖼 Screenshots
- 🤝 Contributing
- 📄 License

---

## ✨ Features

### 🔹 Core Functionality
- 📚 **Assignment Library** – Browse SQL assignments by difficulty (Easy / Medium / Hard)
- 💻 **Interactive SQL Editor** – Write and execute SQL queries directly in the browser
- 🗂️ **Schema Viewer** – View table structures and sample data
- ▶️ **Real-time Query Execution** – Execute queries against a PostgreSQL sandbox database
- 🤖 **AI-Powered Hints** – Intelligent guidance (hints only, no direct solutions)
- 📊 **Results Visualization** – Scrollable, formatted result tables
- ⚠️ **Error Handling** – Clear syntax and logical error messages

### 🔐 Security Features
- 🛡 SQL injection prevention through query validation
- 🔒 Read-only database access for students
- ⏱ Query execution timeout (5 seconds)
- 🚦 API rate limiting
- ✅ Whitelist-based SQL keyword filtering

### 🎨 Design Features
- 📱 Mobile-first responsive design (320px → 1280px+)
- 🌙 Dark theme optimized for reading code
- 👆 Touch-friendly UI elements (minimum 44px)
- ✨ Smooth animations and transitions
- 🧩 BEM methodology for SCSS organization

---

## 🛠 Technology Stack

### 🎨 Frontend
| Technology | Version | Purpose |
|---------|--------|--------|
| ⚛ React | 18.2.0 | Component-based UI |
| 🎨 SCSS | 1.70.0 | Styling with variables & nesting |
| 🔁 Axios | 1.6.5 | API communication |
| 🧭 React Router | 6.21.0 | Client-side routing |

### 🧩 Backend
| Technology | Version | Purpose |
|---------|--------|--------|
| 🟢 Node.js | ≥18 | Runtime environment |
| 🚀 Express.js | 4.18.2 | Web framework |
| 🐘 PostgreSQL | ≥14 | Sandbox DB for query execution |
| 🍃 MongoDB | ≥6 | Assignment persistence |
| 🧬 Mongoose | 8.1.0 | MongoDB ODM |

### 🤖 LLM Integration
- 🧠 OpenAI GPT-4 *(Recommended)*
- 🌐 Google Gemini
- 🧪 Anthropic Claude

### 🧰 Development Tools
- 📜 Morgan – HTTP request logging
- 🛡 Helmet – Security headers
- 🌍 CORS
- 🚦 Express Rate Limit
- 🔄 Nodemon

---

## 🏗 Architecture Overview
graph TD
    A[CLIENT: React + SCSS] -- Axios API Calls --> B[EXPRESS SERVER]
    B --> C[PostgreSQL: Sandbox Execution]
    B --> D[MongoDB: User Data & Metadata]
    B --> E[LLM API: AI Hints/Feedback]

## 📁 Project Structure

```text
cipher-sql-studio/
│
├── client/                # Frontend React App
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # UI Components (Editor, Results, Sidebar)
│       ├── services/      # API service layer (Axios)
│       ├── hooks/         # Custom React hooks
│       ├── styles/        # SCSS / CSS modules
│       ├── App.jsx        # Root component
│       └── index.js       # React entry point
│
├── server/                # Backend Express App
│   ├── src/
│   │   ├── config/        # DB & App configuration
│   │   ├── models/        # MongoDB schemas (Metadata/Assignments)
│   │   ├── controllers/   # Route handlers
│   │   ├── services/      # Business logic & LLM integration
│   │   ├── routes/        # API endpoints
│   │   └── middleware/    # Security & Error handling
│   └── seeds/             # Database seeders
│
├── database/              # Database scripts
│   └── postgres/
│       ├── schema.sql     # Sandbox table definitions
│       └── sample_data.sql# Initial sandbox data
│
└── docs/                  # Documentation (API, Architecture)
```

## 📁 Server Configuration (server/.env)
 Create a .env file in the server directory:

Code snippet

### SERVER CONFIG
- PORT=5000
- NODE_ENV=development

### DATABASES
- POSTGRES_HOST=localhost
 - POSTGRES_USER=postgres
 - POSTGRES_PASSWORD=your_password
- POSTGRES_DB=cipher_sql_sandbox
 -MONGODB_URI=mongodb://localhost:27017/cipher_sql_studio

### AI CONFIG
- LLM_PROVIDER=openai
- OPENAI_API_KEY=sk-your-key-here

### SECURITY
-MAX_QUERY_EXECUTION_TIME=5000
-MAX_RESULT_ROWS=1000


## ▶️ Running the Application

### 🧪 Development Mode
To get the environment up and running, open two separate terminal windows:

**🔹 Terminal 1: Backend**
```bash
cd server
npm run dev
```

### 🌐 Access Points

| Component | URL |
| :--- | :--- |
| 🎨 **Frontend UI** | [http://localhost:3000](http://localhost:3000) |
| 🚀 **Backend API** | [http://localhost:5000/api](http://localhost:5000/api) |
| ❤️ **Health Check** | [http://localhost:5000/api/health](http://localhost:5000/api/health) |


## 📄 Notes

* 🛡️ **Security:** The PostgreSQL sandbox is designed for read-only or simulated environments. Ensure user permissions are strictly restricted in production to prevent unauthorized data modification.
* 🤖 **AI Hints:** Execution and rate limits apply based on your chosen LLM provider's subscription plan.
* 🛠️ **Troubleshooting:** If you encounter any issues, please check the logs in the server terminal for detailed error messages.

---

✨ **Happy Coding!** You are all set to start building with **CipherSQLStudio**.
