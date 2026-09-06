const API_BASE =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://placelytics.onrender.com";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET() {
  try {
    const response = await fetch(`${API_BASE}/api/colleges`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        { error: `Failed to load colleges (${response.status})` },
        { status: response.status },
      );
    }

    const data: unknown = await response.json();
    return Response.json(data);
  } catch {
    return Response.json(
      { error: "Failed to load colleges" },
      { status: 502 },
    );
  }
}
