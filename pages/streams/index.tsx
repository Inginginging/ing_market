import { Stream } from "@prisma/client";
import Loading from "components/loading";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import FloatingButton from "../../components/floating_button";
import Layout from "../../components/layout";

interface IStreamsResponse {
  ok: boolean;
  streams: Stream[];
}

const Streams: NextPage = () => {
  const { data } = useSWR<IStreamsResponse>(`/api/streams`);
  return (
    <Layout title="라이브" hasTabBar>
      {data ? (
        <div className="space-y-4 divide-y-[1px]">
          {data.streams.map((stream) => (
            <Link href={`/streams/${stream.id}`} key={stream.id}>
              <a className="pt-4 px-4 block">
                <div className="w-full bg-slate-400 aspect-video rounded-md shadow-sm" />
                <h3 className="font-bold text-gray-900 text-2xl mt-2">
                  {stream.name}
                </h3>
              </a>
            </Link>
          ))}
          <FloatingButton href="/streams/create">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </FloatingButton>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default Streams;
