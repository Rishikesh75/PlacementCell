import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackDisplayPageComponent } from './feedback-display-page.component';
import { InterviewFeedbackFacade } from '../../../application/facades';
import { of, throwError } from 'rxjs';

describe('FeedbackDisplayPageComponent', () => {
  let component: FeedbackDisplayPageComponent;
  let fixture: ComponentFixture<FeedbackDisplayPageComponent>;
  let mockFacade: jasmine.SpyObj<InterviewFeedbackFacade>;

  beforeEach(async () => {
    mockFacade = jasmine.createSpyObj('InterviewFeedbackFacade', [
      'getAllFeedbacks',
      'getFeedbacksByCompany'
    ]);

    await TestBed.configureTestingModule({
      declarations: [FeedbackDisplayPageComponent],
      providers: [
        { provide: InterviewFeedbackFacade, useValue: mockFacade }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackDisplayPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load feedbacks on init', () => {
    const mockFeedbacks = [];
    mockFacade.getAllFeedbacks.and.returnValue(of(mockFeedbacks));

    fixture.detectChanges(); // triggers ngOnInit

    expect(mockFacade.getAllFeedbacks).toHaveBeenCalled();
    expect(component.feedbacks).toEqual(mockFeedbacks);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading feedbacks', () => {
    mockFacade.getAllFeedbacks.and.returnValue(
      throwError(() => new Error('Network error'))
    );

    fixture.detectChanges();

    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });

  it('should filter feedbacks by company', () => {
    const mockFeedbacks = [];
    mockFacade.getFeedbacksByCompany.and.returnValue(of(mockFeedbacks));

    component.filterByCompany('Google');

    expect(mockFacade.getFeedbacksByCompany).toHaveBeenCalledWith('Google');
    expect(component.feedbacks).toEqual(mockFeedbacks);
  });

  it('should refresh feedbacks', () => {
    const mockFeedbacks = [];
    mockFacade.getAllFeedbacks.and.returnValue(of(mockFeedbacks));

    component.refresh();

    expect(mockFacade.getAllFeedbacks).toHaveBeenCalled();
  });
});

