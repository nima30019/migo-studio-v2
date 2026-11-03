export function getAssetPath(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // 1. Client-side check in browser:
  if (typeof window !== 'undefined') {
    if (window.location.pathname.startsWith('/migo-studio-v2')) {
      return `/migo-studio-v2${normalizedPath}`;
    }
    return normalizedPath;
  }

  // 2. Build-time / SSG check:
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH ||
    (process.env.GITHUB_ACTIONS === 'true' ? '/migo-studio-v2' : '');

  return `${basePath}${normalizedPath}`;
}
