export type NavFlow = "onboarding" | "profile";

const FLOW_STORAGE_KEY = "project-x:nav-flow";
const PROFILE_TARRIF_STORAGE_KEY = "project-x:profile-tarrif-id";

function normalizePath(pathname: string) {
  const path = pathname.split("?")[0];
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

export function getNavFlow(): NavFlow | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = sessionStorage.getItem(FLOW_STORAGE_KEY);

  if (value === "onboarding" || value === "profile") {
    return value;
  }

  return null;
}

export function setNavFlow(flow: NavFlow) {
  sessionStorage.setItem(FLOW_STORAGE_KEY, flow);
}

export function clearNavFlow() {
  sessionStorage.removeItem(FLOW_STORAGE_KEY);
  sessionStorage.removeItem(PROFILE_TARRIF_STORAGE_KEY);
}

export function setProfileTarrifId(id: number) {
  sessionStorage.setItem(PROFILE_TARRIF_STORAGE_KEY, String(id));
}

export function getProfileTarrifId(): number | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = sessionStorage.getItem(PROFILE_TARRIF_STORAGE_KEY);
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export function updateNavFlow(from: string, to: string) {
  const fromPath = normalizePath(from);
  const toPath = normalizePath(to);

  if (fromPath === "/" && toPath === "/tarrifs") {
    setNavFlow("onboarding");
    return;
  }

  const profileTarrifMatch = fromPath.match(/^\/my-tarrif\/([^/]+)$/);

  if (profileTarrifMatch && toPath === "/tarrifs") {
    setNavFlow("profile");
    setProfileTarrifId(Number(profileTarrifMatch[1]));
    return;
  }

  if (fromPath === "/my-tarrif" && toPath === "/tarrifs") {
    setNavFlow("profile");
    return;
  }

  if (/^\/my-tarrif(\/[^/]+)?$/.test(toPath)) {
    clearNavFlow();
  }
}
