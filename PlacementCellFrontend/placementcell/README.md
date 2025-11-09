# Placement Cell Frontend - Layered Architecture

## Project Overview

This is a Placement Cell management system built with Angular 20+ that helps students submit and view interview feedback. The application follows a clean, layered architecture pattern to ensure maintainability, testability, and scalability.

## Technology Stack

- **Framework**: Angular 20.1.0
- **UI Library**: Angular Material 20.1.5
- **Styling**: LESS + Angular Material Custom Theme
- **State Management**: RxJS
- **Build Tool**: Angular CLI
- **Language**: TypeScript 5.8.2

## Architecture Overview

This project follows a **Layered Architecture** pattern with clear separation of concerns:

```
src/app/
├── core/                    # Core Module - Singleton services, app-wide concerns
│   ├── constants/          # Application constants
│   ├── enums/              # Application enums
│   ├── guards/             # Route guards
│   ├── interceptors/       # HTTP interceptors
│   ├── models/             # Core domain models
│   ├── services/           # Core singleton services
│   └── utilities/          # Utility functions
│
├── shared/                  # Shared Module - Reusable components and utilities
│   ├── components/         # Reusable UI components
│   │   ├── counter/
│   │   ├── drop-down/
│   │   ├── duration-selector/
│   │   ├── greybox/
│   │   ├── input-question-box/
│   │   ├── notification/
│   │   ├── number-input/
│   │   ├── radio-button/
│   │   ├── radio-group/
│   │   └── single-input/
│   ├── directives/         # Reusable directives
│   ├── pipes/              # Reusable pipes
│   └── validators/         # Custom form validators
│
├── features/               # Feature Modules - Business logic grouped by feature
│   ├── authentication/     # Authentication feature
│   │   ├── domain/
│   │   │   ├── entities/           # Business entities
│   │   │   ├── interfaces/         # Domain interfaces
│   │   │   └── value-objects/      # Value objects (immutable objects)
│   │   ├── application/
│   │   │   ├── dtos/               # Data Transfer Objects
│   │   │   ├── mappers/            # DTO to Entity mappers
│   │   │   ├── use-cases/          # Application use cases
│   │   │   └── facades/            # Application facades
│   │   ├── infrastructure/
│   │   │   ├── api/                # API client services
│   │   │   └── repositories/       # Repository implementations
│   │   └── presentation/
│   │       ├── components/         # Feature-specific components
│   │       ├── pages/              # Page components
│   │       └── view-models/        # Presentation view models
│   │
│   ├── interview-feedback/  # Interview feedback feature
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   ├── interfaces/
│   │   │   └── value-objects/
│   │   ├── application/
│   │   │   ├── dtos/
│   │   │   ├── mappers/
│   │   │   ├── use-cases/
│   │   │   └── facades/
│   │   ├── infrastructure/
│   │   │   ├── api/
│   │   │   └── repositories/
│   │   └── presentation/
│   │       ├── components/
│   │       ├── pages/
│   │       └── view-models/
│   │
│   └── student-dashboard/   # Student dashboard feature
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── presentation/
│
└── layout/                  # Layout Components
    ├── main-layout/
    └── auth-layout/
```

## Layer Responsibilities

### 1. Core Layer (`src/app/core/`)

**Purpose**: Contains singleton services and application-wide concerns that are used across the entire application.

**Key Components**:
- **Constants**: Application-wide constants and configuration
- **Enums**: Shared enumerations
- **Guards**: Route guards for authentication and authorization
- **Interceptors**: HTTP interceptors for request/response handling
- **Models**: Core domain models shared across features
- **Services**: Singleton services (e.g., notification, logging, configuration)
- **Utilities**: Helper functions and utilities

**Rules**:
- Must be imported ONCE in the application (typically in `app.config.ts` or `main.ts`)
- Should contain only singleton services
- No feature-specific code

### 2. Shared Layer (`src/app/shared/`)

**Purpose**: Contains reusable UI components, directives, pipes, and other shared utilities that can be used across multiple features.

**Key Components**:
- **Components**: Reusable, presentational components (buttons, inputs, modals, etc.)
- **Directives**: Custom directives
- **Pipes**: Custom pipes for data transformation
- **Validators**: Custom form validators

**Rules**:
- Can be imported in any feature module
- Should be stateless and highly reusable
- No business logic
- Focus on presentation and user interaction

### 3. Features Layer (`src/app/features/`)

**Purpose**: Contains business features organized by domain. Each feature follows Clean Architecture principles with four sub-layers.

#### 3.1. Domain Sub-layer (`domain/`)

**Purpose**: Contains core business logic and rules, independent of frameworks and external concerns.

- **Entities**: Core business objects with identity and lifecycle
- **Interfaces**: Contracts for repository and service abstractions
- **Value Objects**: Immutable objects representing descriptive aspects

**Rules**:
- No dependencies on other layers (except other domain objects)
- Framework-agnostic
- Contains pure business logic

#### 3.2. Application Sub-layer (`application/`)

**Purpose**: Orchestrates the flow of data between domain and presentation layers.

- **DTOs**: Data Transfer Objects for API communication
- **Mappers**: Transform between DTOs and domain entities
- **Use Cases**: Application-specific business rules (e.g., `SubmitFeedbackUseCase`)
- **Facades**: Simplified interfaces for complex operations

**Rules**:
- Depends on domain layer
- Coordinates between domain and infrastructure
- Contains application-specific business rules

#### 3.3. Infrastructure Sub-layer (`infrastructure/`)

**Purpose**: Implements technical details like data access and external services.

- **API**: HTTP client services for backend communication
- **Repositories**: Implementations of repository interfaces defined in domain

