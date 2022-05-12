import type { NextPage } from "next";
import Layout from "../../components/layout";

const Streams: NextPage = () => {
  return (
    <Layout title="라이브" hasTabBar>
      <div className="space-y-4 divide-y-[1px]">
        {[1, 1, 1, 1, 1].map((_, i) => (
          <div className="pt-4 px-4" key={i}>
            <div className="w-full bg-slate-400 aspect-video rounded-md shadow-sm" />
            <h3 className="font-bold text-gray-700 text-lg mt-2">
              Let's try Potatos
            </h3>
          </div>
        ))}
        <button className="fixed bottom-24 right-6 bg-orange-400 rounded-full p-4 text-white shadow-xl hover:bg-orange-500 hover:shadow-2xl cursor-pointer transition-colors border-transparent">
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
        </button>
      </div>
    </Layout>
  );
};

export default Streams;
