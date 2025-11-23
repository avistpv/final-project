# Final Project 

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



```bash
# Terminal 1 - Start backend
npm run dev:backend

# Terminal 2 - Start frontend
npm run dev:frontend
```