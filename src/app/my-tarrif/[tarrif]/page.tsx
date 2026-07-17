import { MyTarrifRouteClient } from "@screens/my-tarrif/ui/my-tarrif-route-client";
import { getTarrifRouteParams } from "@shared/lib/static-params";

export function generateStaticParams() {
  return getTarrifRouteParams();
}

export default function Page() {
  return <MyTarrifRouteClient />;
}
