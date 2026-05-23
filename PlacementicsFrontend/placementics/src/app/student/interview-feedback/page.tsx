"use client";

import { useState } from "react";
import { CompanySelect } from "@/src/components/CompanySelect";
import { Counter } from "@/src/components/Counter";
import { DurationSelector } from "@/src/components/DurationSelector";
import { GreyBox } from "@/src/components/GreyBox";
import { NumberInput } from "@/src/components/NumberInput";
import { RadioGroup } from "@/src/components/RadioGroup";
import { useToast } from "@/src/contexts/ToastContext";
import { Companies, Locations } from "@/src/lib/constants/companies.constants";
import type { Feedback } from "@/src/lib/domain/entities";
import {
  applyGreyBoxData,
  cloneFeedback,
  createDefaultFeedback,
} from "@/src/lib/feedback/feedback-helpers";
import { submitFeedbackEntity } from "@/src/lib/mappers/feedback-on-company.mapper";

const STEPS = [
  "Company Details",
  "Coding Round",
  "Technical Round",
  "HR Round",
  "Resources Used",
];

export default function InterviewFeedbackFormPage() {
  const { show } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [feedbackData, setFeedbackData] = useState<Feedback>(
    createDefaultFeedback(),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateFeedback(updater: (data: Feedback) => Feedback) {
    setFeedbackData((prev) => updater(cloneFeedback(prev)));
  }

  function handleGreyBoxChange(boxes: unknown[], section: string) {
    updateFeedback((data) => applyGreyBoxData(data, boxes, section));
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      await submitFeedbackEntity(feedbackData);
      show("Feedback submitted successfully!", "success");
    } catch {
      show("Failed to submit feedback. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Interview Feedback Form</h1>
      <div className="flex gap-8">
        <aside className="w-48 shrink-0">
          <nav className="space-y-2">
            {STEPS.map((step, index) => (
              <div
                key={step}
                className={`rounded px-3 py-2 text-sm ${
                  index === currentStep
                    ? "bg-blue-600 font-medium text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {step}
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex gap-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s - 1)}
                className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                ← Previous
              </button>
            )}
            {currentStep < STEPS.length - 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s + 1)}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Next →
              </button>
            )}
            {currentStep === STEPS.length - 1 && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            {currentStep === 0 && (
              <StepCompanyDetails
                feedback={feedbackData}
                onChange={updateFeedback}
              />
            )}
            {currentStep === 1 && (
              <StepCodingRound feedback={feedbackData} onChange={updateFeedback} onGreyBoxChange={handleGreyBoxChange} />
            )}
            {currentStep === 2 && (
              <StepTechnicalRound feedback={feedbackData} onChange={updateFeedback} onGreyBoxChange={handleGreyBoxChange} />
            )}
            {currentStep === 3 && (
              <StepHRRound onGreyBoxChange={handleGreyBoxChange} />
            )}
            {currentStep === 4 && (
              <StepResources onGreyBoxChange={handleGreyBoxChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCompanyDetails({
  feedback,
  onChange,
}: {
  feedback: Feedback;
  onChange: (fn: (data: Feedback) => Feedback) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Company Details</h2>
      <CompanySelect
        options={Companies}
        onSelect={(value) =>
          onChange((d) => {
            d.companyDetails.companyName = value;
            return d;
          })
        }
      />
      <div>
        <span className="mb-2 block font-medium">Job Profiles:</span>
        <RadioGroup
          name="jobProfile"
          options={[
            { label: "SDE", value: "sde" },
            { label: "AI/ML", value: "aiml" },
            { label: "Others", value: "others" },
          ]}
          onChange={(value) =>
            onChange((d) => {
              d.companyDetails.jobProfile = value;
              return d;
            })
          }
        />
      </div>
      <div>
        <span className="mb-2 block font-medium">No of Rounds:</span>
        <Counter
          onCountChange={(count) =>
            onChange((d) => {
              d.companyDetails.numRounds = count;
              return d;
            })
          }
        />
      </div>
      <div>
        <span className="mb-2 block font-medium">Job Type:</span>
        <RadioGroup
          name="jobType"
          options={[
            { label: "intern", value: "intern" },
            { label: "intern+fte", value: "intern+fte" },
            { label: "Fte", value: "Fte" },
          ]}
          onChange={(value) =>
            onChange((d) => {
              d.companyDetails.jobType = value;
              return d;
            })
          }
        />
      </div>
      <div>
        <span className="mb-2 block font-medium">CTC:</span>
        <NumberInput
          onValueChange={(value) =>
            onChange((d) => {
              d.companyDetails.ctc = value;
              return d;
            })
          }
        />
      </div>
      <div>
        <span className="mb-2 block font-medium">Work Mode:</span>
        <RadioGroup
          name="workMode"
          options={[
            { label: "WFH", value: "WFH" },
            { label: "Hybrid", value: "Hybrid" },
            { label: "Onsite", value: "Onsite" },
          ]}
          onChange={(value) =>
            onChange((d) => {
              d.companyDetails.workMode = value;
              return d;
            })
          }
        />
      </div>
      <CompanySelect
        label="Select Location"
        options={Locations}
        onSelect={(value) =>
          onChange((d) => {
            d.companyDetails.location = value;
            return d;
          })
        }
      />
    </div>
  );
}

function StepCodingRound({
  feedback,
  onChange,
  onGreyBoxChange,
}: {
  feedback: Feedback;
  onChange: (fn: (data: Feedback) => Feedback) => void;
  onGreyBoxChange: (boxes: unknown[], section: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Coding Round</h2>
      <div>
        <span className="mb-2 block font-medium">Coding Platform:</span>
        <RadioGroup
          name="codingPlatform"
          options={[
            { label: "HackerRank", value: "HackerRank" },
            { label: "Leetcode", value: "Leetcode" },
            { label: "HackerEarth", value: "HackerEarth" },
            { label: "Others", value: "Others" },
          ]}
          onChange={(value) =>
            onChange((d) => {
              d.codingRound.codingPlatform = value;
              return d;
            })
          }
        />
      </div>
      <div>
        <span className="mb-2 block font-medium">Duration:</span>
        <DurationSelector
          onDurationChange={(value) =>
            onChange((d) => {
              d.codingRound.codingDuration = value;
              return d;
            })
          }
        />
      </div>
      <div>
        <span className="mb-2 block font-medium">Question Asked:</span>
        <GreyBox section="CodingQuestion" onDataChange={onGreyBoxChange} />
      </div>
      <div>
        <span className="mb-2 block font-medium">Difficulty Level:</span>
        <RadioGroup
          name="codingDifficulty"
          options={[
            { label: "Easy", value: "Easy" },
            { label: "Medium", value: "Medium" },
            { label: "Difficult", value: "Difficult" },
          ]}
          onChange={(value) =>
            onChange((d) => {
              d.codingRound.codingDifficulty = value;
              return d;
            })
          }
        />
      </div>
      <div>
        <span className="mb-2 block font-medium">Interview Mode:</span>
        <RadioGroup
          name="codingInterviewMode"
          options={[
            { label: "Online", value: "online" },
            { label: "Offline", value: "offline" },
          ]}
          onChange={(value) =>
            onChange((d) => {
              d.codingRound.interviewMode = value;
              return d;
            })
          }
        />
      </div>
    </div>
  );
}

function StepTechnicalRound({
  feedback,
  onChange,
  onGreyBoxChange,
}: {
  feedback: Feedback;
  onChange: (fn: (data: Feedback) => Feedback) => void;
  onGreyBoxChange: (boxes: unknown[], section: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Technical Round</h2>
      <div>
        <span className="mb-2 block font-medium">Interview Mode:</span>
        <RadioGroup
          name="techInterviewMode"
          options={[
            { label: "Online", value: "online" },
            { label: "Offline", value: "offline" },
          ]}
          onChange={(value) =>
            onChange((d) => {
              d.technicalRound.interviewMode = value;
              return d;
            })
          }
        />
      </div>
      <div>
        <span className="mb-2 block font-medium">Interview Duration:</span>
        <DurationSelector
          onDurationChange={(value) =>
            onChange((d) => {
              d.technicalRound.Duration = value;
              return d;
            })
          }
        />
      </div>
      <div>
        <span className="mb-2 block font-medium">DSA question:</span>
        <GreyBox section="DSAQuestions" onDataChange={onGreyBoxChange} />
      </div>
      <div>
        <span className="mb-2 block font-medium">DBMS/OS/OOPs/CN Questions</span>
        <GreyBox section="CoreCSQuestions" onDataChange={onGreyBoxChange} />
      </div>
      <div>
        <span className="mb-2 block font-medium">System Design Questions</span>
        <GreyBox section="SystemDesign" onDataChange={onGreyBoxChange} />
      </div>
      <div>
        <span className="mb-2 block font-medium">Puzzle Based Questions:</span>
        <GreyBox section="PuzzleBasedQuestions" onDataChange={onGreyBoxChange} />
      </div>
    </div>
  );
}

function StepHRRound({
  onGreyBoxChange,
}: {
  onGreyBoxChange: (boxes: unknown[], section: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">HR Round</h2>
      <div>
        <span className="mb-2 block font-medium">Situation Based Questions:</span>
        <GreyBox section="SituationBasedQuestions" onDataChange={onGreyBoxChange} />
      </div>
      <div>
        <span className="mb-2 block font-medium">Unexpected Questions:</span>
        <GreyBox section="UnexpectedQuestions" onDataChange={onGreyBoxChange} />
      </div>
    </div>
  );
}

function StepResources({
  onGreyBoxChange,
}: {
  onGreyBoxChange: (boxes: unknown[], section: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Resources Used</h2>
      <div>
        <span className="mb-2 block font-medium">Resources:</span>
        <GreyBox section="Resources" onDataChange={onGreyBoxChange} />
      </div>
    </div>
  );
}