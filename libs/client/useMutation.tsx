import { useState } from "react";

interface UseMutaionState {
  loading: boolean;
  data?: object;
  error?: object;
}
type UseMutaionResult = [(data: any) => void, UseMutaionState]; //useMutaion func은 함수 하나(mutaion)와 UseMutationState를 반환

export default function useMutation(url: string): UseMutaionResult {
  const [state, setState] = useState<UseMutaionState>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
