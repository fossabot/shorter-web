"use client";

import { DataTable, DataTableSkeleton } from "@/components/data-table";
import { useAllLinks } from "@/hooks/use-data";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { ErrorAlert, NoDataDisplay } from "../data-handling";


export const DataPanel = () => {
  const { links, isLoading, isError, message, mutate } = useAllLinks();
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredLinks = links.filter((link) =>
    link.originalUrl.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  if (isError) {
    return (
      <ErrorAlert message={message} />
    );
  }

  if (links.length === 0) {
    return <NoDataDisplay title="links"/>
  }

  return (
    <div className="p-4">
      <div className="grid-cols-6 grid items-center mb-4">
        <div className="col-span-5 lg:col-span-2 col-start-1">
          <Input
            type="text"
            placeholder="Filter links..."
            className="border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleFilterChange}
            value={filter}
          />
        </div>
        <div className="col-span-1 col-start-6 flex flex-row-reverse">
          <Button onClick={() => mutate()} size="sm">
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <DataTable data={filteredLinks} />
    </div>
  );
};
