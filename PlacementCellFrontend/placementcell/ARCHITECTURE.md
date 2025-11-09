# PlacementCell - Architecture Visualization

## Directory Structure

```
placementcell/
├── src/
│   ├── app/
│   │   ├── core/                           # Core Module (Singleton services)
│   │   │   ├── constants/
│   │   │   │   ├── app.constants.ts        ✅ Created
│   │   │   │   ├── companies.constants.ts  ✅ Created
│   │   │   │   ├── question-types.constants.ts ✅ Created
│   │   │   │   └── index.ts                ✅ Barrel export
│   │   │   ├── enums/
│   │   │   │   ├── interview.enum.ts       ✅ Created
│   │   │   │   ├── notification.enum.ts    ✅ Created
│   │   │   │   └── index.ts                ✅ Barrel export
│   │   │   ├── guards/                     ⏳ TODO
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/               ⏳ TODO
│   │   │   │   └── http-error.interceptor.ts
│   │   │   ├── models/                     📦 For shared models only
│   │   │   ├── services/
│   │   │   │   ├── notification.service.ts ✅ Created
│   │   │   │   └── index.ts                ✅ Barrel export
│   │   │   ├── utilities/                  ⏳ TODO
│   │   │   └── index.ts                    ✅ Barrel export
│   │   │
│   │   ├── shared/                         # Shared Module (Reusable components)
│   │   │   ├── components/                 ✅ Structure created
│   │   │   │   ├── counter/                ⏳ TODO: Move from old location
│   │   │   │   ├── drop-down/              ⏳ TODO: Move from old location
│   │   │   │   ├── duration-selector/      ⏳ TODO: Move from old location
│   │   │   │   ├── greybox/                ⏳ TODO: Move from old location
│   │   │   │   ├── input-question-box/     ⏳ TODO: Move from old location
│   │   │   │   ├── notification/           ⏳ TODO: Move from old location
│   │   │   │   ├── number-input/           ⏳ TODO: Move from old location
│   │   │   │   ├── radio-button/           ⏳ TODO: Move from old location
│   │   │   │   ├── radio-group/            ⏳ TODO: Move from old location
│   │   │   │   ├── single-input/           ⏳ TODO: Move from old location
│   │   │   │   └── index.ts                ⏳ TODO: Create barrel export
│   │   │   ├── directives/                 ✅ Structure created
│   │   │   ├── pipes/                      ✅ Structure created
│   │   │   ├── validators/                 ✅ Structure created
│   │   │   └── index.ts                    ⏳ TODO: Create barrel export
│   │   │
│   │   ├── features/                       # Feature Modules
│   │   │   ├── authentication/             ✅ Structure created
│   │   │   │   ├── domain/
│   │   │   │   │   ├── entities/           ⏳ TODO: Create User entity
│   │   │   │   │   ├── interfaces/         ⏳ TODO: Create IAuthRepository
│   │   │   │   │   ├── value-objects/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── application/
│   │   │   │   │   ├── dtos/               ⏳ TODO: LoginDto, RegisterDto
│   │   │   │   │   ├── mappers/            ⏳ TODO: UserMapper
│   │   │   │   │   ├── use-cases/          ⏳ TODO: LoginUseCase, etc.
│   │   │   │   │   ├── facades/            ⏳ TODO: AuthFacade
│   │   │   │   │   └── index.ts
│   │   │   │   ├── infrastructure/
│   │   │   │   │   ├── api/                ⏳ TODO: AuthApiService
│   │   │   │   │   ├── repositories/       ⏳ TODO: AuthRepository
│   │   │   │   │   ├── providers.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── pages/              ⏳ TODO: Move loginpage here
│   │   │   │   │   │   └── login-page/
│   │   │   │   │   ├── view-models/
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── interview-feedback/         ✅ FULLY IMPLEMENTED
│   │   │   │   ├── domain/                 ✅ Complete
│   │   │   │   │   ├── entities/           ✅ All entities created
│   │   │   │   │   │   ├── feedback.entity.ts
│   │   │   │   │   │   ├── company-details.entity.ts
│   │   │   │   │   │   ├── coding-round.entity.ts
│   │   │   │   │   │   ├── technical-round.entity.ts
│   │   │   │   │   │   ├── hr-round.entity.ts
│   │   │   │   │   │   ├── question.entity.ts
│   │   │   │   │   │   ├── dsa-question.entity.ts
│   │   │   │   │   │   ├── computer-core-question.entity.ts
│   │   │   │   │   │   ├── system-design-question.entity.ts
│   │   │   │   │   │   ├── puzzle-based-question.entity.ts
│   │   │   │   │   │   ├── situation-based-question.entity.ts
│   │   │   │   │   │   ├── unexpected-question.entity.ts
│   │   │   │   │   │   ├── resource.entity.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── interfaces/         ✅ Complete
│   │   │   │   │   │   ├── feedback-repository.interface.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts            ✅ Barrel export
│   │   │   │   ├── application/            ✅ Complete
│   │   │   │   │   ├── dtos/               ✅ All DTOs created
│   │   │   │   │   │   ├── feedback-request.dto.ts
│   │   │   │   │   │   ├── feedback-response.dto.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── mappers/            ✅ Mapper created
│   │   │   │   │   │   ├── feedback.mapper.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── use-cases/          ✅ Use cases created
│   │   │   │   │   │   ├── submit-feedback.use-case.ts
│   │   │   │   │   │   ├── get-all-feedbacks.use-case.ts
│   │   │   │   │   │   ├── get-feedbacks-by-company.use-case.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── facades/            ✅ Facade created
│   │   │   │   │   │   ├── interview-feedback.facade.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts            ✅ Barrel export
│   │   │   │   ├── infrastructure/         ✅ Complete
│   │   │   │   │   ├── api/                ✅ API service created
│   │   │   │   │   │   ├── feedback-api.service.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── repositories/       ✅ Repository created
│   │   │   │   │   │   ├── feedback.repository.ts
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── providers.ts        ✅ DI providers created
│   │   │   │   │   └── index.ts            ✅ Barrel export
│   │   │   │   ├── presentation/           ⏳ TODO: Move components here
│   │   │   │   │   ├── components/
│   │   │   │   │   │   └── feedback-card/
│   │   │   │   │   ├── pages/
│   │   │   │   │   │   ├── interview-feedback-form-page/
│   │   │   │   │   │   └── feedback-display-page/
│   │   │   │   │   ├── view-models/
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts                ✅ Barrel export
│   │   │   │
│   │   │   ├── student-dashboard/          ✅ Structure created
│   │   │   │   ├── domain/
│   │   │   │   │   ├── entities/           ⏳ TODO: Create Student entity
│   │   │   │   │   ├── interfaces/         ⏳ TODO: Create IStudentRepository
│   │   │   │   │   └── index.ts
│   │   │   │   ├── application/
│   │   │   │   │   ├── dtos/               ⏳ TODO: Student DTOs
│   │   │   │   │   ├── mappers/
│   │   │   │   │   ├── use-cases/
│   │   │   │   │   ├── facades/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── infrastructure/
│   │   │   │   │   ├── api/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── providers.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── presentation/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── pages/              ⏳ TODO: Move mainpage here
│   │   │   │   │   │   └── main-page/
│   │   │   │   │   ├── view-models/
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts                    ✅ Barrel export
│   │   │
│   │   ├── layout/                         ✅ Structure created
│   │   │   ├── main-layout/                ⏳ TODO: Create layout component
│   │   │   ├── auth-layout/                ⏳ TODO: Create layout component
│   │   │   └── index.ts                    ⏳ TODO: Create barrel export
│   │   │
│   │   ├── app.config.ts                   ⏳ TODO: Update with providers
│   │   ├── app.routes.ts                   ⏳ TODO: Update with new paths
│   │   ├── app-module.ts                   ⏳ TODO: Update imports
│   │   └── app.ts                          📄 Root component
│   │
│   ├── assets/                             📦 Static assets
│   ├── styles/                             🎨 Global styles
│   ├── custom-theme.scss                   🎨 Material theme
│   ├── styles.less                         🎨 Global LESS styles
│   ├── index.html                          📄 HTML entry point
│   └── main.ts                             🚀 Application bootstrap
│
├── public/                                 📦 Public assets
├── node_modules/                           📦 Dependencies
├── README.md                               ✅ Architecture documentation
├── MIGRATION_GUIDE.md                      ✅ Step-by-step migration guide
├── ARCHITECTURE.md                         📄 This file
├── package.json                            📦 Project configuration
├── angular.json                            ⚙️ Angular CLI configuration
├── tsconfig.json                           ⚙️ TypeScript configuration
└── tsconfig.app.json                       ⚙️ App-specific TypeScript config
```

