# Quick Start Guide - Layered Architecture

## 🚀 Getting Started

This guide helps you quickly understand and use the new layered architecture.

## Project Status

✅ **Core Infrastructure**: Complete  
✅ **Interview Feedback Feature**: Complete (domain, application, infrastructure layers)  
⏳ **Component Migration**: In progress  
⏳ **Authentication Feature**: Structure ready, needs implementation  
⏳ **Student Dashboard Feature**: Structure ready, needs implementation  

## Directory Overview

```
src/app/
├── core/           # App-wide services, constants, enums (import once)
├── shared/         # Reusable UI components (import anywhere)
├── features/       # Business features (domain-driven)
└── layout/         # Layout components
```

## How to Use Each Layer

### 1. Using Core Constants and Enums

```typescript
// Import constants
import { COMPANIES, LOCATIONS, APP_CONSTANTS } from '@core/constants';

// Import enums
import { InterviewMode, DifficultyLevel, NotificationType } from '@core/enums';

// Import core services
import { NotificationService } from '@core/services';

// Example usage
constructor(private notificationService: NotificationService) {}

showSuccess() {
  this.notificationService.success('Operation completed!');
}

getCompanyList() {
  return COMPANIES; // ['Google', 'Microsoft', ...]
}
```

### 2. Using Shared Components

```typescript
// Import in your component
import { DropDownComponent } from '@shared/components/drop-down';
import { SingleInputComponent } from '@shared/components/single-input';

// Use in template
<app-drop-down [options]="companies" (selectionChange)="onCompanyChange($event)"></app-drop-down>
```

### 3. Using Features (Facades)

**Components should ONLY interact with facades, never directly with repositories or API services.**

```typescript
// Import the facade
import { InterviewFeedbackFacade } from '@features/interview-feedback/application/facades';
import { FeedbackRequestDto } from '@features/interview-feedback/application/dtos';

export class InterviewFeedbackFormComponent {
  feedbackData: FeedbackRequestDto;

  constructor(private feedbackFacade: InterviewFeedbackFacade) {
    // Initialize with empty feedback
    this.feedbackData = this.feedbackFacade.createEmptyFeedback();
  }

  onSubmit() {
    this.feedbackFacade.submitFeedback(this.feedbackData).subscribe({
      next: (response) => {
        console.log('Feedback submitted successfully', response);
      },
      error: (error) => {
        console.error('Error submitting feedback', error);
      }
    });
  }

  loadAllFeedbacks() {
    this.feedbackFacade.getAllFeedbacks().subscribe({
      next: (feedbacks) => {
        console.log('All feedbacks:', feedbacks);
      }
    });
  }

  loadFeedbacksByCompany(companyName: string) {
    this.feedbackFacade.getFeedbacksByCompany(companyName).subscribe({
      next: (feedbacks) => {
        console.log(`Feedbacks for ${companyName}:`, feedbacks);
      }
    });
  }
}
```

## Path Aliases

Once configured in `tsconfig.json`, you can use clean imports:

```typescript
// Instead of this (old way):
import { feedbackcarddata } from '../../../models/feedbackcard.model';
import { FeedbackFormstudent } from '../../../service/feedback-formstudent';

// Use this (new way):
import { FeedbackRequestDto } from '@features/interview-feedback/application/dtos';
import { InterviewFeedbackFacade } from '@features/interview-feedback/application/facades';
import { COMPANIES } from '@core/constants';
import { DropDownComponent } from '@shared/components/drop-down';
```

## Creating a New Feature

Follow this pattern when adding a new feature:

### Step 1: Create Feature Structure

```bash
mkdir -p src/app/features/my-feature/{domain,application,infrastructure,presentation}/{entities,interfaces,dtos,mappers,use-cases,facades,api,repositories,components,pages,view-models}
```

### Step 2: Define Domain Entities

```typescript
// src/app/features/my-feature/domain/entities/my-entity.entity.ts
export class MyEntity {
  constructor(
    public id: string,
    public name: string
  ) {}

  isValid(): boolean {
    return this.name.trim() !== '';
  }
}
```

### Step 3: Define Domain Interface

