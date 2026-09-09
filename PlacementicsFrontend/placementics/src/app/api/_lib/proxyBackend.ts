const API_BASE =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://placelytics.onrender.com";

export async function proxyBackendGet(
  pathSegments: string[],
  search: string,
): Promise<Response> {
  const path = pathSegments.map(encodeURIComponent).join("/");

  try {
    const response = await fetch(`${API_BASE}/api/${path}${search}`, {
      cache: "no-store",
    });

    const data: unknown = await response.json().catch(() => ({
      error: "Unexpected API response",
    }));

    return Response.json(data, { status: response.status });
  } catch {
    return Response.json(
      { error: "Failed to reach API" },
      { status: 502 },
    );
  }
}
