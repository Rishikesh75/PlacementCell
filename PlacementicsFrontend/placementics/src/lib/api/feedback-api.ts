import { APP_CONSTANTS } from "@/src/lib/constants/app.constants";
import type { FeedbackOnCompanyResponseDto } from "@/src/lib/dtos/feedback-on-company-response.dto";
import { apiFetch } from "./http-client";

const feedbackUrl = `${APP_CONSTANTS.API.BASE_URL}${APP_CONSTANTS.API.ENDPOINTS.FEEDBACK_ON_COMPANY}`;

export async function getFeedbacksOnCompany(): Promise<
  FeedbackOnCompanyResponseDto[]
> {
  return apiFetch<FeedbackOnCompanyResponseDto[]>(feedbackUrl);
}

export async function submitFeedback(
  feedbackData: FeedbackOnCompanyResponseDto,
): Promise<unknown> {
  return apiFetch(feedbackUrl, {
    method: "POST",
    body: JSON.stringify(feedbackData),
  });
}
