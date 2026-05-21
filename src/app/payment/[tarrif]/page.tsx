import { getTarrifById } from "@entities/tarrif/model/get-tarrif-by-id";
import { PaymentTypeScreen } from "@screens/payment-type";
import { TARRIFS_MOCK } from "@screens/tarrifs/model/mock";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ tarrif: string }>;
};

export default async function Page({ params }: PageProps) {
  const { tarrif: tarrifParam } = await params;
  const tarrifId = Number(tarrifParam);

  if (!Number.isInteger(tarrifId) || tarrifId <= 0) {
    notFound();
  }

  const tarrif = getTarrifById(tarrifId, TARRIFS_MOCK);

  if (!tarrif) {
    notFound();
  }

  return <PaymentTypeScreen tarrif={tarrif} />;
}
