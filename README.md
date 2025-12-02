# Task List

## Project Structure

```
final-project/
├── frontend/                          # React + TypeScript frontend
│   ├── src/
│   │   ├── features/                  # Feature-based architecture
│   │   │   └── tasks/                 # Tasks feature module
│   │   │       ├── api.ts             # API client for tasks
│   │   │       ├── types.ts           # TypeScript type definitions
│   │   │       ├── test-utils.tsx     # Testing utilities
│   │   │       ├── components/        # Feature components
│   │   │       │   ├── CreateTaskForm.tsx
│   │   │       │   ├── CreateTaskForm.css
│   │   │       │   ├── CreateTaskForm.test.tsx
│   │   │       │   ├── KanbanBoard.tsx
│   │   │       │   ├── KanbanBoard.css
│   │   │       │   ├── TaskCard.tsx
│   │   │       │   ├── TaskCard.css
│   │   │       │   ├── TaskColumn.tsx
│   │   │       │   ├── TaskColumn.css
│   │   │       │   ├── TaskListView.tsx
│   │   │       │   ├── TaskListView.css
│   │   │       │   ├── ProgressBar.tsx
│   │   │       │   ├── ProgressBar.css
│   │   │       │   ├── Field.tsx
│   │   │       │   ├── Field.css
│   │   │       │   ├── LoadingState.tsx
│   │   │       │   ├── LoadingState.css
│   │   │       │   ├── ErrorState.tsx
│   │   │       │   ├── ErrorState.css
│   │   │       │   ├── EmptyState.tsx
│   │   │       │   └── EmptyState.css
│   │   │       ├── hooks/             # Custom React hooks
│   │   │       │   ├── index.ts
│   │   │       │   ├── useTasks.ts
│   │   │       │   ├── useTask.ts
│   │   │       │   ├── useTaskFilter.ts
│   │   │       │   └── useTaskMutation.ts
│   │   │       └── pages/             # Page components
│   │   │           ├── TaskBoardPage.tsx
│   │   │           ├── TaskBoardPage.css
│   │   │           ├── TaskBoardPage.test.tsx
│   │   │           ├── TaskDetailsPage.tsx
│   │   │           ├── TaskDetailsPage.css
│   │   │           ├── CreateTaskPage.tsx
│   │   │           ├── CreateTaskPage.css
│   │   │           └── CreateTaskPage.test.tsx
│   │   ├── shared/                    # Shared components and utilities
│   │   │   └── components/
│   │   │       ├── Header.tsx
│   │   │       ├── Header.css
│   │   │       ├── Layout.tsx
│   │   │       ├── Layout.css
│   │   │       ├── BackButton.tsx
│   │   │       └── BackButton.css
│   │   ├── test/                      # Test configuration
│   │   │   └── setup.ts
│   │   ├── App.tsx                    # Root application component
│   │   ├── router.tsx                 # React Router configuration
│   │   ├── main.tsx                   # Application entry point
│   │   ├── index.css                  # Global styles
│   │   └── vitest.d.ts                # Vitest type definitions
│   ├── public/                        # Static assets
│   ├── index.html                     # HTML template
│   ├── package.json
│   ├── vite.config.ts                 # Vite configuration
│   ├── vitest.config.ts               # Vitest test configuration
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── tsconfig.app.json              # App-specific TS config
│   ├── tsconfig.node.json             # Node-specific TS config
│   └── eslint.config.ts               # ESLint configuration
│
├── backend/                           # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── controllers/              # Request handlers (MVC controllers)
│   │   │   └── task.controller.ts
│   │   ├── models/                    # Sequelize ORM models
│   │   │   ├── task.model.ts
│   │   │   └── user.model.ts
│   │   ├── routes/                     # Express route definitions
│   │   │   └── task.routes.ts
│   │   ├── services/                  # Business logic layer
│   │   │   └── task.service.ts
│   │   ├── types/                     # TypeScript type definitions
│   │   │   └── task.types.ts
│   │   ├── config/                    # Configuration files
│   │   │   └── database.ts            # Database connection setup
│   │   ├── errors.ts                  # Custom error classes
│   │   ├── app.ts                     # Express application setup
│   │   └── server.ts                   # Server entry point
│   ├── tests/                         # Integration and unit tests
│   │   ├── setup.ts                   # Test environment setup
│   │   └── tasks.test.ts              # Task API endpoint tests
│   ├── dist/                          # Compiled JavaScript output
│   ├── database.sqlite                # SQLite database file (dev)
│   ├── package.json
│   ├── jest.config.js                 # Jest test configuration
│   ├── tsconfig.json                  # Main TypeScript configuration
│   ├── tsconfig.test.json             # Test-specific TS config
│   ├── tsconfig.node.json             # Node-specific TS config
│   └── eslint.config.ts               # ESLint configuration
│
├── shared/                            # Shared configuration and utilities
│   └── eslint-config/                 # Shared ESLint configurations
│       ├── base.ts                     # Base ESLint rules
│       ├── node.ts                     # Node.js specific rules
│       ├── react.ts                    # React specific rules
│       ├── index.ts                    # Configuration exports
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                       # Root package.json (workspace scripts)
└── README.md                          # Project documentation
```


```bash
# Terminal 1 - Start backend
npm run dev:backend

# Terminal 2 - Start frontend
npm run dev:frontend
```
