import styles from "../InterviewSlotBookingPage.module.css";

const STEPS = [
  { id: 1, label: "Register company" },
  { id: 2, label: "Choose a slot" },
  { id: 3, label: "Confirmation" },
] as const;

interface ProgressStepperProps {
  currentStep?: number;
}

export default function ProgressStepper({
  currentStep = 2,
}: ProgressStepperProps) {
  return (
    <ol className={styles.stepper} aria-label="Registration progress">
      {STEPS.map((step, index) => {
        const done = step.id < currentStep;
        const active = step.id === currentStep;

        return (
          <li
            key={step.id}
            className={`${styles.step} ${done ? styles.stepDone : ""} ${
              active ? styles.stepActive : ""
            }`}
          >
            {index > 0 ? <span className={styles.stepLine} /> : null}

            <span className={styles.stepMarker} aria-hidden="true">
              {done ? (
                <svg viewBox="0 0 16 16" width="12" height="12">
                  <path
                    d="M3.5 8.2 6.4 11l6.1-6.6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                step.id
              )}
            </span>

            <span className={styles.stepLabel}>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
