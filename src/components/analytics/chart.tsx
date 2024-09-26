"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useAnalyticsData } from "@/hooks/use-data";

// Define the structure for the chart data
interface ChartDataPoint {
  date: string;
  [shortCode: string]: number | string;
}

export function ClickChart({ urlId }: { urlId: string }) {
  const { data, isError, isLoading, isSuccess } = useAnalyticsData(urlId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;
  if (!data || !isSuccess) return <div>No data available</div>;

  const chartData: ChartDataPoint[] = [];
  const chartConfig: ChartConfig = {};

  Object.entries(data.shortCodes).forEach(([shortCode, clicks], index) => {
    clicks.forEach(({ date, count }) => {
      const existingDataPoint = chartData.find(point => point.date === date);
      if (existingDataPoint) {
        existingDataPoint[shortCode] = count;
      } else {
        chartData.push({ date, [shortCode]: count });
      }
    });

    chartConfig[shortCode] = {
      label: `Short Code ${shortCode}`,
      color: `hsl(var(--chart-${index + 1}))`,
    };
  });

  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Click Analytics for {urlId}</CardTitle>
        <CardDescription>Click distribution by short code</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            {Object.keys(chartConfig).map((shortCode, index) => (
              <Bar
                key={shortCode}
                dataKey={shortCode}
                stackId="a"
                fill={`var(--color-${shortCode})`}
                radius={[index === 0 ? 4 : 0, index === 0 ? 4 : 0, index === Object.keys(chartConfig).length - 1 ? 4 : 0, index === Object.keys(chartConfig).length - 1 ? 4 : 0]}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
