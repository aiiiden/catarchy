type OS = "windows" | "android" | "ios" | "macos" | "linux" | "unknown";
type Browser = "chrome" | "firefox" | "safari" | "edge" | "opera" | "unknown";

export function usePlatform() {
  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;

  let os: OS = "unknown";

  if (/windows phone/i.test(userAgent)) {
    os = "windows";
  } else if (/windows/i.test(userAgent)) {
    os = "windows";
  } else if (/android/i.test(userAgent)) {
    os = "android";
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    os = "ios";
  } else if (/macintosh/i.test(userAgent)) {
    os = "macos";
  } else if (/linux/i.test(userAgent)) {
    os = "linux";
  }

  let browser: Browser = "unknown";

  if (/chrome|crios|crmo/i.test(userAgent)) {
    browser = "chrome";
  } else if (/firefox|fxios/i.test(userAgent)) {
    browser = "firefox";
  } else if (
    /safari/i.test(userAgent) &&
    !/chrome|crios|crmo/i.test(userAgent)
  ) {
    browser = "safari";
  } else if (/edg/i.test(userAgent)) {
    browser = "edge";
  } else if (/opera|opr/i.test(userAgent)) {
    browser = "opera";
  } else if (/msie|trident/i.test(userAgent)) {
    browser = "edge"; // Treat Internet Explorer as Edge for compatibility
  } else {
    browser = "unknown";
  }

  return { os, browser };
}
