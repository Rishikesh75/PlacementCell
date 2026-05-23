"use client";

import { useEffect, useState } from "react";
import { CompanySelect } from "./CompanySelect";
import { QuestionInput } from "./QuestionInput";
import { RadioGroup } from "./RadioGroup";
import {
  CoreCSquestionType,
  DSAQuestionType,
  ResourceCategory,
} from "@/src/lib/constants/question-types.constants";
import Image from "next/image";

type GreyBoxSection =
  | "CodingQuestion"
  | "DSAQuestions"
  | "CoreCSQuestions"
  | "SystemDesign"
  | "PuzzleBasedQuestions"
  | "SituationBasedQuestions"
  | "UnexpectedQuestions"
  | "Resources";

interface GreyBoxProps {
  section: GreyBoxSection;
  onDataChange: (boxes: unknown[], section: string) => void;
}

export function GreyBox({ section, onDataChange }: GreyBoxProps) {
  const [boxes, setBoxes] = useState<Record<string, unknown>[]>([createBox(section, 0)]);

  useEffect(() => {
    setBoxes([createBox(section, 0)]);
  }, [section]);

  function addBox() {
    setBoxes((prev) => [...prev, createBox(section, prev.length)]);
  }

  function removeBox(index: number) {
    setBoxes((prev) => prev.filter((_, i) => i !== index));
  }

  function updateBox(index: number, updates: Record<string, unknown>) {
    setBoxes((prev) =>
      prev.map((box, i) => (i === index ? { ...box, ...updates } : box)),
    );
  }

  function handleDone(index: number) {
    onDataChange(boxes, section);
    updateBox(index, { isDone: true });
  }

  return (
    <div className="mb-4 rounded-lg bg-gray-100 p-4">
      <button
        type="button"
        onClick={addBox}
        className="mb-3 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
      >
        Add
      </button>

      <div className="space-y-4">
        {boxes.map((box, index) => (
          <div key={index} className="mb-4 rounded border border-gray-200 bg-white p-3">
              {section === "CodingQuestion" && (
                <QuestionInput
                  onSubmit={(value) => updateBox(index, { value })}
                />
              )}

              {(section === "DSAQuestions" || section === "CoreCSQuestions") && (
                <div className="space-y-3">
                  <CompanySelect
                    label={
                      section === "DSAQuestions"
                        ? "Select DSA Question"
                        : "Select CoreCS Question Type"
                    }
                    options={
                      section === "DSAQuestions"
                        ? DSAQuestionType
                        : CoreCSquestionType
                    }
                    onSelect={(value) => updateBox(index, { QuestionType: value })}
                  />
                  <QuestionInput
                    onSubmit={(value) => updateBox(index, { Question: value })}
                  />
                  <RadioGroup
                    name={`difficulty-${section}-${index}`}
                    options={[
                      { label: "Easy", value: "Easy" },
                      { label: "Medium", value: "Medium" },
                      { label: "Difficult", value: "Difficult" },
                    ]}
                    onChange={(value) =>
                      updateBox(index, { DifficultyLevel: value })
                    }
                  />
                </div>
              )}

              {section === "SystemDesign" && (
                <div className="space-y-3">
                  <RadioGroup
                    name={`system-design-${index}`}
                    options={[
                      { label: "HLD", value: "HLD" },
                      { label: "LLD", value: "LLD" },
                    ]}
                    onChange={(value) => updateBox(index, { QuestionType: value })}
                  />
                  <QuestionInput
                    onSubmit={(value) => updateBox(index, { Question: value })}
                  />
                </div>
              )}

              {section === "PuzzleBasedQuestions" && (
                <div className="space-y-3">
                  <RadioGroup
                    name={`puzzle-${index}`}
                    options={[
                      { label: "Easy", value: "Easy" },
                      { label: "Medium", value: "Medium" },
                      { label: "Difficult", value: "Difficult" },
                    ]}
                    onChange={(value) =>
                      updateBox(index, { DifficultyLevel: value })
                    }
                  />
                  <QuestionInput
                    onSubmit={(value) => updateBox(index, { Question: value })}
                  />
                </div>
              )}

              {(section === "SituationBasedQuestions" ||
                section === "UnexpectedQuestions") && (
                <div className="space-y-3">
                  <QuestionInput
                    placeholder="Question..."
                    onSubmit={(value) => updateBox(index, { Question: value })}
                  />
                  <QuestionInput
                    placeholder="Answer..."
                    onSubmit={(value) => updateBox(index, { Answer: value })}
                  />
                </div>
              )}

              {section === "Resources" && (
                <div className="space-y-3">
                  <CompanySelect
                    label="Select Resource Type"
                    options={ResourceCategory}
                    onSelect={(value) => updateBox(index, { ResourceType: value })}
                  />
                  <QuestionInput
                    placeholder="URL..."
                    onSubmit={(value) => updateBox(index, { Url: value })}
                  />
                  <QuestionInput
                    placeholder="Description..."
                    onSubmit={(value) =>
                      updateBox(index, { Description: value })
                    }
                  />
                </div>
              )}

              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => handleDone(index)}>
                  <Image src="/assets/Done.png" alt="Done" width={24} height={24} />
                </button>
                <button type="button" onClick={() => removeBox(index)}>
                  <Image
                    src="/assets/delete.png"
                    alt="Delete"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}

function createBox(section: GreyBoxSection, id: number): Record<string, unknown> {
  const base = { id, isDone: false };
  switch (section) {
    case "CodingQuestion":
      return { ...base, value: "" };
    case "DSAQuestions":
    case "CoreCSQuestions":
      return { ...base, QuestionType: "", DifficultyLevel: "", Question: "" };
    case "SystemDesign":
      return { ...base, QuestionType: "", Question: "" };
    case "PuzzleBasedQuestions":
      return { ...base, DifficultyLevel: "", Question: "" };
    case "SituationBasedQuestions":
    case "UnexpectedQuestions":
      return { ...base, Question: "", Answer: "" };
    case "Resources":
      return { ...base, ResourceType: "", Url: "", Description: "" };
    default:
      return base;
  }
}