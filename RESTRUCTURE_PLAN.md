# Chess Application Restructuring Plan

## 🎯 **New Project Structure**

```
chess-app/
├── apps/
│   ├── web/                          # Frontend (renamed from frontend)
│   │   ├── public/
│   │   │   ├── assets/
│   │   │   │   ├── images/
│   │   │   │   ├── icons/
│   │   │   │   └── sounds/
│   │   │   └── favicon.ico
│   │   ├── src/
│   │   │   ├── app/                  # App-level configuration
│   │   │   │   ├── providers/
│   │   │   │   ├── router/
│   │   │   │   └── store/
│   │   │   ├── features/             # Feature-based modules
│   │   │   │   ├── auth/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── hooks/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── types/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── game/
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── board/
│   │   │   │   │   │   ├── moves/
│   │   │   │   │   │   └── ui/
│   │   │   │   │   ├── hooks/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── types/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── theme/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── hooks/
│   │   │   │   │   ├── services/
│   │   │   │   │   └── index.ts
│   │   │   │   └── shared/
│   │   │   │       ├── components/
│   │   │   │       ├── hooks/
│   │   │   │       ├── services/
│   │   │   │       └── utils/
│   │   │   ├── shared/               # Shared utilities
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── services/
│   │   │   │   ├── types/
│   │   │   │   └── utils/
│   │   │   ├── pages/                # Page components
│   │   │   │   ├── LandingPage.tsx
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── GamePage.tsx
│   │   │   │   └── SettingsPage.tsx
│   │   │   ├── layouts/              # Layout components
│   │   │   │   ├── MainLayout.tsx
│   │   │   │   └── AuthLayout.tsx
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   └── vite-env.d.ts
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── index.html
│   │
│   ├── api/                          # Backend API (renamed from backend)
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/
│   │   │   │   │   └── com/
│   │   │   │   │       └── chess/
│   │   │   │   │           ├── ChessApplication.java
│   │   │   │   │           ├── config/          # Configuration classes
│   │   │   │   │           │   ├── SecurityConfig.java
│   │   │   │   │           │   ├── WebSocketConfig.java
│   │   │   │   │           │   └── DatabaseConfig.java
│   │   │   │   │           ├── controller/     # REST controllers
│   │   │   │   │           │   ├── AuthController.java
│   │   │   │   │           │   ├── UserController.java
│   │   │   │   │           │   └── GameController.java
│   │   │   │   │           ├── service/        # Business logic
│   │   │   │   │           │   ├── AuthService.java
│   │   │   │   │           │   ├── UserService.java
│   │   │   │   │           │   └── GameService.java
│   │   │   │   │           ├── repository/    # Data access
│   │   │   │   │           │   ├── UserRepository.java
│   │   │   │   │           │   └── GameRepository.java
│   │   │   │   │           ├── model/         # Domain models
│   │   │   │   │           │   ├── User.java
│   │   │   │   │           │   ├── Game.java
│   │   │   │   │           │   └── Move.java
│   │   │   │   │           ├── dto/           # Data transfer objects
│   │   │   │   │           │   ├── AuthDto.java
│   │   │   │   │           │   ├── UserDto.java
│   │   │   │   │           │   └── GameDto.java
│   │   │   │   │           ├── security/       # Security components
│   │   │   │   │           │   ├── JwtUtil.java
│   │   │   │   │           │   ├── JwtRequestFilter.java
│   │   │   │   │           │   └── CustomUserDetailsService.java
│   │   │   │   │           └── websocket/      # WebSocket handlers
│   │   │   │   │               ├── ChessWebSocketHandler.java
│   │   │   │   │               └── GameManager.java
│   │   │   │   └── resources/
│   │   │   │       └── application.properties
│   │   │   └── test/
│   │   │       └── java/
│   │   │           └── com/
│   │   │               └── chess/
│   │   │                   └── ChessApplicationTests.java
│   │   ├── pom.xml
│   │   └── mvnw
│   │
│   └── websocket/                     # WebSocket service (renamed from ws)
│       ├── src/
│       │   ├── auth/
│       │   │   ├── auth.service.ts
│       │   │   └── jwt.service.ts
│       │   ├── game/
│       │   │   ├── game.manager.ts
│       │   │   ├── game.service.ts
│       │   │   └── game.types.ts
│       │   ├── websocket/
│       │   │   ├── socket.manager.ts
│       │   │   └── message.types.ts
│       │   ├── database/
│       │   │   └── connection.ts
│       │   ├── services/
│       │   │   └── spring-boot.service.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages/                          # Shared packages
│   ├── database/                      # Database package (renamed from db)
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── shared/                        # Shared types and utilities
│   │   ├── types/
│   │   │   ├── auth.types.ts
│   │   │   ├── game.types.ts
│   │   │   └── user.types.ts
│   │   ├── utils/
│   │   │   ├── validation.ts
│   │   │   └── constants.ts
│   │   └── package.json
│   │
│   ├── ui/                           # UI components library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── styles/
│   │   └── package.json
│   │
│   └── config/                       # Shared configurations
│       ├── eslint/
│       ├── typescript/
│       └── tailwind/
│
├── docs/                             # Documentation
│   ├── api/
│   ├── deployment/
│   └── development/
│
├── scripts/                          # Build and deployment scripts
│   ├── build.sh
│   ├── deploy.sh
│   └── dev.sh
│
├── .github/
│   └── workflows/
│
├── package.json                      # Root package.json
├── turbo.json                        # Turborepo configuration
├── docker-compose.yml
└── README.md
```

## 🎯 **Key Improvements**

### **1. Feature-Based Organization**
- **Frontend**: Organized by features (auth, game, theme) instead of file types
- **Backend**: Proper layered architecture (controller → service → repository)
- **Clear separation** between business logic and presentation

### **2. Consistent Naming**
- **kebab-case** for directories
- **PascalCase** for components
- **camelCase** for functions and variables
- **UPPER_CASE** for constants

### **3. Better File Organization**
- **Assets** properly categorized (images, icons, sounds)
- **Types** centralized in shared packages
- **Services** separated from components
- **Hooks** grouped by feature

### **4. Improved Maintainability**
- **Single responsibility** for each module
- **Clear dependencies** between features
- **Reusable components** in shared packages
- **Type safety** across the entire application

### **5. Development Experience**
- **Better IDE support** with clear file structure
- **Easier testing** with isolated modules
- **Simpler debugging** with clear boundaries
- **Faster development** with reusable components
