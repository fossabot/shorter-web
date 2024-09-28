import { ClickChart } from "@/components/analytics/chart";

export default function Page({ params }: { params: { codeId: string } }) {
  const urlId = params.codeId;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Analytics Data for URL ID:{urlId}
      </h1>
      <ClickChart urlId={urlId} />
    </div>
  );
}
