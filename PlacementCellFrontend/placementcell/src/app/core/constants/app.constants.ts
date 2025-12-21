/**
 * Application-wide constants
 */

export const APP_CONSTANTS = {
  /**
   * API Configuration
   */
  API: {
    BASE_URL: 'https://localhost:7070/api',
    ENDPOINTS: {
      AUTH: '/auth',
      STUDENTS: '/Students',
      FEEDBACK_ON_COMPANY: '/feedbackoncompany'
    }
  },

  /**
   * Route Paths
   */
  ROUTES: {
    ROOT: '',
    STUDENT: {
      LOGIN: 'student/login',
      MAIN_PAGE: 'student/mainpage',
      INTERVIEW_FEEDBACK: 'student/interview-feedback',
      FEEDBACK_DISPLAY: 'student/interview-feedback-display'
    }
  },

  /**
   * Form Configuration
   */
  FORM: {
    STEPS: [
      'Company Details',
      'Coding Round',
      'Technical Round',
      'HR Round',
      'Resources Used'
    ]
  },

  /**
   * Notification Configuration
   */
  NOTIFICATION: {
    DURATION: 3000, // milliseconds
    POSITION: {
      HORIZONTAL: 'center',
      VERTICAL: 'top'
    }
  }
} as const;

