import { getAnalytics } from "@/lib/server-actions";
import { AnalyticsOverviewResponse, AnalyticsResponseType, ListAllResponse } from "@/lib/types";
import useSWR from 'swr'


const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...init
  }).then(async (res) => {
    if (!res.ok) {
      const errorBody = await res.text();
      console.error(
        `fetcher HTTP error! status: ${res.status}, body: ${errorBody}`
      );
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });

export function useAllLinks() {
  const { data, error, isLoading, mutate } = useSWR<ListAllResponse>(
    "/dashboard/all",
    fetcher
  );

  return {
    links: data?.data || [],
    isSuccess: data?.success,
    isLoading,
    isError: error,
    message: data?.message,
    mutate,
  };
}

export function useAnalyticsData(urlId: string) {
  const { data, isLoading, mutate, error } = useSWR<AnalyticsResponseType>(
    urlId, 
    () => getAnalytics(urlId),
    { refreshInterval: 3000 }
  );

  return {
    data,
    isSuccess: data?.success,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useAnalyticsOverviewData() {
  const {data, isLoading, error} = useSWR<AnalyticsOverviewResponse> (
    "/api/api/analytics/overview",
    fetcher
  );

  return {
    data,
    isSuccess: data?.success,
    isLoading,
    isError: error,
  };
}