import {
  getTarrifPriceByPaymentMethod,
  parsePaymentMethodSlug,
} from "@entities/tarrif/model/payment-method";
import { getTarrifById } from "@entities/tarrif/model/get-tarrif-by-id";
import { PaymentScreen } from "@screens/payment";
import { TARRIFS_MOCK } from "@screens/tarrifs/model/mock";
import { getPaymentRouteParams } from "@shared/lib/static-params";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ tarrif: string; "payment-method": string }>;
};

export function generateStaticParams() {
  return getPaymentRouteParams();
}

export default async function Page({ params }: PageProps) {
  const { tarrif: tarrifParam, "payment-method": paymentMethodParam } =
    await params;
  const tarrifId = Number(tarrifParam);
  const paymentMethod = parsePaymentMethodSlug(paymentMethodParam);

  if (!Number.isInteger(tarrifId) || tarrifId <= 0 || !paymentMethod) {
    notFound();
  }

  const tarrif = getTarrifById(tarrifId, TARRIFS_MOCK);

  if (!tarrif) {
    notFound();
  }

  const price = getTarrifPriceByPaymentMethod(tarrif, paymentMethod);

  if (!price) {
    notFound();
  }

  return (
    <PaymentScreen
      tarrif={tarrif}
      paymentMethod={paymentMethod}
      amount={price.amount}
    />
  );
}
