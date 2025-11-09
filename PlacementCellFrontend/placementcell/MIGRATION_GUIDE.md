<!-- This comment is here to prevent this file from being deleted -->

# Migration Guide - Layered Architecture

## Overview

This guide helps you migrate the existing PlacementCell codebase to the new layered architecture. The migration has been **partially completed**, with the core infrastructure in place.

## ✅ Completed Tasks

### 1. Core Layer
- ✅ Created directory structure
- ✅ Created constants (app, companies, question-types)
- ✅ Created enums (interview, notification)
- ✅ Created notification service
- ✅ Created barrel exports

### 2. Shared Layer
- ✅ Created directory structure (components, directives, pipes, validators)
- ⏳ **TODO**: Move existing reusable components from `src/app/components/`

### 3. Features Layer
- ✅ Created feature module structures
- ✅ **Interview Feedback Feature** - Fully implemented:
  - ✅ Domain layer (entities, interfaces)
  - ✅ Application layer (DTOs, mappers, use cases, facades)
  - ✅ Infrastructure layer (API services, repositories)
  - ⏳ Presentation layer (needs component migration)

- ⏳ **Authentication Feature** - Structure created, needs implementation
- ⏳ **Student Dashboard Feature** - Structure created, needs implementation

## 🔄 Pending Migration Tasks

### Phase 1: Move Shared Components

Move the following components from `src/app/components/` to `src/app/shared/components/`:

1. ✅ Directory structure created
2. Move components:
   - `counter/` → `src/app/shared/components/counter/`
   - `drop-down/` → `src/app/shared/components/drop-down/`
   - `duration-selector/` → `src/app/shared/components/duration-selector/`
   - `greybox/` → `src/app/shared/components/greybox/`
   - `inputquestionbox/` → `src/app/shared/components/input-question-box/`
   - `notification/` → `src/app/shared/components/notification/`
   - `number-input/` → `src/app/shared/components/number-input/`
   - `radio-button/` → `src/app/shared/components/radio-button/`
   - `radio-group/` → `src/app/shared/components/radio-group/`
   - `singleinput/` → `src/app/shared/components/single-input/`

3. Create `src/app/shared/components/index.ts` barrel export

### Phase 2: Move Interview Feedback Components

Move components to `src/app/features/interview-feedback/presentation/`:

1. **Pages** (Main container components):
   - `interview-feedback-form-student/` → `presentation/pages/interview-feedback-form-page/`
   - `studentinterviewfeedback-display/` → `presentation/pages/feedback-display-page/`
   
2. **Components** (Feature-specific components):
   - `feedbackcard/` → `presentation/components/feedback-card/`

3. Update imports in these components to use the new architecture:
   ```typescript
   // Old
   import { FeedbackFormstudent } from '../service/feedback-formstudent';
   
   // New
   import { InterviewFeedbackFacade } from '../../application/facades';
   ```

### Phase 3: Migrate Authentication Feature

1. **Domain Layer**:
   - Create `User` entity in `features/authentication/domain/entities/user.entity.ts`
   - Create `IAuthRepository` interface

2. **Application Layer**:
   - Create `LoginDto`, `RegisterDto` DTOs
   - Create `UserMapper`
   - Create `LoginUseCase`, `LogoutUseCase`, `RegisterUseCase`
   - Create `AuthFacade`

3. **Infrastructure Layer**:
   - Create `AuthApiService`
   - Create `AuthRepository` implementing `IAuthRepository`

4. **Presentation Layer**:
   - Move `loginpage/` → `presentation/pages/login-page/`
   - Create `AuthGuard` in `core/guards/auth.guard.ts`

### Phase 4: Migrate Student Dashboard Feature

1. **Domain Layer**:
   - Create `Student` entity
   - Create `IStudentRepository` interface

2. **Application Layer**:
   - Create DTOs for student data
   - Create mappers and use cases
   - Create `StudentDashboardFacade`

3. **Infrastructure Layer**:
   - Create API services
   - Create repository implementations

4. **Presentation Layer**:
   - Move `mainpage/` → `presentation/pages/main-page/`

### Phase 5: Update App Configuration

1. **Update `app.config.ts`**:
   ```typescript
   import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
   import { provideRouter } from '@angular/router';
   import { provideHttpClient, withInterceptors } from '@angular/common/http';
   import { routes } from './app.routes';
   import { INFRASTRUCTURE_PROVIDERS } from './features/interview-feedback/infrastructure/providers';

   export const appConfig: ApplicationConfig = {
     providers: [
       provideZoneChangeDetection({ eventCoalescing: true }),
       provideRouter(routes),
       provideHttpClient(),
       ...INFRASTRUCTURE_PROVIDERS
     ]
   };
   ```

