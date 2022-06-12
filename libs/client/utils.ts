import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function cls(...classnammes: string[]) {
  return classnammes.join(" ");
}

interface IResponse<T> {
  ok: boolean;
  list: T[];
}
export function usePage<T = any>(api: string) {
  const [page, setPage] = useState(1);
  const [mergeData, setMergeData] = useState<T[]>([]);
  const { data } = useSWR<IResponse<T>>(`${api}?page=${page}`);
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setPage, page]);
  const router = useRouter();
  const goBack = api.slice(4);
  useEffect(() => {
    if (data) {
      setMergeData((prev) => prev.concat(data.list));
    }
  }, [data]);
  useEffect(() => {
    if (data && data.ok === false) {
      router.push(`${goBack}`);
    }
  }, [data, router]);
  return mergeData;
}
