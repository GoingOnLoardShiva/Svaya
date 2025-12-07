export function isValidUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return !!url.hostname;
  } catch {
    return false;
  }
}
