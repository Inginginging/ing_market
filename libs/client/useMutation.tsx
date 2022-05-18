import { useState } from "react";

interface UseMutaionState {
  loading: boolean;
  data?: object;
  error?: object;
}
type UseMutaionResult = [(data: any) => void, UseMutaionState]; //useMutaion func은 함수 하나(mutaion)와 UseMutationState를 반환

export default function useMutation(url: string): UseMutaionResult {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  function mutation(data: any) {}
  return [mutation, { loading, data, error }];
}
