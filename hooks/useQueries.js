import { useCallback, useEffect, useState } from "react";

export const useQueries = ({ prefixurl = "", headers = {} } = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });

  const fetchingData = useCallback(
    async ({ url = "", method = "GET", headers = {} } = {}) => {
      try {
        const res = await fetch(url, { method, headers });
        const result = await res.json();
        setData({ ...data, data: result, isLoading: false });
      } catch (error) {
        setData({ ...data, isError: true, isLoading: false });
      }
    },
    []
  );

  useEffect(() => {
    if (prefixurl) fetchingData({ url: prefixurl, headers: headers });
  }, []);

  return { ...data };
};
