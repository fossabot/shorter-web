import { AlertTriangleIcon, BarChartIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Card, CardHeader, CardContent } from "./ui/card";

export const LoadingSkeleton = () => (
    <Card>
      <CardHeader>
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </CardContent>
    </Card>
  );
  
export const ErrorAlert = ({ message }: { message ?: string }) => (
    <Alert variant="destructive">
      <AlertTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {message || "An error occurred while fetching the data."}
      </AlertDescription>
    </Alert>
  );
  
  
export const NoDataDisplay = ({ title }: { title: string }) => (
    <Card>
      <CardContent className="text-center py-12">
        <BarChartIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-4">No analytics data available</h2>
        <p className="text-muted-foreground mb-6">
          There&apos;s no {title} data yet. Try again later.
        </p>
      </CardContent>
    </Card>
  );