```typescript
// src/app/features/my-feature/domain/interfaces/my-repository.interface.ts
import { Observable } from 'rxjs';
import { MyEntity } from '../entities';

export interface IMyRepository {
  getAll(): Observable<MyEntity[]>;
  getById(id: string): Observable<MyEntity>;
  create(entity: MyEntity): Observable<MyEntity>;
}
```

### Step 4: Create DTOs

```typescript
// src/app/features/my-feature/application/dtos/my-request.dto.ts
export interface MyRequestDto {
  name: string;
}

export interface MyResponseDto extends MyRequestDto {
  id: string;
  createdAt: Date;
}
```

### Step 5: Create Mapper

```typescript
// src/app/features/my-feature/application/mappers/my.mapper.ts
import { Injectable } from '@angular/core';
import { MyEntity } from '../../domain/entities';
import { MyRequestDto, MyResponseDto } from '../dtos';

@Injectable({ providedIn: 'root' })
export class MyMapper {
  toRequestDto(entity: MyEntity): MyRequestDto {
    return { name: entity.name };
  }

  fromResponseDto(dto: MyResponseDto): MyEntity {
    return new MyEntity(dto.id, dto.name);
  }
}
```

### Step 6: Create Use Case

```typescript
// src/app/features/my-feature/application/use-cases/get-all.use-case.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyEntity } from '../../domain/entities';
import { IMyRepository } from '../../domain/interfaces';

@Injectable({ providedIn: 'root' })
export class GetAllMyEntitiesUseCase {
  constructor(private repository: IMyRepository) {}

  execute(): Observable<MyEntity[]> {
    return this.repository.getAll();
  }
}
```

### Step 7: Create Facade

```typescript
// src/app/features/my-feature/application/facades/my-feature.facade.ts
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetAllMyEntitiesUseCase } from '../use-cases';
import { MyMapper } from '../mappers';
import { MyResponseDto } from '../dtos';

@Injectable({ providedIn: 'root' })
export class MyFeatureFacade {
  constructor(
    private getAllUseCase: GetAllMyEntitiesUseCase,
    private mapper: MyMapper
  ) {}

  getAll(): Observable<MyResponseDto[]> {
    return this.getAllUseCase.execute().pipe(
      map(entities => entities.map(e => this.mapper.toRequestDto(e) as MyResponseDto))
    );
  }
}
```

### Step 8: Create API Service

```typescript
// src/app/features/my-feature/infrastructure/api/my-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyResponseDto } from '../../application/dtos';

@Injectable({ providedIn: 'root' })
export class MyApiService {
  private apiUrl = 'http://localhost:3000/api/my-entities';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MyResponseDto[]> {
    return this.http.get<MyResponseDto[]>(this.apiUrl);
  }
}
```

### Step 9: Create Repository Implementation

```typescript
// src/app/features/my-feature/infrastructure/repositories/my.repository.ts
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MyEntity } from '../../domain/entities';
import { IMyRepository } from '../../domain/interfaces';
import { MyApiService } from '../api';
import { MyMapper } from '../../application/mappers';

@Injectable({ providedIn: 'root' })
export class MyRepository implements IMyRepository {
  constructor(
    private apiService: MyApiService,
    private mapper: MyMapper
  ) {}

  getAll(): Observable<MyEntity[]> {
    return this.apiService.getAll().pipe(
      map(dtos => dtos.map(dto => this.mapper.fromResponseDto(dto)))
    );
  }

  getById(id: string): Observable<MyEntity> {
    // Implementation
    throw new Error('Not implemented');
  }

  create(entity: MyEntity): Observable<MyEntity> {
    // Implementation
    throw new Error('Not implemented');
  }
}
```

### Step 10: Configure Providers

```typescript
// src/app/features/my-feature/infrastructure/providers.ts
import { Provider } from '@angular/core';
import { IMyRepository } from '../domain/interfaces';
import { MyRepository } from './repositories';

export const provideMyRepository = (): Provider => ({
  provide: IMyRepository,
  useClass: MyRepository
});

export const MY_FEATURE_PROVIDERS: Provider[] = [
  provideMyRepository()
];
```

### Step 11: Register Providers in App Config

