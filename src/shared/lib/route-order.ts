const ROUTE_ORDER: Record<string, number> = {
  "/": 0,
  "/tarrifs": 1,
  "/my-tarrif": 5,
};

function normalizePath(pathname: string) {
  const path = pathname.split("?")[0];
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

export function getRouteOrder(pathname: string) {
  const normalized = normalizePath(pathname);

  if (/^\/my-tarrif\/[^/]+$/.test(normalized)) {
    return 5;
  }

  if (normalized === "/my-tarrif") {
    return 5;
  }

  if (/^\/payment\/[^/]+\/success$/.test(normalized)) {
    return 4;
  }

  if (/^\/payment\/[^/]+\/[^/]+$/.test(normalized)) {
    return 3;
  }

  if (normalized.startsWith("/payment")) {
    return 2;
  }

  return ROUTE_ORDER[normalized] ?? 0;
}

export function getNavigationDirection(from: string, to: string) {
  const fromOrder = getRouteOrder(from);
  const toOrder = getRouteOrder(to);

  if (toOrder > fromOrder) return "forward";
  if (toOrder < fromOrder) return "back";

  return "forward";
}
