import { PaymentTypeRouteClient } from "@screens/payment-type/ui/payment-type-route-client";
import { getTarrifRouteParams } from "@shared/lib/static-params";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ tarrif: string }>;
};

export async function generateStaticParams() {
  return getTarrifRouteParams();
}

export default async function Page({ params }: PageProps) {
  const { tarrif: tarrifParam } = await params;
  const tarrifId = Number(tarrifParam);

  if (!Number.isInteger(tarrifId) || tarrifId <= 0) {
    notFound();
  }

  return <PaymentTypeRouteClient tarrifId={tarrifId} />;
}
