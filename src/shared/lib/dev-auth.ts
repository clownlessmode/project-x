const DEV_LOGOUT_KEY = "project-x:dev-logout";

export function isDevAuthEnabled() {
  return process.env.NEXT_PUBLIC_TELEGRAM_DEV_AUTH === "1";
}

export function isDevLoggedOut() {
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem(DEV_LOGOUT_KEY) === "1";
}

export function setDevLoggedOut(value: boolean) {
  if (typeof window === "undefined") {
    return;
  }
  if (value) {
    sessionStorage.setItem(DEV_LOGOUT_KEY, "1");
  } else {
    sessionStorage.removeItem(DEV_LOGOUT_KEY);
  }
}
