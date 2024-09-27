'use client'
import { ArrowUpRight, Link as LinkIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataPanel } from '@/components/dashboard/data-panel'
import { useAnalyticsOverviewData } from '@/hooks/use-data';
import { LoadingSkeleton, ErrorAlert, NoDataDisplay } from '@/components/data-handling';

export default function AnalyticsPage() {
  // This data would typically come from your backend
  const {data, isError, isLoading} = useAnalyticsOverviewData();

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorAlert message={isError?.message} />;
  if (!data || !data.data)
    return <NoDataDisplay title={"No overview"} />;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.data.totalClicks.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.data.totalLinks.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Clicks per Link</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.data.avgClicksPerLink.toFixed(1)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Links</CardTitle>
        </CardHeader>
        <CardContent>
          <DataPanel />
        </CardContent>
      </Card>
    </div>
  )
}