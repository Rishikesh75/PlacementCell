"use client";

import type {
  CompanyDetails,
  CodingRound,
  TechnicalRound,
  HRRound,
  Resource,
} from "@/src/lib/domain/entities";
import { useState } from "react";

interface FeedbackCardProps {
  companyDetails: CompanyDetails;
  codingRound: CodingRound;
  technicalRound: TechnicalRound;
  hrRound: HRRound;
  resources: Resource[];
}

export function FeedbackCard({
  companyDetails,
  codingRound,
  technicalRound,
  hrRound,
  resources,
}: FeedbackCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="mb-4 cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
      >
        <h2 className="text-xl font-semibold">{companyDetails.companyName}</h2>
        <p>Profile: {companyDetails.jobProfile}</p>
        <p>Rounds: {companyDetails.numRounds}</p>
        <p>Job Type: {companyDetails.jobType}</p>
        <p>CTC: {companyDetails.ctc}</p>
        <p>Work Mode: {companyDetails.workMode}</p>
        <p>Location: {companyDetails.location}</p>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="my-8 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold">{companyDetails.companyName}</h2>
            <h3 className="mb-4 text-lg text-gray-600">
              {companyDetails.jobProfile} — {companyDetails.ctc}
            </h3>

            <Section title="Coding Round">
              <p>
                <strong>Platform:</strong> {codingRound.codingPlatform}
              </p>
              <p>
                <strong>Duration:</strong> {codingRound.codingDuration}
              </p>
              <p>
                <strong>Questions Asked:</strong>
              </p>
              <ul className="list-disc pl-5">
                {codingRound.codingQuestions.map((q, i) => (
                  <li key={i}>{q.question}</li>
                ))}
              </ul>
              <p>
                <strong>Difficulty:</strong> {codingRound.codingDifficulty}
              </p>
              <p>
                <strong>Interview Mode:</strong> {codingRound.interviewMode}
              </p>
            </Section>

            <Section title="Technical Round">
              <p>
                <strong>Interview Mode:</strong> {technicalRound.interviewMode}
              </p>
              <p>
                <strong>Duration:</strong> {technicalRound.Duration}
              </p>
              <QuestionList
                title="DSA Questions"
                items={technicalRound.dsaQuestions.map(
                  (q) => `${q.questionType} ${q.question}`,
                )}
              />
              <QuestionList
                title="System Design Questions"
                items={technicalRound.systemDesignQuestions.map(
                  (q) => `${q.questionType} ${q.question}`,
                )}
              />
              <QuestionList
                title="Computer Core Questions"
                items={technicalRound.computerCoreQuestions.map(
                  (q) => `${q.questionType} ${q.question}`,
                )}
              />
              <QuestionList
                title="Puzzle Based Questions"
                items={technicalRound.puzzleBasedQuestions.map((q) => q.question)}
              />
            </Section>

            <Section title="HR Round">
              <QuestionList
                title="Situation Based Questions"
                items={hrRound.situationBasedQuestions.map((q) => q.question)}
              />
              <QuestionList
                title="Unexpected Questions"
                items={hrRound.unexpectedQuestions.map((q) => q.question)}
              />
            </Section>

            <Section title="Resources">
              {resources.map((resource, i) => (
                <div key={i} className="mb-2 rounded bg-gray-50 p-3">
                  <p>
                    <strong>Category:</strong> {resource.category}
                  </p>
                  <p>
                    <strong>Link:</strong>{" "}
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {resource.link}
                    </a>
                  </p>
                  <p>
                    <strong>Description:</strong> {resource.Description}
                  </p>
                </div>
              ))}
            </Section>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 rounded border border-gray-100 bg-gray-50 p-4">
      <h4 className="mb-2 font-semibold">{title}</h4>
      <div className="space-y-1 text-sm">{children}</div>
    </div>
  );
}

function QuestionList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mb-2">
      <p>
        <strong>{title}:</strong>
      </p>
      <ul className="list-disc pl-5">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}