## Layer Dependency Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  (Components, Pages, View Models - Angular specific)        │
│                                                              │
│  • User Interface                                            │
│  • User Interaction                                          │
│  • Display Logic                                             │
└──────────────────────┬───────────────────────────────────────┘
                       │ Depends on ↓
┌──────────────────────▼───────────────────────────────────────┐
│                   APPLICATION LAYER                          │
│     (Use Cases, Facades, DTOs, Mappers)                     │
│                                                              │
│  • Application-specific business rules                       │
│  • Orchestration                                             │
│  • Data transformation                                       │
└──────────────────────┬───────────────────────────────────────┘
                       │ Depends on ↓
┌──────────────────────▼───────────────────────────────────────┐
│                      DOMAIN LAYER                            │
│        (Entities, Value Objects, Interfaces)                 │
│                                                              │
│  • Core business logic                                       │
│  • Business rules                                            │
│  • Framework-agnostic                                        │
│  • NO DEPENDENCIES ON OTHER LAYERS                           │
└──────────────────────▲───────────────────────────────────────┘
                       │ Implements ↑
┌──────────────────────┴───────────────────────────────────────┐
│                  INFRASTRUCTURE LAYER                        │
│         (API Services, Repositories)                         │
│                                                              │
│  • External communication                                    │
│  • Data access                                               │
│  • Third-party integrations                                  │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow Example: Submit Feedback