```typescript
// src/app/app.config.ts
import { MY_FEATURE_PROVIDERS } from './features/my-feature/infrastructure/providers';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    ...MY_FEATURE_PROVIDERS
  ]
};
```

### Step 12: Create Component Using Facade

```typescript
// src/app/features/my-feature/presentation/pages/my-page/my-page.component.ts
import { Component, OnInit } from '@angular/core';
import { MyFeatureFacade } from '../../../application/facades';
import { MyResponseDto } from '../../../application/dtos';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  standalone: true
})
export class MyPageComponent implements OnInit {
  items: MyResponseDto[] = [];

  constructor(private facade: MyFeatureFacade) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.facade.getAll().subscribe({
      next: (items) => {
        this.items = items;
      },
      error: (error) => {
        console.error('Error loading items:', error);
      }
    });
  }
}
```

## Common Patterns

### 1. Form Handling

```typescript
export class MyFormComponent {
  formData: MyRequestDto;

  constructor(private facade: MyFeatureFacade) {
    this.formData = this.facade.createEmptyForm();
  }

  onSubmit() {
    this.facade.submit(this.formData).subscribe({
      next: (response) => {
        // Handle success
      },
      error: (error) => {
        // Handle error
      }
    });
  }
}
```

### 2. Data Loading

```typescript
export class MyListComponent implements OnInit {
  items$ = this.facade.getAll(); // Observable approach

  constructor(private facade: MyFeatureFacade) {}
}
```

### 3. Error Handling

```typescript
export class MyComponent {
  constructor(
    private facade: MyFeatureFacade,
    private notificationService: NotificationService
  ) {}

  loadData() {
    this.facade.getData().subscribe({
      next: (data) => {
        this.notificationService.success('Data loaded successfully');
      },
      error: (error) => {
        this.notificationService.error('Failed to load data');
        console.error(error);
      }
    });
  }
}
```

## Best Practices

### ✅ DO

- Use facades in components, never repositories directly
- Keep domain entities framework-agnostic
- Use DTOs for API communication
- Use enums for fixed values
- Use constants for configuration
- Create barrel exports (index.ts) for each layer
- Test business logic in use cases
- Keep components thin

### ❌ DON'T

- Don't import infrastructure services in components
- Don't put business logic in components
- Don't use domain entities in templates (use DTOs/ViewModels)
- Don't create circular dependencies between layers
- Don't skip the mapper when converting between entities and DTOs
- Don't create tight coupling between features

## File Naming Conventions

| Type | Example |
|------|---------|
| Entity | `user.entity.ts` |
| Interface | `user-repository.interface.ts` |
| DTO | `user-request.dto.ts` |
| Mapper | `user.mapper.ts` |
| Use Case | `login-user.use-case.ts` |
| Facade | `auth.facade.ts` |
| API Service | `auth-api.service.ts` |
| Repository | `user.repository.ts` |
| Component | `login-form.component.ts` |
| Page | `login-page.component.ts` |
| View Model | `user-form.view-model.ts` |

## Testing

### Unit Test Example (Use Case)

```typescript
describe('SubmitFeedbackUseCase', () => {
  let useCase: SubmitFeedbackUseCase;
  let mockRepository: jasmine.SpyObj<IFeedbackRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('IFeedbackRepository', ['submitFeedback']);
    useCase = new SubmitFeedbackUseCase(mockRepository);
  });

  it('should submit valid feedback', () => {
    const feedback = new Feedback(/* ... */);
    mockRepository.submitFeedback.and.returnValue(of(feedback));

    useCase.execute(feedback).subscribe(result => {
      expect(result).toEqual(feedback);
    });

    expect(mockRepository.submitFeedback).toHaveBeenCalledWith(feedback);
  });
});
```

## Next Steps

1. Read the detailed [README.md](./README.md) for complete architecture documentation
2. Check [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for step-by-step migration instructions
3. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for visual architecture overview
4. Start migrating existing components to the new structure
5. Implement authentication and student dashboard features

## Need Help?

- Check the example implementation in `features/interview-feedback/`
- All layers are fully implemented and documented
- Follow the pattern for new features

---

**Last Updated**: November 2025  
**Happy Coding! 🚀**

