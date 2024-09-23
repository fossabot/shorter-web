import useSWR from "swr";

type KVPair = {
  shortCode: string;
  originalUrl: string;
  expiration?: number; // Unix timestamp
  description?: string;
};

type ListAllResponse = {
  success: boolean;
  message?: string;
  data?: KVPair[];
};

export function useAllLinks() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR<ListAllResponse>(
    "/api/api/dashboard/all",
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