**Rules**:
- Depends on domain and application layers
- Implements interfaces defined in domain layer
- Handles external communication (HTTP, WebSocket, etc.)

#### 3.4. Presentation Sub-layer (`presentation/`)

**Purpose**: Contains UI components and presentation logic.

- **Components**: Feature-specific UI components
- **Pages**: Top-level page components (container components)
- **View Models**: Presentation-specific data structures

**Rules**:
- Depends on application layer (uses facades and use cases)
- Contains Angular-specific code (templates, component logic)
- Handles user interaction and display logic

### 4. Layout Layer (`src/app/layout/`)

**Purpose**: Contains layout components that define the overall structure of pages.

**Examples**:
- Main layout (header, sidebar, footer for authenticated users)
- Auth layout (for login/signup pages)

## Data Flow

```
User Interaction
       ↓
Presentation Layer (Component)
       ↓
Application Layer (Use Case/Facade)
       ↓
Domain Layer (Business Logic)
       ↓
Infrastructure Layer (API/Repository)
       ↓
External Services (Backend API)
```

## Dependency Rules

1. **Outer layers depend on inner layers** (Dependency Inversion Principle)
2. **Domain layer has NO dependencies** on other layers
3. **Application layer depends ONLY on Domain**
4. **Infrastructure layer depends on Domain and Application**
5. **Presentation layer depends on Application (not directly on Infrastructure)**

```
Presentation → Application → Domain ← Infrastructure
```

## Module Organization

### Feature Module Structure

Each feature module is self-contained and can be lazy-loaded:

```typescript
// Example: interview-feedback.routes.ts
export const INTERVIEW_FEEDBACK_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/pages/interview-feedback-form-page/interview-feedback-form-page')
      .then(m => m.InterviewFeedbackFormPage)
  }
];
```

## Naming Conventions

### Files

- **Components**: `component-name.component.ts`
- **Services**: `service-name.service.ts`
- **Models**: `model-name.model.ts`
- **Interfaces**: `interface-name.interface.ts`
- **Enums**: `enum-name.enum.ts`
- **Use Cases**: `action-name.use-case.ts`
- **DTOs**: `dto-name.dto.ts`

### Classes

- **Components**: `ComponentNameComponent`
- **Services**: `ServiceNameService`
- **Use Cases**: `ActionNameUseCase`
- **Repositories**: `EntityNameRepository`
- **Interfaces**: `IInterfaceName`

## Best Practices

### 1. Separation of Concerns
- Each layer has a single, well-defined responsibility
- Components should be thin and delegate logic to services

### 2. Dependency Injection
- Use Angular's DI system for all services
- Inject interfaces, not concrete implementations (when possible)

### 3. Reactive Programming
- Use RxJS Observables for async operations
- Prefer declarative over imperative code
- Use async pipe in templates to manage subscriptions

### 4. Type Safety
- Leverage TypeScript's type system
- Avoid `any` type
- Use interfaces and types for all data structures

### 5. Testing
- Unit test use cases and business logic
- Integration test API services
- Component tests for UI logic

## Project Scripts

```bash
# Development server
npm start

# Build for production
npm run build

# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode for development
npm run watch
```

## Folder Structure Example

```
features/
└── interview-feedback/
    ├── domain/
    │   ├── entities/
    │   │   ├── feedback.entity.ts
    │   │   ├── company.entity.ts
    │   │   └── coding-round.entity.ts
    │   ├── interfaces/
    │   │   └── feedback-repository.interface.ts
    │   └── value-objects/
    │       ├── job-profile.vo.ts
    │       └── location.vo.ts
    ├── application/
    │   ├── dtos/
    │   │   ├── feedback-request.dto.ts
    │   │   └── feedback-response.dto.ts
    │   ├── mappers/
    │   │   └── feedback.mapper.ts
    │   ├── use-cases/
    │   │   ├── submit-feedback.use-case.ts
    │   │   └── get-feedback.use-case.ts
    │   └── facades/
    │       └── interview-feedback.facade.ts
    ├── infrastructure/
    │   ├── api/
    │   │   └── feedback-api.service.ts
    │   └── repositories/
    │       └── feedback.repository.ts
    └── presentation/
        ├── components/
        │   ├── feedback-card/
        │   └── company-details-form/
        ├── pages/
        │   ├── interview-feedback-form-page/
        │   └── feedback-display-page/
        └── view-models/
            └── feedback-form.vm.ts
```

## Migration Guide

To migrate existing code to this architecture:

1. **Identify Features**: Group related components, services, and models
2. **Extract Domain Logic**: Move business logic to domain entities and use cases
3. **Create Interfaces**: Define repository interfaces in domain layer
4. **Implement Infrastructure**: Create API services and repository implementations
5. **Refactor Components**: Make components thin, delegate to facades/use cases
6. **Move Shared Components**: Move reusable components to shared layer
7. **Update Imports**: Update all import paths to reflect new structure

## Benefits of This Architecture

1. **Maintainability**: Clear structure makes code easy to navigate and modify
2. **Testability**: Each layer can be tested independently
3. **Scalability**: Easy to add new features without affecting existing code
4. **Reusability**: Shared components and utilities can be used across features
5. **Team Collaboration**: Different team members can work on different layers/features
6. **Framework Independence**: Business logic is decoupled from Angular framework

## Contributing

When adding new features:

1. Create a new feature folder under `features/`
2. Follow the four-layer structure (domain, application, infrastructure, presentation)
3. Keep domain layer framework-agnostic
4. Use dependency injection for services
5. Write tests for use cases and business logic
6. Update this README if architectural decisions change

## Contact

For questions or suggestions about the architecture, please contact the development team.

---

**Last Updated**: November 2025
**Angular Version**: 20.1.0
**Architecture Pattern**: Clean Architecture with Layered Approach
