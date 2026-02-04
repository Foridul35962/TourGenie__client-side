import TripPlan from "@/components/generate-plan/TripPlan";
import { cookies } from "next/headers";

const Page = async ({ params }: { params: Promise<{ planId: string }> }) => {
  const { planId } = await params;

  const SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tripPlan`;

  const cookieHeader = (await cookies()
  )
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${SERVER_URL}/get-plan/${planId}`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Failed to fetch plan. Status: ${res.status} | Body: ${text}`);
  }

  const data = JSON.parse(text);
  const plans = data.data.plan;

  return (
    <div>
      <TripPlan plans={plans} />
    </div>
  );
};

export default Page;