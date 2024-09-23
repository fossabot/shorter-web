import { DataPanel } from "@/components/dashboard/data-panel";
import { ShortenerPanel } from "@/components/dashboard/shortener-panel";

export default function DashboardPage() {

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="border border-gray-200 rounded-lg mb-4 p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Create</h1>

        <ShortenerPanel />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Data Table</h1>
        <DataPanel />
      </div>
    </div>
  );
}
