import { ListAllResponse } from "@/lib/types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url, { 
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
}).then(async (res) => {
  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`HTTP error! status: ${res.status}, body: ${errorBody}`);
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
