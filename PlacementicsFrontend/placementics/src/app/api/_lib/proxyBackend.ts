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

export async function proxyBackendPost(
  pathSegments: string[],
  body: unknown,
): Promise<Response> {
  const path = pathSegments.map(encodeURIComponent).join("/");

  try {
    const response = await fetch(`${API_BASE}/api/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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

export async function proxyBackendPatch(
  pathSegments: string[],
): Promise<Response> {
  const path = pathSegments.map(encodeURIComponent).join("/");

  try {
    const response = await fetch(`${API_BASE}/api/${path}`, {
      method: "PATCH",
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
