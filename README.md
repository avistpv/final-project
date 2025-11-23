# Final Project - Task Management System

A full-stack task management application built with React, TypeScript, and Node.js. Features a Kanban board view, list view, task creation, editing, and filtering capabilities.

## 🚀 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Build tool and dev server
- **React Router DOM** - Routing
- **@dnd-kit** - Drag and drop functionality
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Vitest** - Testing framework

### Backend
- **Node.js** with TypeScript
- **Express** - Web framework
- **Sequelize** - ORM for database interaction
- **SQLite** - Development and test database
- **PostgreSQL** - Production database (optional)
- **Zod** - Request validation
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing
- **Jest** - Testing framework
- **Supertest** - HTTP assertions for tests

## 📁 Project Structure

```
final-project/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── features/        # Feature-based modules
│   │   │   └── tasks/      # Tasks feature
│   │   │       ├── api.ts   # API client
│   │   │       ├── types.ts # TypeScript types
│   │   │       ├── components/  # Feature components
│   │   │       │   ├── CreateTaskForm.tsx
│   │   │       │   ├── KanbanBoard.tsx
│   │   │       │   ├── TaskCard.tsx
│   │   │       │   ├── TaskColumn.tsx
│   │   │       │   ├── TaskListView.tsx
│   │   │       │   └── ProgressBar.tsx
│   │   │       └── pages/   # Page components
│   │   │           ├── TaskBoardPage.tsx
│   │   │           ├── TaskDetailsPage.tsx
│   │   │           └── CreateTaskPage.tsx
│   │   ├── shared/         # Shared components
│   │   │   └── components/
│   │   │       ├── Header.tsx
│   │   │       ├── Layout.tsx
│   │   │       └── BackButton.tsx
│   │   ├── App.tsx         # Main app component
│   │   ├── router.tsx      # Router configuration
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   │   └── task.controller.ts
│   │   ├── models/         # Sequelize models
│   │   │   ├── task.model.ts
│   │   │   └── user.model.ts
│   │   ├── routes/        # API routes
│   │   │   └── task.routes.ts
│   │   ├── services/      # Business logic
│   │   │   └── task.service.ts
│   │   ├── types/         # TypeScript types
│   │   │   └── task.types.ts
│   │   ├── config/        # Configuration files
│   │   │   └── database.ts
│   │   ├── errors.ts      # Error handling
│   │   ├── app.ts         # Express app setup
│   │   └── server.ts      # Server entry point
│   ├── tests/             # Integration tests
│   │   ├── setup.ts       # Test setup
│   │   └── tasks.test.ts  # Task API tests
│   ├── package.json
│   ├── tsconfig.json       # Main TypeScript config
│   ├── tsconfig.test.json  # Test TypeScript config
│   ├── tsconfig.node.json  # Node TypeScript config
│   └── jest.config.js     # Jest configuration
│
└── shared/                 # Shared configuration
    └── eslint-config/     # Shared ESLint config
```

## 🛠️ Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

## 📦 Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies for all workspaces:**
   ```bash
   npm run install:all
   ```

   Or manually:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   cd ../shared/eslint-config && npm install
   ```

   This will install dependencies for:
   - Root workspace
   - Frontend workspace
   - Backend workspace
   - Shared ESLint config

## 🚀 Running the Application

### Option 1: Run from Root (Recommended)

Run both frontend and backend from the root directory:

```bash
# Terminal 1 - Start backend
npm run dev:backend

# Terminal 2 - Start frontend
npm run dev:frontend
```

**Note:** The root scripts use `cd` to navigate to each workspace. Make sure you're in the root directory when running these commands.

### Option 2: Run Individually

**Backend:**
```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:3000`

**Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📝 Available Scripts

### Root Scripts
```bash
npm run dev:frontend    # Start frontend dev server
npm run dev:backend    # Start backend dev server
npm run build:frontend # Build frontend for production
npm run build:backend  # Build backend
npm run lint:frontend  # Lint frontend code
npm run lint:backend   # Lint backend code
```

### Frontend Scripts
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
npm run lint:fix     # Fix linting issues
npm test             # Run tests
npm test:ui          # Run tests with UI
```

### Backend Scripts
```bash
cd backend
npm run dev          # Start dev server with hot reload
npm run build        # Build TypeScript
npm run lint         # Lint code
npm run lint:fix     # Fix linting issues
npm test             # Run integration tests
```

## 🎯 Features

### Task Management
- ✅ Create, read, update, and delete tasks
- ✅ Kanban board view with drag-and-drop
- ✅ List view with horizontal layout
- ✅ Task filtering by status, priority, and date
- ✅ Task search functionality
- ✅ Task sorting (A-Z, Z-A)
- ✅ Progress bar showing deadline progress
- ✅ Task status management (To Do, In Progress, Review, Done)

### User Interface
- ✅ Responsive design
- ✅ Modern UI with gradient buttons
- ✅ Loading and error states
- ✅ Empty states
- ✅ Smooth animations and transitions

## 🔌 API Endpoints

### Tasks
- `GET /tasks` - Get all tasks (supports query params: `status`, `priority`, `createdAt`)
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Example API Request
```bash
# Get all tasks
curl http://localhost:3000/tasks

# Get tasks filtered by status
curl http://localhost:3000/tasks?status=todo

# Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "status": "todo",
    "priority": "medium",
    "userId": 1
  }'
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with UI
npm run test:run      # Run tests once without watch mode
```

Test files are located alongside components:
- `TaskBoardPage.test.tsx`
- `CreateTaskPage.test.tsx`
- `CreateTaskForm.test.tsx`

### Backend Tests
```bash
cd backend
npm test              # Run integration tests
```

Test files:
- `tests/tasks.test.ts` - Integration tests for all `/tasks/*` endpoints

Tests use an in-memory SQLite database that is reset before each test run.

## 🏗️ Build for Production

### Frontend
```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

### Backend
```bash
cd backend
npm run build
```

Output will be in `backend/dist/`

## 📋 Environment Variables

### Backend
The backend uses SQLite for development and testing by default. For production, you can configure PostgreSQL:

Create `.env.production` in the `backend/` directory:
```
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=localhost
DB_PORT=5432
NODE_ENV=production
```

For development, the backend uses `database.sqlite` file (created automatically).

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 or 5173 is already in use:
- **Backend**: Change port in `backend/src/server.ts`
- **Frontend**: Vite will automatically suggest an alternative port

### CORS Issues
CORS is enabled by default in the backend. If you encounter issues, check `backend/src/app.ts` for CORS configuration.

### TypeScript Errors
Run the build command to check for TypeScript errors:
```bash
npm run build:frontend
npm run build:backend
```

## 📚 Project Architecture

### Frontend Architecture
- **Feature-based structure**: Each feature (tasks) has its own folder with components, pages, types, and API
- **Shared components**: Reusable components in `shared/` directory
- **Routing**: React Router with nested routes
- **State management**: React hooks (useState, useEffect)

### Backend Architecture
- **Layered Architecture**: Controllers handle requests, Services contain business logic, Models define database schema
- **Database**: Sequelize ORM with SQLite (development/test) and PostgreSQL (production)
- **Models**: Sequelize models for `Task` and `User` with relationships (User has many Tasks)
- **Validation**: Zod schemas for request validation
- **Error handling**: Centralized error handling middleware
- **Testing**: Jest + Supertest for integration tests with in-memory database

## 📄 License

This project is part of a TypeScript course final project.

## 👤 Author

Final Project by Avi

