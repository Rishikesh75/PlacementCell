"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import StarRating from "./StarRating";
import styles from "../CompanyFeedbackFormPage.module.css";

type RoundDetail = {
  heading: string;
  questions: string[];
};

const HEADING_PLACEHOLDERS = [
  "e.g. Coding round",
  "e.g. Technical round",
  "e.g. HR round",
];

function emptyRound(): RoundDetail {
  return { heading: "", questions: [] };
}

function parseRoundCount(value: string): number {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 0;
  }

  return parsed;
}

function syncRoundDetails(
  current: RoundDetail[],
  count: number,
): RoundDetail[] {
  if (count <= 0) {
    return [];
  }

  if (current.length === count) {
    return current;
  }

  if (current.length > count) {
    return current.slice(0, count);
  }

  return [
    ...current,
    ...Array.from({ length: count - current.length }, emptyRound),
  ];
}

export default function CompanyFeedbackForm() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [roleOffered, setRoleOffered] = useState("");
  const [rounds, setRounds] = useState("");
  const [rating, setRating] = useState(4);
  const [roundDetails, setRoundDetails] = useState<RoundDetail[]>([]);

  const roundCount = parseRoundCount(rounds);
  const canSubmit = roundCount >= 1;

  function handleRoundsChange(value: string) {
    if (value !== "" && !/^\d+$/.test(value)) {
      return;
    }

    setRounds(value);
    setRoundDetails((current) =>
      syncRoundDetails(current, parseRoundCount(value)),
    );
  }

  function updateHeading(roundIndex: number, heading: string) {
    setRoundDetails((current) =>
      current.map((round, index) =>
        index === roundIndex ? { ...round, heading } : round,
      ),
    );
  }

  function addQuestion(roundIndex: number) {
    setRoundDetails((current) =>
      current.map((round, index) =>
        index === roundIndex
          ? { ...round, questions: [...round.questions, ""] }
          : round,
      ),
    );
  }

  function updateQuestion(
    roundIndex: number,
    questionIndex: number,
    value: string,
  ) {
    setRoundDetails((current) =>
      current.map((round, index) =>
        index === roundIndex
          ? {
              ...round,
              questions: round.questions.map((question, qIndex) =>
                qIndex === questionIndex ? value : question,
              ),
            }
          : round,
      ),
    );
  }

  function removeQuestion(roundIndex: number, questionIndex: number) {
    setRoundDetails((current) =>
      current.map((round, index) =>
        index === roundIndex
          ? {
              ...round,
              questions: round.questions.filter(
                (_, qIndex) => qIndex !== questionIndex,
              ),
            }
          : round,
      ),
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    console.log({
      company,
      roleOffered,
      rounds: roundCount,
      rating,
      roundDetails: roundDetails.map((round) => ({
        heading: round.heading.trim(),
        questions: round.questions.map((question) => question.trim()).filter(Boolean),
      })),
    });

    router.push("/feedbackOnCompanyInterviewPage");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          placeholder="e.g. Goldman Sachs"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="roleOffered">Role offered</label>
        <input
          id="roleOffered"
          type="text"
          placeholder="e.g. Technology Analyst"
          value={roleOffered}
          onChange={(event) => setRoleOffered(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="rounds">Number of rounds</label>
        <input
          id="rounds"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 4"
          value={rounds}
          onChange={(event) => handleRoundsChange(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label id="rating-label">Overall rating</label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      {roundDetails.map((round, roundIndex) => (
        <section
          key={roundIndex}
          className={styles.roundSection}
          aria-labelledby={`round-heading-${roundIndex}`}
        >
          <h2 id={`round-heading-${roundIndex}`} className={styles.roundTitle}>
            Round {roundIndex + 1}
          </h2>

          <div className={styles.field}>
            <label htmlFor={`round-heading-input-${roundIndex}`}>Heading</label>
            <input
              id={`round-heading-input-${roundIndex}`}
              type="text"
              placeholder={
                HEADING_PLACEHOLDERS[roundIndex % HEADING_PLACEHOLDERS.length]
              }
              value={round.heading}
              onChange={(event) =>
                updateHeading(roundIndex, event.target.value)
              }
              required
            />
          </div>

          {round.questions.length > 0 ? (
            <div className={styles.questions}>
              {round.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className={styles.questionRow}
                >
                  <label
                    className={styles.visuallyHidden}
                    htmlFor={`round-${roundIndex}-question-${questionIndex}`}
                  >
                    Question {questionIndex + 1}
                  </label>
                  <input
                    id={`round-${roundIndex}-question-${questionIndex}`}
                    className={styles.questionInput}
                    type="text"
                    placeholder="Enter the question asked"
                    value={question}
                    onChange={(event) =>
                      updateQuestion(
                        roundIndex,
                        questionIndex,
                        event.target.value,
                      )
                    }
                  />
                  <button
                    type="button"
                    className={styles.removeQuestion}
                    aria-label={`Remove question ${questionIndex + 1} from round ${roundIndex + 1}`}
                    onClick={() => removeQuestion(roundIndex, questionIndex)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <button
            type="button"
            className={styles.addQuestion}
            onClick={() => addQuestion(roundIndex)}
          >
            + Add question
          </button>
        </section>
      ))}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={!canSubmit}
      >
        Submit feedback
      </button>
    </form>
  );
}
