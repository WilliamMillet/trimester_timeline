import { useState } from "react";

interface FetchOptions {
  contentType?: string;
}

interface Callbacks {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  onFinally?: () => void;
}

interface FetchDataReturn {
  response: any | null;
  error: string | null;
  success: boolean | null;
  loading: boolean;
  fetchData: (
    url: string,
    method: string,
    options?: FetchOptions,
    body?: any,
    callbacks?: Callbacks
  ) => Promise<void>;
}

const useFetchData = (): FetchDataReturn => {
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (
    url: string,
    method: string,
    options: FetchOptions = {},
    body: any = null,
    callbacks: Callbacks = {}
  ) => {
    setLoading(true);
    setError(null);

    const { onSuccess, onError, onFinally } = callbacks;

    try {
      const headers: Record<string, string> = {
        "Content-Type": options.contentType || "application/json",
      };

      let requestBody: string | null = null;

      if (headers["Content-Type"] === "application/json" && body) {
        requestBody = JSON.stringify(body);
      } else {
        requestBody = body;
      }

      const fetchResponse = await fetch(url, {
        method,
        headers,
        body: requestBody,
      });

      if (!fetchResponse.ok) {
        throw new Error(`Error: ${fetchResponse.status} - ${fetchResponse.statusText}`);
      }

      let data: any = null;
      if (fetchResponse.headers.get("Content-Type")?.includes("application/json")) {
        data = await fetchResponse.json();
      }

      setSuccess(true);
      setResponse(data);
      if (onSuccess && data !== null) onSuccess(data);
    } catch (err) {
      setSuccess(false);
      console.error("Error fetching data:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      if (onError) onError(err instanceof Error ? err : new Error("Unknown error"));
      setError(errorMessage);
    } finally {
      setLoading(false);
      if (onFinally) onFinally();
    }
  };

  return { response, error, loading, success, fetchData };
};

export default useFetchData;