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
import { useState, useEffect } from "react";

// Define the structure of the API response
interface AnalyticsResponseType {
  success: boolean;
  urlId: string;
  shortCodes: {
    [key: string]: Array<{ date: string; count: number }>;
  };
  totalClicks: number;
}

// Define the structure for the chart data
interface ChartDataPoint {
  date: string;
  [shortCode: string]: number | string;
}

export function ClickChart() {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/api/analytics/sBKMRN-6GLoFDGepFwauF');
        const data: AnalyticsResponseType = await response.json();

        if (data.success) {
          const transformedData: ChartDataPoint[] = [];
          const config: ChartConfig = {};

          // Transform the data for the chart
          Object.entries(data.shortCodes).forEach(([shortCode, clicks], index) => {
            clicks.forEach(({ date, count }) => {
              const existingDataPoint = transformedData.find(point => point.date === date);
              if (existingDataPoint) {
                existingDataPoint[shortCode] = count;
              } else {
                transformedData.push({ date, [shortCode]: count });
              }
            });

            // Create config for each short code
            config[shortCode] = {
              label: `Short Code ${shortCode}`,
              color: `hsl(var(--chart-${index + 1}))`,
            };
          });

          setChartData(transformedData);
          setChartConfig(config);
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Click Analytics</CardTitle>
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
