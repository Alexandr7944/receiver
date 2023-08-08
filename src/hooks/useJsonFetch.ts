import { useEffect, useState } from 'react';

type OptsType = {
  method: string,
  headers: {
    'Content-Type': string
  }
}

const useJsonFetch = <T>( url: string, opts?: OptsType) => {
  const [ data, setData ] = useState<T | null>();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>('');  

  useEffect(() => {
    setLoading(true);
    const fethData = async () => {
      try {
        const response = await fetch(url, opts);
        if (!response.ok) throw new Error('Error fetching');
        const result = await response.json();
        setData(result)
        
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fethData();

    return () => {
      setData(null);
      setError('');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return [data, loading, error]
}

export default useJsonFetch