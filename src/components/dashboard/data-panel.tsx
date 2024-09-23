'use client';

import { DataTable, DataTableSkeleton } from "@/components/data-table";
import { useAllLinks } from "@/hooks/use-data";
import { AlertTriangleIcon, RotateCw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

export const DataPanel = () => {
    const { links, isLoading, isError, message, mutate } = useAllLinks();

    if (isLoading) {
        return (
            <DataTableSkeleton />
        );
    }

    if (isError) {
        return (
            <Alert variant="destructive">
                <AlertTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {message || "An error occurred while fetching the data."}
                    <Button onClick={() => mutate()}>
                        Try again
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (links.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">No links found</h2>
                <p className="text-muted-foreground mb-6">
                    It looks like you haven&apos;t created any short links yet.
                </p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Filter links..."
                        className="border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <Button
                    onClick={() => mutate()}
                    variant="ghost"
                    className="flex items-center space-x-2"
                >
                    <RotateCw />
                </Button>
            </div>
            <DataTable data={links} />
        </div>
    )
}