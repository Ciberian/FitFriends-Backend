import { useEffect, useState } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isNeedUpdate = true;

    fetch(url)
      .then((response) => response.json())
      .then((data) => isNeedUpdate && setData(data))

    return () => {
      isNeedUpdate = false;
    };
  }, [url]);

  return data;
};
