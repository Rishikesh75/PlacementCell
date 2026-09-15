import {
  proxyBackendGet,
  proxyBackendDelete,
  proxyBackendPatch,
  proxyBackendPost,
} from "../_lib/proxyBackend";

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

export async function POST(request: Request, { params }: RouteContext) {
  const { path } = await params;
  const body = await request.json().catch(() => null);

  return proxyBackendPost(path, body);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { path } = await params;

  return proxyBackendPatch(path);
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const { path } = await params;

  return proxyBackendDelete(path);
}
