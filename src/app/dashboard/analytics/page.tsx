import { DataPanel } from "@/components/dashboard/data-panel";

export default function AnalyticsPage() {

    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 w-full">
          <h1 className="text-2xl font-bold mb-4">Data Table</h1>
          <DataPanel />
        </div>
      </div>
    );
  }