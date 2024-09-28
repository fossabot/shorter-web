import { DataPanel } from "@/components/dashboard/data-panel";
import { ShortenerPanel } from "@/components/dashboard/shortener-panel";

export default function DashboardPage() {

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>
      <div className="border bg-white border-gray-200 rounded-lg mb-4 p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Shorten an URL</h1>

        <ShortenerPanel />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Data Table</h1>
        <DataPanel />
      </div>
    </div>
  );
}
