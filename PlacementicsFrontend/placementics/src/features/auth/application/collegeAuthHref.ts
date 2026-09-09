export function collegeAuthHref(
  path: string,
  collegeId: string | null | undefined,
): string {
  if (!collegeId) {
    return path;
  }

  return `${path}?collegeId=${encodeURIComponent(collegeId)}`;
}
