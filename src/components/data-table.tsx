"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Button } from "./ui/button";
import { Settings, ChartColumn } from "lucide-react";
import { KVPair } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import CopyButton from "./copy-button";

type DataTableProps = {
  data: KVPair[];
};

export function DataTable(props: DataTableProps) {
  return (
    <div className="container mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Short Code</TableHead>
            <TableHead>Original URL</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map((item) => {
            const isExpired =
              item.expiration &&
              item.expiration !== -1 &&
              item.expiration < Date.now();
            return (
              <TableRow
                key={item.shortCode}
                className={isExpired ? "opacity-50" : ""}
              >
                <TableCell>
                  <CopyButton text={item.shortCode} textToCopy={"process.env.NEXT_PUBLIC_API_URL"+item.shortCode} />
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="underline text-blue-600">
                        {item.originalUrl.length > 20
                          ? `${item.originalUrl.substring(0, 20)}...`
                          : item.originalUrl}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.originalUrl}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  {item.expiration ? (
                    item.expiration === -1 ? (
                      <Badge variant="secondary">No Expiration</Badge>
                    ) : (
                      <Badge variant={isExpired ? "destructive" : "default"}>
                        {new Date(item.expiration).toLocaleDateString()}
                      </Badge>
                    )
                  ) : (
                    <Badge variant="secondary">Never</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {item.description ? (
                    item.description
                  ) : (
                    <span className="text-gray-400 italic">No description</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link
                      href={`/dashboard/management/${item.shortCode}`}
                      passHref
                    >
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link
                      href={`/dashboard/analytics/${item.urlId}`}
                      passHref
                    >
                      <Button variant="outline" size="sm">
                        <ChartColumn className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export const DataTableSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
      <Skeleton className="h-8 w-64 mb-4" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Short Code</TableHead>
            <TableHead>Original URL</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full max-w-[200px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
