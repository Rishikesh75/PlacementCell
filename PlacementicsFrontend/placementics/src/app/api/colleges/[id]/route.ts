const API_BASE =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://placelytics.onrender.com";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const response = await fetch(
      `${API_BASE}/api/colleges/${encodeURIComponent(id)}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return Response.json(
        { error: `Failed to load college (${response.status})` },
        { status: response.status },
      );
    }

    const data: unknown = await response.json();
    return Response.json(data);
  } catch {
    return Response.json(
      { error: "Failed to load college" },
      { status: 502 },
    );
  }
}
