import { PaymentRouteClient } from "@screens/payment/ui/payment-route-client";
import { parsePaymentRoute } from "@shared/lib/parse-payment-route";
import { getPaymentRouteParams } from "@shared/lib/static-params";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ tarrif: string; "payment-method": string }>;
};

export async function generateStaticParams() {
  return getPaymentRouteParams();
}

export default async function Page({ params }: PageProps) {
  const { tarrif: tarrifParam, "payment-method": paymentMethodParam } =
    await params;

  const parsed = parsePaymentRoute(tarrifParam, paymentMethodParam);
  if (!parsed) {
    notFound();
  }

  return (
    <PaymentRouteClient
      tarrifId={parsed.tarrifId}
      paymentMethod={parsed.paymentMethod}
    />
  );
}
