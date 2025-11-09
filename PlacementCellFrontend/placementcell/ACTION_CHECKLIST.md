# Action Checklist - Next Steps

## 📋 Quick Reference

This checklist outlines the remaining tasks to complete the migration to the layered architecture.

---

## ✅ Completed (60%)

- [x] Create core layer structure
- [x] Create constants (app, companies, question-types)
- [x] Create enums (interview, notification)
- [x] Create notification service
- [x] Create shared layer structure
- [x] Create features layer structure (authentication, interview-feedback, student-dashboard)
- [x] Implement interview-feedback feature (domain, application, infrastructure)
- [x] Create domain entities (13 entities)
- [x] Create domain interfaces
- [x] Create DTOs and mappers
- [x] Create use cases (submit, get all, get by company)
- [x] Create facade
- [x] Create API service
- [x] Create repository
- [x] Configure dependency injection providers
- [x] Create layout structure
- [x] Add path aliases to tsconfig.app.json
- [x] Create comprehensive documentation (5 documents)

---

## 🔄 In Progress / Pending (40%)

### Phase 1: Move Shared Components (Priority: HIGH) ⏳

- [ ] Move `src/app/components/counter/` → `src/app/shared/components/counter/`
- [ ] Move `src/app/components/drop-down/` → `src/app/shared/components/drop-down/`
- [ ] Move `src/app/components/duration-selector/` → `src/app/shared/components/duration-selector/`
- [ ] Move `src/app/components/greybox/` → `src/app/shared/components/greybox/`
- [ ] Move `src/app/components/inputquestionbox/` → `src/app/shared/components/input-question-box/`
- [ ] Move `src/app/components/notification/` → `src/app/shared/components/notification/`
- [ ] Move `src/app/components/number-input/` → `src/app/shared/components/number-input/`
- [ ] Move `src/app/components/radiobutton/` → `src/app/shared/components/radio-button/`
- [ ] Move `src/app/components/radio-group/` → `src/app/shared/components/radio-group/`
- [ ] Move `src/app/components/singleinput/` → `src/app/shared/components/single-input/`
- [ ] Create `src/app/shared/components/index.ts` barrel export
- [ ] Create `src/app/shared/index.ts` barrel export
- [ ] Update imports in components that use shared components

**Commands**:
```powershell
# From workspace root
Move-Item src/app/components/counter src/app/shared/components/counter
Move-Item src/app/components/drop-down src/app/shared/components/drop-down
Move-Item src/app/components/duration-selector src/app/shared/components/duration-selector
Move-Item src/app/components/greybox src/app/shared/components/greybox
Move-Item src/app/components/inputquestionbox src/app/shared/components/input-question-box
Move-Item src/app/components/notification src/app/shared/components/notification
Move-Item src/app/components/number-input src/app/shared/components/number-input
Move-Item src/app/components/radiobutton src/app/shared/components/radio-button
Move-Item src/app/components/radio-group src/app/shared/components/radio-group
Move-Item src/app/components/singleinput src/app/shared/components/single-input
```

---

### Phase 2: Migrate Interview Feedback Components (Priority: HIGH) ⏳

- [ ] Create `src/app/features/interview-feedback/presentation/components/feedback-card/`
- [ ] Move `src/app/feedbackcard/*` to above directory
- [ ] Create `src/app/features/interview-feedback/presentation/pages/interview-feedback-form-page/`
- [ ] Move `src/app/interview-feedback-form-student/*` to above directory
- [ ] Rename component class from `InterviewFeedbackFormStudent` to `InterviewFeedbackFormPageComponent`
- [ ] Create `src/app/features/interview-feedback/presentation/pages/feedback-display-page/`
- [ ] Move `src/app/studentinterviewfeedback-display/*` to above directory
- [ ] Update component imports to use `InterviewFeedbackFacade`
- [ ] Replace direct service calls with facade methods
- [ ] Update template imports and selectors
- [ ] Create `src/app/features/interview-feedback/presentation/components/index.ts`
- [ ] Create `src/app/features/interview-feedback/presentation/pages/index.ts`
- [ ] Create `src/app/features/interview-feedback/presentation/index.ts`

**Example Update**:
```typescript
// Before
import { FeedbackFormstudent } from '../service/feedback-formstudent';
constructor(private feedbackService: FeedbackFormstudent) {}

// After
import { InterviewFeedbackFacade } from '@features/interview-feedback/application/facades';
constructor(private feedbackFacade: InterviewFeedbackFacade) {}
```

