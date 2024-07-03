import { useCallback, useEffect, useState } from "react";

export const useQueries = ({ prefixurl = "" } = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });

  const fetchingData = useCallback(
    async ({ url = "", method = "GET" } = {}) => {
      try {
        const res = await fetch(url, { method });
        const result = await res.json();
        setData({ ...data, data: result, isLoading: false });
      } catch (error) {
        setData({ ...data, isError: true, isLoading: false });
      }
    },
    []
  );

  useEffect(() => {
    if (prefixurl) fetchingData({ url: prefixurl });
  }, []);

  return { ...data };
};
