import { proxyBackendGet } from "../_lib/proxyBackend";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  const { path } = await params;
  const search = new URL(request.url).search;

  return proxyBackendGet(path, search);
}
