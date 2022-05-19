import { useState } from "react";

interface IUseMutaionState {
  loading: boolean;
  data?: object;
  error?: object;
}
type UseMutaionResult = [(data: any) => void, IUseMutaionState]; //useMutation 반환값의 type => useMutaion func은 함수 하나(mutaion)와 UseMutationState를 반환

export default function useMutation(url: string): UseMutaionResult {
  const [state, setState] = useState<IUseMutaionState>({
    loading: false,
    data: undefined,
    error: undefined,
  }); //state의 초깃값 설정
  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //body의 data 형식을 Content-Type으로 만듬
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