```
User Action (Submit Button)
         ↓
┌────────────────────────────────────────────────────────────┐
│ PRESENTATION: interview-feedback-form-page.component.ts    │
│ • Captures form data                                       │
│ • Calls facade method                                      │
└────────────┬───────────────────────────────────────────────┘
             ↓
┌────────────▼───────────────────────────────────────────────┐
│ APPLICATION: InterviewFeedbackFacade                       │
│ • submitFeedback(feedbackDto)                              │
│ • Converts DTO to Entity using FeedbackMapper              │
└────────────┬───────────────────────────────────────────────┘
             ↓
┌────────────▼───────────────────────────────────────────────┐
│ APPLICATION: SubmitFeedbackUseCase                         │
│ • Validates feedback entity                                │
│ • Calls repository method                                  │
└────────────┬───────────────────────────────────────────────┘
             ↓
┌────────────▼───────────────────────────────────────────────┐
│ INFRASTRUCTURE: FeedbackRepository                         │
│ • Converts Entity to DTO using FeedbackMapper              │
│ • Calls API service                                        │
└────────────┬───────────────────────────────────────────────┘
             ↓
┌────────────▼───────────────────────────────────────────────┐
│ INFRASTRUCTURE: FeedbackApiService                         │
│ • Makes HTTP POST request                                  │
│ • Returns Observable<FeedbackResponseDto>                  │
└────────────┬───────────────────────────────────────────────┘
             ↓
       Backend API
             ↓
    Response flows back up through the layers
             ↓
User sees success/error notification
```

