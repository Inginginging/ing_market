import { Post, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import FloatingButton from "../../components/floating_button";
import Layout from "../../components/layout";

interface PostWithRelation extends Post {
  user: User;
  _count: {
    curiosity: number;
    answers: number;
  };
}
interface IPostsResponse {
  ok: boolean;
  posts: PostWithRelation[];
}

const Community: NextPage = () => {
  const { data } = useSWR<IPostsResponse>(`/api/posts`);
  return (
    <Layout title="동네생활" hasTabBar>
      <div className="divide-y-[2px] space-y-4">
        {data?.posts.map((post) => (
          <Link href={`/community/${post.id}`} key={post.id}>
            <a className="flex flex-col items-start cursor-pointer pt-5">
              <span className="ml-4 flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-300 text-gray-700">
                동네질문
              </span>
              <div className="mt-2 px-4 text-gray-700 ">
                <span className="text-gray-700 font-medium ">Q.</span>{" "}
                {post.question}
              </div>
              <div className="px-4 mt-5 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
                <span>{post.user.name}</span>
                <span>
                  {" "}
                  {post.createdAt.toString().replace("T", " ").substring(0, 16)}
                </span>
              </div>
              <div className="px-4 flex space-x-5 mt-3 text-gray-700 py-2.5 border-t w-full">
                <span className="flex space-x-2 items-center text-sm ">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>궁금해요 {post._count.curiosity}</span>
                </span>
                <span className="flex space-x-2 items-center text-sm ">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  <span>답변 {post._count.answers}</span>
                </span>
              </div>
            </a>
          </Link>
        ))}
        <FloatingButton href="/community/write">
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Community;