---

### Phase 3: Update App Configuration (Priority: HIGH) ⏳

- [ ] Update `src/app/app.config.ts`:
  ```typescript
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

- [ ] Update `src/app/app.routes.ts` with lazy loading:
  ```typescript
  export const routes: Routes = [
    { path: '', redirectTo: 'student/login', pathMatch: 'full' },
    {
      path: 'student',
      children: [
        {
          path: 'login',
          loadComponent: () => import('@features/authentication/presentation/pages/login-page')
            .then(m => m.LoginPageComponent)
        },
        {
          path: 'mainpage',
          loadComponent: () => import('@features/student-dashboard/presentation/pages/main-page')
            .then(m => m.MainPageComponent)
        },
        {
          path: 'interview-feedback',
          loadComponent: () => import('@features/interview-feedback/presentation/pages/interview-feedback-form-page')
            .then(m => m.InterviewFeedbackFormPageComponent)
        },
        {
          path: 'interview-feedback-display',
          loadComponent: () => import('@features/interview-feedback/presentation/pages/feedback-display-page')
            .then(m => m.FeedbackDisplayPageComponent)
        }
      ]
    }
  ];
  ```

- [ ] Update `src/app/app-module.ts` (if using NgModule)

---

### Phase 4: Implement Authentication Feature (Priority: MEDIUM) ⏳

#### Domain Layer
- [ ] Create `src/app/features/authentication/domain/entities/user.entity.ts`
- [ ] Create `src/app/features/authentication/domain/interfaces/auth-repository.interface.ts`
- [ ] Create domain barrel exports

#### Application Layer
- [ ] Create `src/app/features/authentication/application/dtos/login-request.dto.ts`
- [ ] Create `src/app/features/authentication/application/dtos/login-response.dto.ts`
- [ ] Create `src/app/features/authentication/application/dtos/register.dto.ts`
- [ ] Create `src/app/features/authentication/application/mappers/user.mapper.ts`
- [ ] Create `src/app/features/authentication/application/use-cases/login-user.use-case.ts`
- [ ] Create `src/app/features/authentication/application/use-cases/logout-user.use-case.ts`
- [ ] Create `src/app/features/authentication/application/use-cases/register-user.use-case.ts`
- [ ] Create `src/app/features/authentication/application/facades/auth.facade.ts`
- [ ] Create application barrel exports

#### Infrastructure Layer
- [ ] Create `src/app/features/authentication/infrastructure/api/auth-api.service.ts`
- [ ] Create `src/app/features/authentication/infrastructure/repositories/auth.repository.ts`
- [ ] Create `src/app/features/authentication/infrastructure/providers.ts`
- [ ] Create infrastructure barrel exports

#### Presentation Layer
- [ ] Create `src/app/features/authentication/presentation/pages/login-page/`
- [ ] Move `src/app/loginpage/*` to above directory
- [ ] Update component to use `AuthFacade`
- [ ] Create presentation barrel exports

#### Core Layer
- [ ] Create `src/app/core/guards/auth.guard.ts`
- [ ] Implement route protection logic

---

### Phase 5: Implement Student Dashboard Feature (Priority: MEDIUM) ⏳

#### Domain Layer
- [ ] Create `src/app/features/student-dashboard/domain/entities/student.entity.ts`
- [ ] Create `src/app/features/student-dashboard/domain/interfaces/student-repository.interface.ts`
- [ ] Create domain barrel exports

#### Application Layer
- [ ] Create DTOs for student data
- [ ] Create `StudentMapper`
- [ ] Create use cases (get student info, update profile, etc.)
- [ ] Create `StudentDashboardFacade`
- [ ] Create application barrel exports

#### Infrastructure Layer
- [ ] Create `StudentApiService`
- [ ] Create `StudentRepository`
- [ ] Create providers
- [ ] Create infrastructure barrel exports

#### Presentation Layer
- [ ] Create `src/app/features/student-dashboard/presentation/pages/main-page/`
- [ ] Move `src/app/mainpage/*` to above directory
- [ ] Update component to use facade
- [ ] Create presentation barrel exports

---

### Phase 6: Create Layout Components (Priority: LOW) ⏳

- [ ] Create `src/app/layout/main-layout/main-layout.component.ts`
  - Header component
  - Sidebar component
  - Footer component
  - Content outlet

- [ ] Create `src/app/layout/auth-layout/auth-layout.component.ts`
  - Simple layout for login/register pages
  - No header/sidebar

- [ ] Create `src/app/layout/index.ts` barrel export

- [ ] Update routes to use layouts:
  ```typescript
  {
    path: 'student',
    component: MainLayoutComponent,
    children: [/* routes */]
  }
  ```

---

### Phase 7: Testing (Priority: MEDIUM) ⏳

- [ ] Write unit tests for domain entities
- [ ] Write unit tests for use cases
- [ ] Write unit tests for mappers
- [ ] Write integration tests for repositories
- [ ] Write component tests for presentation layer
- [ ] Test end-to-end flow for interview feedback submission
- [ ] Test authentication flow
- [ ] Test routing and navigation

---

### Phase 8: Clean Up (Priority: LOW) ⏳

After all migrations are complete and tested:

- [ ] Delete `src/app/components/` (if empty)
- [ ] Delete `src/app/models/` (replaced by domain entities)
- [ ] Delete `src/app/service/` (replaced by infrastructure)
- [ ] Delete `src/app/feedbackcard/` (moved to feature)
- [ ] Delete `src/app/interview-feedback-form-student/` (old structure, moved to feature)
- [ ] Delete `src/app/studentinterviewfeedback-display/` (moved to feature)
- [ ] Delete `src/app/loginpage/` (moved to authentication feature)
- [ ] Delete `src/app/mainpage/` (moved to student dashboard feature)
- [ ] Remove unused imports from `app-module.ts`
- [ ] Update `.gitignore` if needed

---

## 📊 Progress Tracker

| Phase | Tasks | Completed | Progress |
|-------|-------|-----------|----------|
| Core Infrastructure | 20 | 20 | ✅ 100% |
| Shared Components | 13 | 0 | ⏳ 0% |
| Interview Feedback Migration | 13 | 0 | ⏳ 0% |
| App Configuration | 3 | 0 | ⏳ 0% |
| Authentication Feature | 20 | 0 | ⏳ 0% |
| Student Dashboard Feature | 15 | 0 | ⏳ 0% |
| Layout Components | 4 | 0 | ⏳ 0% |
| Testing | 8 | 0 | ⏳ 0% |
| Clean Up | 10 | 0 | ⏳ 0% |
| **TOTAL** | **106** | **20** | **⏳ 19%** |

---

## 🎯 Recommended Order

1. **Phase 1**: Move shared components (enables other phases)
2. **Phase 3**: Update app configuration (enables testing)
3. **Phase 2**: Migrate interview feedback components
4. **Test**: Verify interview feedback flow works end-to-end
5. **Phase 4**: Implement authentication feature
6. **Test**: Verify authentication works
7. **Phase 5**: Implement student dashboard feature
8. **Test**: Verify dashboard works
9. **Phase 6**: Create layout components
10. **Phase 7**: Comprehensive testing
11. **Phase 8**: Clean up old files

---

## 🚀 Quick Commands

### Start Development Server
```bash
npm start
```

### Build Project
```bash
npm run build
```

### Run Tests
```bash
npm test
```

### Check for Linting Errors
```bash
ng lint
```

---

## 📚 Documentation References

- **Architecture Overview**: `README.md`
- **Migration Instructions**: `MIGRATION_GUIDE.md`
- **Visual Architecture**: `ARCHITECTURE.md`
- **Quick Start Guide**: `QUICK_START.md`
- **Implementation Summary**: `IMPLEMENTATION_SUMMARY.md`
- **This Checklist**: `ACTION_CHECKLIST.md`

---

## 💡 Tips

1. **Test frequently**: After each migration phase, test the affected features
2. **Commit often**: Commit after each successful phase
3. **Use path aliases**: Remember to use `@core`, `@shared`, `@features`, `@layout`
4. **Follow the pattern**: Use `interview-feedback` feature as a template
5. **Keep components thin**: Delegate logic to facades and use cases
6. **Documentation**: Update docs as you make changes

---

## ✅ Definition of Done

A migration phase is complete when:

- [ ] All files moved to correct locations
- [ ] All imports updated to use path aliases
- [ ] No linting errors
- [ ] All tests passing
- [ ] Feature works as expected in browser
- [ ] Documentation updated (if applicable)
- [ ] Old files deleted (if applicable)
- [ ] Code reviewed
- [ ] Changes committed to version control

---

**Last Updated**: November 2025  
**Current Status**: Core infrastructure complete, ready for component migration  
**Next Action**: Start Phase 1 - Move Shared Components

