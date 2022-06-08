import { useState } from "react";

interface IUseMutaionState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutaionResult<T> = [(data: any) => void, IUseMutaionState<T>]; //useMutation 반환값의 type => useMutaion func은 함수 하나(mutaion)와 UseMutationState를 반환

//****useMutation은 지정 api 주소로 data를 mutate해서 POST하는 fn과,
//그렇게 해서 받아오는 response data,loading state, error를 반환해주는 직접 만든 hook

export default function useMutation<T = any>(url: string): UseMutaionResult<T> {
  const [state, setState] = useState<IUseMutaionState<T>>({
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
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((error) =>
        setState((prev) => ({ ...prev, error, loading: false }))
      )
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
