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

📁 Project Structure
cipher-sql-studio/
│
├── client/                 # Frontend React App
│   ├── public/
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom hooks
│   │   ├── styles/         # SCSS styles
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
├── server/                 # Backend Express App
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── seeds/
│   └── package.json
│
├── database/               # Database scripts
│   └── postgres/
│
├── docs/                   # Documentation
├── .gitignore
├── package.json
└── README.md

## 🏗 Architecture Overview




📁 Server Environment (server/.env)
# ============================================================================
# SERVER CONFIGURATION
# ============================================================================
NODE_ENV=development
PORT=5000
API_VERSION=v1

# ============================================================================
# CORS CONFIGURATION
# ============================================================================
CORS_ORIGIN=http://localhost:3000

# ============================================================================
# POSTGRESQL DATABASE (Sandbox for Query Execution)
# ============================================================================
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_postgres_password_here
POSTGRES_DB=cipher_sql_sandbox
POSTGRES_MAX_CONNECTIONS=10
POSTGRES_QUERY_TIMEOUT=5000

# ============================================================================
# MONGODB DATABASE (Persistence Layer)
# ============================================================================
MONGODB_URI=mongodb://localhost:27017/cipher_sql_studio
# OR MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cipher_sql_studio

# ============================================================================
# LLM API CONFIGURATION (Choose ONE)
# ============================================================================
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=500
OPENAI_TEMPERATURE=0.7

# ============================================================================
# SECURITY SETTINGS
# ============================================================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_QUERY_EXECUTION_TIME=5000
MAX_RESULT_ROWS=1000

# ============================================================================
# LOGGING
# ============================================================================
LOG_LEVEL=debug

📁 Client Environment (client/.env)
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Environment
REACT_APP_ENV=development

# Feature Flags (Optional)
REACT_APP_ENABLE_AUTH=false
REACT_APP_ENABLE_ANALYTICS=false
📌 Required Variables Explanation
Variable	Required	Description	Example
POSTGRES_PASSWORD	✅ Yes	PostgreSQL password	mySecurePass123
MONGODB_URI	✅ Yes	MongoDB connection string	mongodb://localhost:27017/...
LLM_PROVIDER	✅ Yes	LLM service provider	openai / gemini / anthropic
OPENAI_API_KEY	✅ Yes*	OpenAI API key (*if used)	sk-proj-...
PORT	❌ No	Server port (default: 5000)	5000
CORS_ORIGIN	❌ No	Frontend URL	http://localhost:3000
▶️ Running the Application
🧪 Development Mode (Recommended)
🔹 Terminal 1 – Backend Server
cd server
npm run dev


Output

🚀 Server running on port 5000
📝 Environment: development
✅ PostgreSQL connected
✅ MongoDB connected

🔹 Terminal 2 – Frontend Server
cd client
npm start


Output

Compiled successfully!

Local: http://localhost:3000
Network: http://192.168.1.x:3000

🏗 Production Build
# Build frontend
cd client
npm run build

# Serve built files with backend
cd ../server
npm start

🌐 Access Points

🎨 Frontend: http://localhost:3000

🚀 Backend API: http://localhost:5000/api

❤️ Health Check: http://localhost:5000/api/health



✨ You’re all set! Happy building with CipherSQLStudio 🚀🧠