## Feature Module Structure (Interview Feedback Example)

```
interview-feedback/
│
├── domain/                    🎯 Core Business Logic
│   ├── entities/              • Business objects with identity
│   │   ├── feedback.entity.ts
│   │   ├── company-details.entity.ts
│   │   └── ...
│   └── interfaces/            • Contracts for repositories
│       └── feedback-repository.interface.ts
│
├── application/               🔄 Application Flow
│   ├── dtos/                  • Data Transfer Objects (API)
│   ├── mappers/               • Convert Entity ↔ DTO
│   ├── use-cases/             • Application-specific logic
│   │   ├── submit-feedback.use-case.ts
│   │   └── ...
│   └── facades/               • Simplified interface
│       └── interview-feedback.facade.ts
│
├── infrastructure/            🔌 External Communication
│   ├── api/                   • HTTP client services
│   │   └── feedback-api.service.ts
│   └── repositories/          • Implement domain interfaces
│       └── feedback.repository.ts
│
└── presentation/              🎨 User Interface
    ├── components/            • Feature-specific components
    ├── pages/                 • Page/container components
    └── view-models/           • Presentation-specific data
```

## Module Communication

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Feature A      │     │   Feature B      │     │   Feature C      │
│  (Auth)          │     │  (Feedback)      │     │  (Dashboard)     │
└────────┬─────────┘     └────────┬─────────┘     └────────┬─────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                     ┌────────────▼────────────┐
                     │   CORE MODULE           │
                     │                         │
                     │  • Services             │
                     │  • Constants            │
                     │  • Enums                │
                     │  • Guards               │
                     │  • Interceptors         │
                     └─────────────────────────┘
                                  ▲
                                  │
                     ┌────────────┴────────────┐
                     │   SHARED MODULE         │
                     │                         │
                     │  • Reusable Components  │
                     │  • Directives           │
                     │  • Pipes                │
                     │  • Validators           │
                     └─────────────────────────┘
```

## Benefits Visualization

```
┌─────────────────────────────────────────────────────────────┐
│                    BENEFITS                                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📦 MAINTAINABILITY                                          │
│     • Clear separation of concerns                           │
│     • Easy to locate and modify code                         │
│     • Reduced cognitive load                                 │
│                                                              │
│  🧪 TESTABILITY                                              │
│     • Each layer can be tested independently                 │
│     • Easy to mock dependencies                              │
│     • Business logic is framework-agnostic                   │
│                                                              │
│  📈 SCALABILITY                                              │
│     • Add new features without affecting existing code       │
│     • Parallel development by multiple teams                 │
│     • Easy to refactor or replace layers                     │
│                                                              │
│  ♻️  REUSABILITY                                             │
│     • Shared components across features                      │
│     • Domain logic can be reused                             │
│     • Consistent patterns throughout the app                 │
│                                                              │
│  🔄 FRAMEWORK INDEPENDENCE                                   │
│     • Domain layer is pure TypeScript                        │
│     • Easy to migrate to other frameworks                    │
│     • Business logic survives framework changes              │
│                                                              │
│  👥 TEAM COLLABORATION                                       │
│     • Different teams can work on different layers           │
│     • Clear contracts between layers                         │
│     • Reduced merge conflicts                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Legend

- ✅ **Completed**: Fully implemented
- ⏳ **TODO**: Structure created, needs implementation
- 📦 **Package**: Configuration or dependencies
- 📄 **File**: Single file or component
- 🎨 **Styles**: Styling-related
- ⚙️ **Config**: Configuration file
- 🚀 **Bootstrap**: Application entry point
- 🎯 **Core Logic**: Business logic
- 🔄 **Flow**: Application flow logic
- 🔌 **External**: External communication
- 🎨 **UI**: User interface

---

**Last Updated**: November 2025  
**Status**: Core architecture implemented, migration in progress

