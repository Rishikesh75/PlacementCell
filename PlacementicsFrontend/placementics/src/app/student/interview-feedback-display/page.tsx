"use client";

import { useEffect, useState } from "react";
import { FeedbackCard } from "@/src/components/FeedbackCard";
import type { Feedback } from "@/src/lib/domain/entities";
import { getFeedbacks } from "@/src/lib/mappers/feedback-on-company.mapper";

export default function FeedbackDisplayPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeedbacks() {
      setLoading(true);
      setError(null);
      try {
        const data = await getFeedbacks();
        setFeedbacks(data);
      } catch {
        setError("Failed to load feedback submissions");
      } finally {
        setLoading(false);
      }
    }

    loadFeedbacks();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading feedback...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Interview Feedback</h1>
      {feedbacks.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No feedback submissions found.
        </div>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((feedback, index) => (
            <FeedbackCard
              key={index}
              companyDetails={feedback.companyDetails}
              codingRound={feedback.codingRound}
              technicalRound={feedback.technicalRound}
              hrRound={feedback.hrRound}
              resources={feedback.resources}
            />
          ))}
        </div>
      )}
    </div>
  );
}