2. **Update `app.routes.ts`**:
   ```typescript
   import { Routes } from '@angular/router';

   export const routes: Routes = [
     {
       path: '',
       redirectTo: 'student/login',
       pathMatch: 'full' 
     },
     {
       path: 'student',
       children: [
         {
           path: 'login',
           loadComponent: () => import('./features/authentication/presentation/pages/login-page/login-page.component')
             .then(m => m.LoginPageComponent)
         },
         {
           path: 'mainpage',
           loadComponent: () => import('./features/student-dashboard/presentation/pages/main-page/main-page.component')
             .then(m => m.MainPageComponent)
         },
         {
           path: 'interview-feedback',
           loadComponent: () => import('./features/interview-feedback/presentation/pages/interview-feedback-form-page/interview-feedback-form-page.component')
             .then(m => m.InterviewFeedbackFormPageComponent)
         },
         {
           path: 'interview-feedback-display',
           loadComponent: () => import('./features/interview-feedback/presentation/pages/feedback-display-page/feedback-display-page.component')
             .then(m => m.FeedbackDisplayPageComponent)
         }
       ]
     }
   ];
   ```

3. **Update `app-module.ts`** (if using NgModule):
   - Import shared module
   - Import feature modules
   - Remove old imports

### Phase 6: Clean Up Old Files

After migration is complete and tested:

1. Delete old directories:
   ```
   src/app/components/      (if all moved to shared)
   src/app/models/          (replaced by domain entities)
   src/app/service/         (replaced by infrastructure services)
   src/app/loginpage/       (moved to authentication feature)
   src/app/mainpage/        (moved to student dashboard feature)
   src/app/feedbackcard/    (moved to interview feedback feature)
   src/app/interview-feedback-form-student/  (old structure)
   src/app/studentinterviewfeedback-display/ (moved to feature)
   ```

## Import Path Reference

### Before (Old Structure)
```typescript
import { feedbackcarddata, Companies } from '../models/feedbackcard.model';
import { FeedbackFormstudent } from '../service/feedback-formstudent';
import { FeedbackFormstudentApi } from '../service/api/feedback-formstudent-api';
```

### After (New Structure)
```typescript
// Domain entities
import { Feedback } from '@features/interview-feedback/domain';

// Constants
import { COMPANIES, LOCATIONS } from '@core/constants';

// Enums
import { InterviewMode, DifficultyLevel } from '@core/enums';

// Services (via facade)
import { InterviewFeedbackFacade } from '@features/interview-feedback/application/facades';

// Shared components
import { DropDownComponent } from '@shared/components/drop-down';
import { SingleInputComponent } from '@shared/components/single-input';
```

### Path Aliases (Add to `tsconfig.json`)

```json
{
  "compilerOptions": {
    "paths": {
      "@core/*": ["src/app/core/*"],
      "@shared/*": ["src/app/shared/*"],
      "@features/*": ["src/app/features/*"],
      "@layout/*": ["src/app/layout/*"]
    }
  }
}
```

## Testing Strategy

1. **Unit Tests**:
   - Test domain entities and their business logic
   - Test use cases with mocked repositories
   - Test mappers for correct transformations

2. **Integration Tests**:
   - Test repositories with API services
   - Test facades with complete flow

3. **Component Tests**:
   - Test presentation components with mocked facades

## Benefits of This Architecture

1. **Separation of Concerns**: Each layer has a single, well-defined responsibility
2. **Testability**: Easy to unit test business logic independently
3. **Maintainability**: Clear structure makes code easy to find and modify
4. **Scalability**: Easy to add new features following the same pattern
5. **Reusability**: Shared components and utilities in one place
6. **Framework Independence**: Domain logic is decoupled from Angular

## Next Steps

1. Complete Phase 1: Move shared components
2. Complete Phase 2: Migrate interview feedback presentation layer
3. Complete Phase 3: Implement authentication feature
4. Complete Phase 4: Implement student dashboard feature
5. Complete Phase 5: Update app configuration
6. Complete Phase 6: Clean up old files
7. Add path aliases to `tsconfig.json`
8. Update all component tests
9. Test the entire application
10. Update documentation

## Need Help?

Refer to the main `README.md` for detailed architecture documentation and examples.

---

**Last Updated**: November 2025  
**Status**: In Progress (Core infrastructure completed, migration in progress)

